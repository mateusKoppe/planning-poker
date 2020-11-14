import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import App from "./App";
import theme from "./utils/styles/theme"
import GlobalStyle from "./utils/styles/GlobalStyle"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
