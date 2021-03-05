import express from "express";
import { addOrderItems, getOrderByID } from "../controllers/orderController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderByID);

export default router;
