import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Disclaimer: This website is a personal project of mine. Nothing on
						here is actually for sale (or real) so please don't buy anything!
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
