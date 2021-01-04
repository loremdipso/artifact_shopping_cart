import { IsArray } from "class-validator";
import { ICartItem } from "../interfaces/carts.interface";

export class CreateCartDto {
	@IsArray()
	public items?: [ICartItem];
}
