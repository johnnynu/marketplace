import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Carousel,
	CarouselItem,
	Form,
	Container,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
	Image as ChakraImage,
	Alert,
	AlertIcon,
	Skeleton,
	SkeletonText,
	Box,
	VStack,
	Divider,
	Badge,
} from "@chakra-ui/react";

const ProductScreen = ({ match, history }) => {
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity${quantity}`);
	};

	return (
		<>
			<Link className="btn btn-dark my-3" to="/">
				Back
			</Link>
			{error ? (
				<Alert status="error">
					<AlertIcon />
					{error}
				</Alert>
			) : (
				<Row>
					<Skeleton isLoaded={!loading}>
						<ChakraImage
							src={product.image}
							alt={product.name}
							objectFit="cover"
						/>
					</Skeleton>
					<Col md={3}>
						<VStack spacing={4} align="stretch">
							<Box
								w="400px"
								border="100px"
								rounded="20px"
								overflow="hidden"
								boxShadow="sm"
								bg="alphaBlack.200"
							>
								<ListGroup.Item>
									<SkeletonText
										mt="1"
										noOfLines={2}
										spacing="4"
										isLoaded={!loading}
									>
										<Badge borderRadius="full" px="2" colorScheme="teal">
											New
										</Badge>
										<h3>{product.name}</h3>
									</SkeletonText>
								</ListGroup.Item>

								<ListGroup.Item>
									<SkeletonText
										mt="1"
										noOfLines={1}
										spacing="4"
										isLoaded={!loading}
									>
										<Rating
											value={product.rating}
											text={`${product.numReviews} reviews`}
										/>
									</SkeletonText>
								</ListGroup.Item>

								<ListGroup.Item>
									<SkeletonText
										mt="1"
										noOfLines={1}
										spacing="4"
										isLoaded={!loading}
									>
										Price: ${product.price}
									</SkeletonText>
								</ListGroup.Item>

								<ListGroup.Item>
									<SkeletonText
										mt="1"
										noOfLines={4}
										spacing="4"
										isLoaded={!loading}
									>
										Description: {product.description}
									</SkeletonText>
								</ListGroup.Item>
							</Box>
							<Divider w="400px" />
							<Box
								w="400px"
								border="100px"
								rounded="20px"
								overflow="hidden"
								boxShadow="sm"
								bg="black.200"
							>
								<Card>
									<ListGroup variant="flush">
										<Skeleton isLoaded={!loading}>
											<ListGroup.Item>
												<Row>
													<Col>Price:</Col>
													<Col>
														<strong>${product.price * quantity}</strong>
													</Col>
												</Row>
											</ListGroup.Item>
										</Skeleton>

										{product.stockCount > 0 && (
											<Skeleton isLoaded={!loading}>
												<ListGroup.Item>
													<Row>
														<Col>Quantity</Col>
														<Col>
															<Form.Control
																as="select"
																value={quantity}
																onChange={(e) => setQuantity(e.target.value)}
															>
																{[...Array(product.stockCount).keys()].map(
																	(x) => (
																		<option key={x + 1} value={x + 1}>
																			{x + 1}
																		</option>
																	)
																)}
															</Form.Control>
														</Col>
													</Row>
												</ListGroup.Item>
											</Skeleton>
										)}

										<Skeleton isLoaded={!loading}>
											<ListGroup.Item>
												{product.stockCount === 0 ? (
													<Button
														variant="danger"
														className="btn-block"
														type="button"
														disabled
													>
														Out of Stock
													</Button>
												) : (
													<Button
														onClick={addToCartHandler}
														variant="success"
														className="btn-block"
														type="button"
													>
														Add to Cart
													</Button>
												)}
											</ListGroup.Item>
										</Skeleton>
									</ListGroup>
								</Card>
							</Box>
						</VStack>
					</Col>
					<Col md={3}></Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
