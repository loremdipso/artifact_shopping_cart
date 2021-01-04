import { model, Schema, Document } from 'mongoose';
import { ICart } from '../interfaces/carts.interface';

const cartEntrySchema: Schema = new Schema({
	productId: { type: Schema.Types.ObjectId, ref: 'Product' },

	count: {
		type: Number,
		required: true,
	},
});

const cartSchema: Schema = new Schema({
	items: [cartEntrySchema]
});

const cartModel = model<ICart & Document>('Cart', cartSchema);

export default cartModel;
