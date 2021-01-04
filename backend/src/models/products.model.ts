import { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interfaces/products.interface';

const productSchema: Schema = new Schema({
	name: String,
	description: String,
	price: Number
});

const productModel = model<IProduct & Document>('Product', productSchema);

export default productModel;
