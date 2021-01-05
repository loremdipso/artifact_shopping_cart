import { ICartItem } from "../interfaces/carts.interface";

export class CreateCartDto {
	public items?: [ICartItem];
}
