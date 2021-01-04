import request from 'supertest';
import App from '../app';
import { ICartItem } from '../interfaces/carts.interface';
import CartsService from '../services/carts.service';
import CartsRoute from '../routes/carts.route';

afterAll(async () => {
	await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

// NOTE: would ideally write more tests that actually touch the DB (like in index),
// but that'd require more setup/mocking than I think this exercise warrants.

describe('Testing CartsService', () => {
	describe('when making cart items consistent', () => {
		it('should combine duplicates', () => {
			const cartsService = new CartsService();
			let items: ICartItem[] = [{ productId: "A", count: 1 }, { productId: "A", count: 1 }];
			expect(cartsService.getConsistentCartItems(items)).toEqual([{ productId: "A", count: 2 }]);
		});

		it('should remove items with non-positive counts', () => {
			const cartsService = new CartsService();
			let items: ICartItem[] = [{ productId: "A", count: 1 }, { productId: "B", count: -1 }];
			expect(cartsService.getConsistentCartItems(items)).toEqual([{ productId: "A", count: 1 }]);
		});
	});
});
