import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, footer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			{loading && <Loader />}
			<h1 align="center">
				<i class="fas fa-store"></i>
			</h1>
			{error && <Message variant="danger">{error}</Message>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
			</Form>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Row className="py-1"></Row>
				<Button type="submit" variant="success" size="lg" block>
					Sign In
				</Button>
			</Form>
			<Row className="py-2"></Row>
			<Row className="d-flex">
				<hr class="my-auto flex-grow-1" />
				<div class="px-4">or</div>
				<hr class="my-auto flex-grow-1" />
			</Row>
			<Row className="py-3">
				<Col md={12}>
					<Button
						type="submit"
						href={redirect ? `/register?redirect=${redirect}` : "/register"}
						variant="success"
						size="lg"
						block
					>
						Sign Up
					</Button>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
