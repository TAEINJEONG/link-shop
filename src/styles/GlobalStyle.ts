import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body{
    margin: 0;
    font-family: "Pretendard", sans-serif;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  input, button {
    font-family: "Pretendard", sans-serif;
  }

  a {
    text-decoration: none;
  }

  img {
    object-fit: cover;
  }
`;

export default GlobalStyle;
