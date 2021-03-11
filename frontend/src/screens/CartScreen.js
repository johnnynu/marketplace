import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import {
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Box,
	Center,
	Stack,
	Text,
	useColorModeValue,
	Button as ChakraButton,
	Divider,
	Flex,
} from "@chakra-ui/react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { model } from "mongoose";

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	const quantity = location.search
		? Number(location.search.split("quantity")[1])
		: 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<Heading as="h2">Cart</Heading>
				{cartItems.length === 0 ? (
					<Alert status="warning">
						<AlertIcon />
						<AlertTitle mr={2}>Cart is empty!</AlertTitle>
						<AlertDescription>
							<Link to="/">Keep Shopping</Link>
						</AlertDescription>
					</Alert>
				) : (
					<Box p="6">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={2}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>$ {item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.quantity}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.stockCount).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="danger"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
									<Col md={2}>$ {(item.quantity * item.price).toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
						))}
					</Box>
				)}
			</Col>
			<Col md={4}>
				<Center py={6}>
					<Box
						as="section"
						bg={useColorModeValue("gray.100", "inherit")}
						py="12"
					>
						<Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ md: "8" }}>
							<Box
								maxW="3xl"
								mx="auto"
								rounded={{ md: "lg" }}
								bg={useColorModeValue("white", "gray.700")}
								shadow="base"
								overflow="hidden"
							>
								<Flex align="center" justify="space-between" px="6" py="4">
									<Text as="h3" fontWeight="bold" fontSize="lg">
										Subtotal (
										{cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
										Items): $
										{cartItems
											.reduce(
												(acc, item) => acc + item.quantity * item.price,
												0
											)
											.toFixed(2)}
									</Text>
								</Flex>
								<Divider />
								<Button
									variant="success"
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Checkout
								</Button>
							</Box>
						</Box>
					</Box>
				</Center>
			</Col>
		</Row>
	);
};

export default CartScreen;
