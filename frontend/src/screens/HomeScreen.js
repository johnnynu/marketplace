import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
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
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			{!keyword && <ProductCarousel />}
			<Heading as="h3" size="lg">
				Trending
			</Heading>
			{error ? (
				<Alert status="error">
					<AlertIcon />
					{error}
				</Alert>
			) : (
				<>
					<Grid templateColumns="repeat(3, 1fr)" gap={6}>
						{products.map((product) => (
							<Skeleton isLoaded={!loading}>
								<Product product={product} />
							</Skeleton>
						))}
					</Grid>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
