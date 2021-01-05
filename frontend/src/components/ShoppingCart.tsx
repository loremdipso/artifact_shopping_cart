import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ICart, IProduct } from '../interfaces';
import { findProduct } from '../utils';

interface IShoppingCart {
	cart: ICart;
	products: IProduct[];
	updateCartItem: (productId: string, count: number) => Promise<any>;
	removeCartItem: (productId: string) => Promise<any>;
}

export function ShoppingCart({ cart, products, removeCartItem, updateCartItem }: IShoppingCart) {
	if (cart.items.length === 0) {
		return <EmptyShoppingCart />;
	}
	return (
		<div className="card-list">
			{cart.items.map(item => {
				let product = findProduct(products, item.productId);
				return product ? (
					<Card key={item.productId}>
						<Card.Header>
							<Row className="align-items-center">
								<Col className="lalign">{product.name}</Col>
								<Col>
									<Button variant="danger" style={{ float: 'right' }} onClick={() => removeCartItem(item.productId)}>
										X
									</Button>
								</Col>
							</Row>
						</Card.Header>

						<Card.Body className="lalign">
							<div>Price per: ${product.price}</div>

							<div>
								Count: <input value={item.count} type="number" onChange={e => updateCartItem(item.productId, parseInt(e.target.value))} />
							</div>

							<div>Total: ${(item.count * product.price).toFixed(2)}</div>
						</Card.Body>
					</Card>
				) : null;
			})}
		</div>
	);
}

function EmptyShoppingCart() {
	return (
		<>
			<div>No items yet in cart</div>
			<div>
				Go to the <Link to="/products">products</Link> page to add some
			</div>
		</>
	);
}
