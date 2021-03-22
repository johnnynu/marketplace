import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Button as ChakraButton } from "@chakra-ui/react";

const SearchBar = ({ history }) => {
	const [keyword, setKeyword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Find a product"
				className="mr-sm-2 ml-sm-5"
			></Form.Control>
			<ChakraButton type="submit" colorScheme="teal">
				Search
			</ChakraButton>
		</Form>
	);
};

export default SearchBar;
