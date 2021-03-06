import express from "express";
const router = express.Router();

import {
	newMessage,
	getMessagesById,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, newMessage);
router.route("/:id").get(protect, getMessagesById);

export default router;
