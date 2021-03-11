import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, footer, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import {
	Box,
	Button as ChakraButton,
	Heading,
	SimpleGrid,
	Text,
	useColorModeValue,
	VisuallyHidden,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	CloseButton as ChakraCloseButton,
	Center,
} from "@chakra-ui/react";
import { DividerWithText } from "../components/DividerWithText";
import { FcGoogle } from "react-icons/fc";

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
		<form onSubmit={submitHandler}>
			<Box
				bg={useColorModeValue("gray.50", "inherit")}
				minH="100vh"
				py="12"
				px={{ sm: "6", lg: "8" }}
			>
				<Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} w={{ sm: "full" }}>
					{loading && <Loader />}
					{error && (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle mr={2}>Login info incorrect</AlertTitle>
							<AlertDescription>
								Please enter correct login credentials
							</AlertDescription>
							{error}
						</Alert>
					)}
					<Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
						Sign In
					</Heading>
					<Text mt="4" align="center" maxW="md" fontWeight="medium">
						<span>Don't have an account?</span>
						<Box
							as="a"
							marginStart="1"
							href={redirect ? `/register?redirect=${redirect}` : "/register"}
							color={useColorModeValue("blue.600", "blue.200")}
							_hover={{ color: "blue.600" }}
							display={{ base: "block", sm: "revert" }}
						>
							Sign Up!
						</Box>
					</Text>
				</Box>
				<Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="8" w={{ sm: "full" }}>
					<Box
						bg={useColorModeValue("white", "gray.700")}
						py="8"
						px={{ base: "4", md: "10" }}
						shadow="base"
						rounded={{ sm: "lg" }}
					>
						<Stack spacing="6">
							<FormControl id="email">
								<FormLabel>Email Address</FormLabel>
								<Input
									type="email"
									placeholder="Enter email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Center p={4}>
									<ChakraButton
										type="submit"
										variant="solid"
										w="full"
										maxW="md"
									>
										<Center>
											<Text>Sign In</Text>
										</Center>
									</ChakraButton>
								</Center>
							</FormControl>
						</Stack>
						<DividerWithText mt="1">or</DividerWithText>
						<Center p={4}>
							<ChakraButton
								variant="solid"
								w="full"
								maxW="md"
								leftIcon={<FcGoogle />}
							>
								<Center>
									<Text>Sign in With Google</Text>
								</Center>
							</ChakraButton>
						</Center>
					</Box>
				</Box>
			</Box>
		</form>
	);
};

export default LoginScreen;
