import express from "express";
import {
	addOrderItems,
	getOrderByID,
	updateOrderPaid,
	getMyOrders,
} from "../controllers/orderController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderPaid);

export default router;
