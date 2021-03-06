import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetches all products
// @route   GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetches a single product
// @route   GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product does not exist.");
	}
});

// @desc    Delete a single product
// @route   DELETE /api/products/:id
//@access   Private
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product successfully removed. " });
	} else {
		res.status(404);
		throw new Error("Product does not exist.");
	}
});

// @desc    Create a single product
// @route   POST /api/products
//@access   Private
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		category: "category",
		stockCount: 0,
		numReviews: 0,
		description: "description",
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a single product
// @route   PUT /api/products/:id
//@access   Private
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, category, stockCount } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.category = category;
		product.stockCount = stockCount;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product does not exist.");
	}
});

// @desc    Get latest products
// @route   GET /api/products/latest
//@access   Public
const latestProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ createdAt: "desc" }).limit(3);

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	latestProducts,
};
