import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import {
	Box,
	Grid,
	Image,
	Badge,
	LinkBox,
	LinkOverlay,
	Skeleton,
	Alert,
	AlertIcon,
	Heading,
} from "@chakra-ui/react";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<Heading as="h3" size="lg">
				Trending
			</Heading>
			{error ? (
				<Alert status="error">
					<AlertIcon />
					{error}
				</Alert>
			) : (
				<Grid templateColumns="repeat(3, 1fr)" gap={6}>
					{products.map((product) => (
						<Skeleton isLoaded={!loading}>
							<Product product={product} />
						</Skeleton>
					))}
				</Grid>
			)}
		</>
	);
};

export default HomeScreen;
