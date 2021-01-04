
export interface IProduct {
	_id: string;
	name: string;
	description: string;
	price: number;
}

export interface ICart {
	_id: string;
	items: ICartItem[];
}

export interface ICartItem {
	productId: string;
	count: number;
}
