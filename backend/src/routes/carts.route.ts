import { Router } from 'express';
import CartsController from '../controllers/carts.controller';
import { CreateCartDto } from '../dtos/carts.dto';
import IRoute from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class CartsRoute implements IRoute {
	public path = '/carts';
	public router = Router();
	public cartsController = new CartsController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:id`, this.cartsController.getCartById);
		this.router.post(`${this.path}`, validationMiddleware(CreateCartDto, 'body'), this.cartsController.createCart);
		this.router.put(`${this.path}/:id`, validationMiddleware(CreateCartDto, 'body', true), this.cartsController.updateCart);
		this.router.delete(`${this.path}/:id`, this.cartsController.deleteCart);
	}
}

export default CartsRoute;
