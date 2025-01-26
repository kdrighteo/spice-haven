import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #ff4757;
    --primary-dark: #e0383f;
    --dark: #2f3542;
    --gray: #747d8c;
    --light-gray: #e9ecef;
    --light: #f8f9fa;
    --success: #2ecc71;
    --success-light: #d4edda;
    --warning: #f1c40f;
    --warning-light: #fff3cd;
    --error: #e74c3c;
    --error-light: #f8d7da;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--light);
    color: var(--dark);
    line-height: 1.5;
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle; 