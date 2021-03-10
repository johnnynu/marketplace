import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import {
	Box,
	Grid,
	Image,
	Badge,
	LinkBox,
	LinkOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	return (
		<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
			<Link to={`/product/${product._id}`}>
				<Image src={product.image} alt={product.name} />
			</Link>

			<Box p="6">
				<Box d="flex" alignItems="baseline">
					<Badge borderRadius="full" px="2" colorScheme="purple">
						New
					</Badge>
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="1"
					>
						by {user.name}
					</Box>
				</Box>
				<Link to={`/product/${product._id}`}>
					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						LineHeight="tight"
						isTruncated
					>
						{product.name}
					</Box>

					<Box>${product.price}</Box>
				</Link>
				<Box d="flex" mt="2" alignItems="center">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Product;
