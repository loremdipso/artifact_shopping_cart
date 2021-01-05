import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { IProduct } from '../interfaces';

interface IProductList {
	products: IProduct[];
	addItemToCart: (productId: string, count: number) => Promise<any>;
}

export function ProductList({ products, addItemToCart }: IProductList) {
	return (
		<div className="card-list">
			{products.map(product => (
				<Card key={product._id}>
					<Card.Header>
						<Row className="align-items-center">
							<Col className="lalign">{product.name}</Col>
							<Col>
								<Button style={{ float: 'right' }} onClick={() => addItemToCart(product._id, 1)}>
									Add to Cart
								</Button>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="lalign">
						<div>{product.description}</div>
						<div>${product.price}</div>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}
