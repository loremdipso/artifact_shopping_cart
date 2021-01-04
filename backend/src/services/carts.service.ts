import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateCartDto } from '../dtos/carts.dto';
import HttpException from '../exceptions/HttpException';
import { ICart, ICartDataStoredInToken, ICartItem, ICartTokenData } from '../interfaces/carts.interface';
import cartModel from '../models/carts.model';
import { isEmpty } from '../utils/util';

class CartService {
	public carts = cartModel;

	public async tryFindCartById(cartId: string): Promise<ICart> {
		const findCart: ICart = await this.carts.findById(cartId);
		return findCart;
	}

	public async findCartById(cartId: string): Promise<ICart> {
		const findCart: ICart = await this.carts.findById(cartId);
		if (!findCart) throw new HttpException(409, "You're not cart");

		return findCart;
	}

	public async createCart(cartData: CreateCartDto): Promise<{ cookie: string; createCartData: ICart }> {
		const items = cartData.items || [];
		const createCartData: ICart = await this.carts.create({
			...cartData,
			items: this.getConsistentCartItems(items)
		});
		const tokenData = this.createToken(createCartData);
		const cookie = this.createCookie(tokenData);

		return { cookie, createCartData };
	}

	public async updateCart(cartId: string, cartData: ICart): Promise<ICart> {
		if (isEmpty(cartData)) throw new HttpException(400, "You're not cartData");

		const updateCartById: ICart = await this.carts.findByIdAndUpdate(
			cartId,
			{ ...cartData, items: this.getConsistentCartItems(cartData.items) },
			{ new: true }
		);
		return updateCartById;
	}

	public async deleteCartData(cartId: string): Promise<ICart> {
		const deleteCartById: ICart = await this.carts.findByIdAndDelete(cartId);
		if (!deleteCartById) throw new HttpException(409, "You're not cart");
		return deleteCartById;
	}

	public createToken(user: ICart): ICartTokenData {
		const dataStoredInToken: ICartDataStoredInToken = { _id: user._id };
		const secret: string = process.env.JWT_SECRET;
		const expiresIn: number = 60 * 60;

		return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
	}

	public createCookie(tokenData: ICartTokenData): string {
		return `Cart=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
	}

	public getConsistentCartItems(items: ICartItem[]): ICartItem[] {
		// remove items with invalid counts
		items = items.filter((item) => item.count > 0);

		items = this.combineDuplicateItems(items);
		return items;
	}

	private combineDuplicateItems(items: ICartItem[]): ICartItem[] {
		let dedupedItems = [];
		let productIdToIndex: { [key: string]: number } = {};
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			let existingIndex = productIdToIndex[item.productId];
			if (existingIndex !== undefined) {
				dedupedItems[existingIndex].count += item.count;
			} else {
				dedupedItems.push(item);
				productIdToIndex[item.productId] = i;
			}
		}
		return dedupedItems;
	}
}

export default CartService;
