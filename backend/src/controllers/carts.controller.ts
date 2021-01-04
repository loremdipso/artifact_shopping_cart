import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CreateCartDto } from '../dtos/carts.dto';
import { ICart, ICartDataStoredInToken } from '../interfaces/carts.interface';
import cartService from '../services/carts.service';

class CartsController {
	public cartService = new cartService();

	public getCartById = async (req: Request, res: Response, next: NextFunction) => {
		const cartId: string = req.params.id;

		try {
			const findOneCartData: ICart = await this.cartService.findCartById(cartId);
			res.status(200).json({ data: findOneCartData, message: 'findOne' });
		} catch (error) {
			next(error);
		}
	};

	public createCart = async (req: Request, res: Response, next: NextFunction) => {
		const cartData: CreateCartDto = req.body;

		const cookies = req.cookies;
		if (cookies && cookies.Cart) {
			const secret = process.env.JWT_SECRET;
			const verificationResponse = (await jwt.verify(cookies.Cart, secret)) as ICartDataStoredInToken;
			const cartId = verificationResponse._id;
			const findCart = await this.cartService.tryFindCartById(cartId);
			if (findCart) {
				return res.status(201).json({ data: findCart, message: 'found' });
			}
		}

		try {
			const { cookie, createCartData } = await this.cartService.createCart(cartData);
			res.setHeader('Set-Cookie', [cookie]);
			return res.status(201).json({ data: createCartData, message: 'created' });
		} catch (error) {
			next(error);
		}
	};

	public updateCart = async (req: Request, res: Response, next: NextFunction) => {
		const cartId: string = req.params.id;
		const cartData: ICart = req.body;

		try {
			const updateCartData: ICart = await this.cartService.updateCart(cartId, cartData);
			res.status(200).json({ data: updateCartData, message: 'updated' });
		} catch (error) {
			next(error);
		}
	};

	public deleteCart = async (req: Request, res: Response, next: NextFunction) => {
		const cartId: string = req.params.id;

		try {
			const deleteCartData: ICart = await this.cartService.deleteCartData(cartId);
			res.status(200).json({ data: deleteCartData, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default CartsController;
