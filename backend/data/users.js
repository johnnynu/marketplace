import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@random.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "non",
		email: "non@random.com",
		password: bcrypt.hashSync("123456", 10),
	},
	{
		name: "nonu",
		email: "nonu@random.com",
		password: bcrypt.hashSync("123456", 10),
	},
];

export default users;
