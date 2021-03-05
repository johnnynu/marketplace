import express from "express";
const router = express.Router();

import { newMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, newMessage);

export default router;
