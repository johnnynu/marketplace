import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store from "./store";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		cssVarPrefix: "ck",
	},
	colors: {
		black: "#000",
	},
});

ReactDOM.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</Provider>,
	document.getElementById("root")
);
