import express from "express";
import {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	latestProducts,
} from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, createProduct);
router.get("/latest", latestProducts);
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, deleteProduct)
	.put(protect, updateProduct);

export default router;
