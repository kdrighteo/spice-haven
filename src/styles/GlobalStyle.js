import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #FF6B6B;
    --primary-dark: #FF5252;
    --secondary: #4ECDC4;
    --dark: #2C3E50;
    --gray: #95A5A6;
    --light-gray: #ECF0F1;
    --light: #F8F9FA;
    --error: #E74C3C;
    --success: #2ECC71;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: var(--dark);
  }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle; 