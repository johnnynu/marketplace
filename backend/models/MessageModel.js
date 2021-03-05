import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
	{
		fromUser: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		toUser: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		messageContent: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: false,
		},
	}
);

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;
