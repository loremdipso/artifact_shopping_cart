import bcrypt from 'bcrypt';
import { CreateProductDto } from '../dtos/products.dto';
import HttpException from '../exceptions/HttpException';
import { IProduct } from '../interfaces/products.interface';
import productModel from '../models/products.model';
import { isEmpty } from '../utils/util';

class ProductService {
	public products = productModel;

	public async findAllProduct(): Promise<IProduct[]> {
		const products: IProduct[] = await this.products.find();
		return products;
	}

	public async findProductById(productId: string): Promise<IProduct> {
		const findProduct: IProduct = await this.products.findOne({ _id: productId });
		if (!findProduct) throw new HttpException(409, "You're not product");

		return findProduct;
	}

	public async createProduct(productData: CreateProductDto): Promise<IProduct> {
		if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

		const createProductData: IProduct = await this.products.create({ ...productData });
		return createProductData;
	}

	public async updateProduct(productId: string, productData: IProduct): Promise<IProduct> {
		if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

		const updateProductById: IProduct = await this.products.findByIdAndUpdate(productId, { ...productData });
		if (!updateProductById) throw new HttpException(409, "You're not product");

		return updateProductById;
	}

	public async deleteProductData(productId: string): Promise<IProduct> {
		const deleteProductById: IProduct = await this.products.findByIdAndDelete(productId);
		if (!deleteProductById) throw new HttpException(409, "You're not product");

		return deleteProductById;
	}
}

export default ProductService;
