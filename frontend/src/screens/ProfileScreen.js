import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, footer, Table } from "react-bootstrap";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Heading,
	Button as ChakraButton,
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
} from "@chakra-ui/react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const userOrderList = useSelector((state) => state.orderUserList);
	const { loading: loadingOrders, error: errorOrders, orders } = userOrderList;

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails("profile"));
				dispatch(listMyOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row className="justify-content-md-left">
			<Col>
				{loading && <Loader />}
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Changes Saved</Message>}
				<Heading as="h2">Profile Settings</Heading>
				<Form onSubmit={submitHandler}>
					<FormControl id="name" mt={1}>
						<FormLabel>Name</FormLabel>
						<Input
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Input>
					</FormControl>
					<FormControl id="email" mt={1}>
						<FormLabel>Email Address</FormLabel>
						<Input
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Input>
					</FormControl>
					<FormControl id="password" mt={1}>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Input>
					</FormControl>
					<FormControl id="confirmPassword" mt={1}>
						<FormLabel>Confirm Password</FormLabel>
						<Input
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Input>
					</FormControl>
					<Row className="py-2"></Row>
					<Button
						type="submit"
						variant="success"
						size="lg"
						block
						className="mx-auto"
					>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={10}>
				<Heading as="h2">My Orders</Heading>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<ChakraTable variant="striped" colorScheme="blackAlpha" size="md">
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Date</Th>
								<Th>Total</Th>
								<Th>Paid</Th>
								<Th>Delivered</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{orders.map((order) => (
								<Tr key={order._id}>
									<Td>{order._id}</Td>
									<Td>{order.createdAt.substring(0, 10)}</Td>
									<Td>{order.totalPrice}</Td>
									<Td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</Td>
									<Td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</Td>
									<Td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className="btn-sm" variant="success">
												Details
											</Button>
										</LinkContainer>
									</Td>
								</Tr>
							))}
						</Tbody>
					</ChakraTable>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
