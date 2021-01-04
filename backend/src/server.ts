import 'dotenv/config';
import App from './app';
import CartsRoute from './routes/carts.route';
import IndexRoute from './routes/index.route';
import ProductsRoute from './routes/products.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new CartsRoute(), new ProductsRoute()]);

app.listen();
