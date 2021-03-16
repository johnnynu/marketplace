import express from "express";
import {
	getProductById,
	getProducts,
	deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, deleteProduct);

export default router;
