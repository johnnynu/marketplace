import asyncHandler from "express-async-handler";
import Message from "../models/MessageModel.js";

// @desc    Create new message
// @route   POST /api/messages
//@access   Private

const newMessage = asyncHandler(async (req, res) => {
	const { fromUser, toUser, messageContent } = req.body;
	console.log(req.body);

	const message = new Message({
		fromUser,
		toUser,
		messageContent,
	});

	const newMessage = await message.save();

	res.status(201).json(newMessage);
});

export { newMessage };
