import { ICartItem, IProduct } from "./interfaces";

export function numItemsInCart(items: ICartItem[]) {
	return items.reduce((total, item) => total + item.count, 0);
}

export function calculateCost(items: ICartItem[], products: IProduct[]) {
	const total = items.reduce((total, item) => total + getProductPrice(products, item.productId) * item.count, 0);
	return `$${total}`;
}

export function getProductPrice(products: IProduct[], productId: string) {
	let foundProduct = findProduct(products, productId);
	if (foundProduct) {
		return foundProduct.price;
	}
	return 0;
}

export function findProduct(products: IProduct[], productId: string) {
	return products.find(product => product._id === productId);
}
