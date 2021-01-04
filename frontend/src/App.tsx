import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { ICart, ICartItem, IProduct } from './interfaces';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { numItemsInCart, calculateCost } from './utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const routes = {
	carts: {
		post: '/api/carts',
		get: (id: string) => `/api/carts/${id}`,
		put: (id: string) => `/api/carts/${id}`,
	},

	products: {
		get: '/api/products',
	},
};

function App() {
	const [products, setProducts] = useState([] as IProduct[]);
	const [cart, setCart] = useState(null as ICart | null);

	async function putCartItems(items: ICartItem[]) {
		if (!cart) {
			return;
		}

		let data = { items };
		let res = await fetch(routes.carts.put(cart._id), {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data),
		});

		let json: { data: ICart } = await res.json();
		setCart(json.data);
	}

	const addItemToCart = async (productId: string, countToAdd: number) => {
		if (!cart) {
			return;
		}

		let items = cart.items;
		let existingItem = items.find(item => item.productId === productId);
		if (existingItem) {
			existingItem.count += countToAdd;
		} else {
			items = [...cart.items, { productId: productId, count: countToAdd }];
		}

		await putCartItems(items);
	};

	const removeCartItem = async (productId: string) => {
		if (!cart) {
			return;
		}

		let items = cart.items.filter(item => item.productId !== productId);
		await putCartItems(items);
	};

	const updateCartItem = async (productId: string, newCount: number) => {
		if (!cart) {
			return;
		}

		let items = cart.items;
		let existingItem = items.find(item => item.productId === productId);
		if (existingItem) {
			existingItem.count = newCount;
			await putCartItems(items);
		}
	};

	useEffect(() => {
		(async () => {
			let res = await fetch(routes.products.get);
			let json: { data: IProduct[] } = await res.json();
			setProducts(json.data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			let res = await fetch(routes.carts.post, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({}),
			});
			let json: { data: ICart } = await res.json();
			setCart(json.data);
		})();
	}, []);

	if (!cart) {
		return null;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<div className="fixed-top">
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="#home">Vegan Pizzas</Navbar.Brand>
						<Nav className="ml-auto">
							<Switch>
								<Route exact path="/">
									<Nav.Link eventKey="1" as={Link} to="/products">
										Products
									</Nav.Link>
								</Route>

								<Route exact path="/products">
									<Nav.Link eventKey="1" as={Link} to="/">
										Cart
									</Nav.Link>
								</Route>
							</Switch>
						</Nav>
					</Navbar>
				</div>

				<div className="main-content">
					<Switch>
						<Route exact path="/">
							<ShoppingCart cart={cart} products={products} removeCartItem={removeCartItem} updateCartItem={updateCartItem} />
						</Route>
						<Route exact path="/products">
							<ProductList products={products} addItemToCart={addItemToCart} />
						</Route>
					</Switch>
				</div>

				<div className="fixed-bottom">
					<Navbar bg="dark" variant="dark" className="dark-footer">
						<span className="mr-auto">
							Items in Cart: <b>{numItemsInCart(cart.items)}</b>
						</span>
						<span className="ml-auto">
							Total: <b>{calculateCost(cart.items, products)}</b>
						</span>
					</Navbar>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
