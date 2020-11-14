import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.family};
    font-size: ${({ theme }) => theme.fonts.size};
    margin: 0;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle;
