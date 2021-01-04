import { Request } from 'express';

export interface ICart {
	_id: string;
	items: ICartItem[];
}

export interface ICartItem {
	productId: string;
	count: number;
}

export interface ICartDataStoredInToken {
	_id: string;
}
export interface ICartTokenData {
	token: string;
	expiresIn: number;
}

export interface IRequestWithCart extends Request {
	cart: ICart;
}
