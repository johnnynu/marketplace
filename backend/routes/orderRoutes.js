import express from "express";
import {
	addOrderItems,
	getOrderByID,
	updateOrderPaid,
	updateOrderDelivered,
	getMyOrders,
	getAllOrders,
} from "../controllers/orderController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router
	.route("/")
	.post(protect, addOrderItems)
	.get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderPaid);
router.route("/:id/delivered").put(protect, updateOrderDelivered);

export default router;
