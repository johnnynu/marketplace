import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
	Box,
	ButtonGroup,
	Flex,
	IconButton,
	Link as ChakraLink,
	Stack,
	Text,
	Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";

const Footer = () => {
	return (
		<>
			<Divider />
			<Box as="footer" role="contentinfo" py="6">
				<Flex
					direction={{ base: "column", md: "row" }}
					maxW={{ base: "xl", md: "7xl" }}
					mx="auto"
					px={{ base: "6", md: "8" }}
					align="center"
				>
					<a
						aria-current="page"
						aria-label="Back to Home page"
						href="/"
						rel="home"
					>
						<AiTwotoneShop size="2em" />
					</a>
					<Stack
						my={{ base: "6", md: 0 }}
						direction={{ base: "column", md: "row" }}
						marginStart={{ md: "8" }}
						fontSize="sm"
						spacing={{ base: "2", md: "8" }}
						textAlign={{ base: "center", md: "start" }}
					>
						<Text>&copy; {new Date().getFullYear()} Marketplace</Text>
						<Text>My personal project, nothing here is real.</Text>
						<Text>Check out the project on github!</Text>
					</Stack>
					<ButtonGroup
						marginStart={{ md: "auto" }}
						color="gray.600"
						variant="ghost"
					>
						<ChakraLink
							href="https://github.com/johnnynu/marketplace"
							isExternal
						>
							<IconButton as="a" aria-label="Github" icon={<FaGithub />} />
						</ChakraLink>
					</ButtonGroup>
				</Flex>
			</Box>
		</>
	);
};

export default Footer;
