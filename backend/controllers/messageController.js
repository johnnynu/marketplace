import asyncHandler from "express-async-handler";
import Messages from "../models/MessageModel.js";
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

// @desc    Get messages by other user's ID
// @route   GET /api/messages/:id
//@access   Private

const getMessagesById = asyncHandler(async (req, res) => {
	const { toUser, messageContent } = req.body;

	const receivingUser = await Messages.findById(toUser);
	console.log(messageContent);
	if (receivingUser) {
		res.status(201).json({
			messageContent,
		});
	}
});

export { newMessage, getMessagesById };
