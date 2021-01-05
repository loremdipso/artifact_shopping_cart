import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { connect, set } from 'mongoose';
import { dbConnection } from './database';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import ProductsController from './controllers/products.controller';
import ProductService from './services/products.service';

class App {
	public app: express.Application;
	public port: string | number;
	public env: string;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.env = process.env.NODE_ENV || 'development';

		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();

		this.seed();
	}

	public listen() {
		this.app.listen(this.port, () => {
			logger.info(`🚀 App listening on the port ${this.port}`);
		});
	}

	public getServer() {
		return this.app;
	}

	private connectToDatabase() {
		if (this.env !== 'production') {
			set('debug', true);
		}

		connect(dbConnection.url, dbConnection.options)
			.then(() => {
				logger.info('🟢 The database is connected.');
			})
			.catch((error: Error) => {
				logger.error(`🔴 Unable to connect to the database: ${error}.`);
			});
	}

	private initializeMiddlewares() {
		// You would change this, if you were actually going to launch this
		this.app.use(morgan('dev', { stream }));
		this.app.use(cors({ origin: true, credentials: true }));

		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach(route => {
			this.app.use('/', route.router);
		});
	}

	private initializeSwagger() {
		if (this.env === 'development') {
			const options = {
				swaggerDefinition: {
					info: {
						title: 'REST API',
						version: '1.0.0',
						description: 'Example docs',
					},
				},
				apis: ['swagger.yaml'],
			};

			const specs = swaggerJSDoc(options);
			this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
		}
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private async seed() {
		const productService = new ProductService();
		const products = await productService.findAllProduct();
		if (products.length === 0) {
			logger.info("Seeding initial data...");

			productService.createProduct({
				name: "Plain ol Pepperooni",
				price: 8.95,
				description: "A scrumptious pie crafted the most premium of plant-based life",
			});
			productService.createProduct({
				name: "Meet Lovers",
				price: 16.50,
				description: "A big-boy pie made for sharing. Shauzage made from bean curd, Canadian Bakon made from beets, and anchoovies made from kelp. Delicious!",
			});
			productService.createProduct({
				name: "Veggie",
				price: 30.00,
				description: "Just... just vegetables on this one. Also the dough doesn't have egg or whatnot.",
			});
			productService.createProduct({
				name: "Gouda enough for me!",
				price: 6.00,
				description: "Chef's personal favorite: one of our traditional vegan pies, topped with aged gouda cheese! You might be thinking: what's this cheese made of that it's vegan? Answer: milk. This is not a vegan pie. Do not buy this pie if you want to avoid animal products.",
			});
			productService.createProduct({
				name: "Breadsticks",
				price: 8.99,
				description: "Sticks made of bread",
			});
			productService.createProduct({
				name: "Stickbread",
				price: 9.88,
				description: "Bread made of sticks. Comes with a side of friez.",
			});
			productService.createProduct({
				name: "Friez",
				price: 4.95,
				description: "House fries. Comes with a side of stickbread.",
			});
			productService.createProduct({
				name: "Grease",
				price: 2.00,
				description: "Drippings from our deep fryers. Yummm!",
			});
			productService.createProduct({
				name: "Napkins",
				price: 20.00,
				description: "A small handful of napkins.",
			});
			productService.createProduct({
				name: "Silverware rental",
				price: 8.00,
				description: "Vegan silverware that you return after your meal.",
			});
		}
	}
}

export default App;
