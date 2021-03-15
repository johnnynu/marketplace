import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { AiTwotoneShop } from "react-icons/ai";

import {
	Box,
	Text,
	Flex,
	Heading,
	MenuItems,
	Menu,
	MenuButton,
	Button,
	ChevronDownIcon,
} from "@chakra-ui/react";

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<>
			<header>
				<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
					<Container>
						<LinkContainer to="/">
							<Navbar.Brand>
								<Text fontSize="2xl">Marketplace</Text>
							</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ml-auto">
								<LinkContainer to="/cart">
									<Nav.Link>
										<i className="fas fa-shopping-cart"></i> Cart
									</Nav.Link>
								</LinkContainer>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id="username">
										<LinkContainer to="/profile">
											<NavDropdown.Item>
												<Text fontSize="md">Profile</Text>
											</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/messages">
											<NavDropdown.Item>Messages</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logoutHandler}>
											Sign Out
										</NavDropdown.Item>
									</NavDropdown>
								) : (
									<LinkContainer to="/login">
										<Nav.Link>
											<i className="fas fa-user"></i> Sign In
										</Nav.Link>
									</LinkContainer>
								)}
								{userInfo && userInfo.isAdmin && (
									<NavDropdown title="Admin" id="adminmenu">
										<LinkContainer to="/admin/users">
											<NavDropdown.Item>
												<Text fontSize="md">Users</Text>
											</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/products">
											<NavDropdown.Item>
												<Text fontSize="md">Products</Text>
											</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/orders">
											<NavDropdown.Item>
												<Text fontSize="md">Orders</Text>
											</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
};

export default Header;
