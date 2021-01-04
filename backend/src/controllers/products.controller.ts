import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CreateProductDto } from '../dtos/products.dto';
import { IProduct } from '../interfaces/products.interface';
import productService from '../services/products.service';

class ProductsController {
	public productService = new productService();

	public getProducts = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const findAllProductsData: IProduct[] = await this.productService.findAllProduct();
			res.status(200).json({ data: findAllProductsData, message: 'findAll' });
		} catch (error) {
			next(error);
		}
	};

	public getProductById = async (req: Request, res: Response, next: NextFunction) => {
		const productId: string = req.params.id;

		try {
			const findOneProductData: IProduct = await this.productService.findProductById(productId);
			res.status(200).json({ data: findOneProductData, message: 'findOne' });
		} catch (error) {
			next(error);
		}
	};

	public createProduct = async (req: Request, res: Response, next: NextFunction) => {
		const productData: CreateProductDto = req.body;

		try {
			const createProductData = await this.productService.createProduct(productData);
			return res.status(201).json({ data: createProductData, message: 'created' });
		} catch (error) {
			next(error);
		}
	};

	public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
		const productId: string = req.params.id;
		const productData: IProduct = req.body;

		try {
			const updateProductData: IProduct = await this.productService.updateProduct(productId, productData);
			res.status(200).json({ data: updateProductData, message: 'updated' });
		} catch (error) {
			next(error);
		}
	};

	public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
		const productId: string = req.params.id;

		try {
			const deleteProductData: IProduct = await this.productService.deleteProductData(productId);
			res.status(200).json({ data: deleteProductData, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default ProductsController;
