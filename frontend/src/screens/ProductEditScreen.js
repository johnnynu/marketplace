import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [stockCount, setStockCount] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: updateLoading,
		error: updateError,
		success: updateSuccess,
	} = productUpdate;

	useEffect(() => {
		if (updateSuccess) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push("/admin/products");
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setCategory(product.category);
				setStockCount(product.stockCount);
				setDescription(product.description);
			}
		}
	}, [dispatch, history, productId, product, updateSuccess]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				category,
				stockCount,
				description,
			})
		);
	};

	return (
		<>
			<Link to="/admin/products" className="btn btn-dark my-3">
				Back
			</Link>
			<FormContainer>
				{loading && <Loader />}
				<h1>Edit Product</h1>
				{updateLoading && <Loader />}
				{updateError && <Message variant="danger">{updateError}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="stockCount">
							<Form.Label>Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter the quantity of this item that you currently have"
								value={stockCount}
								onChange={(e) => setStockCount(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id="image-file"
								label="Choose File"
								custom
								onChange={uploadFileHandler}
							>
								{uploading && <Loader />}
							</Form.File>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Briefly talk about your product"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="success" size="lg" block>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
