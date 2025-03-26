import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  transition: background-color 0.5s ease, color 0.3s ease;

}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  overflow-y: ${(p) => p.$isVisibility};
  background-color: ${({ theme }) => theme.colors.primary.bg};
  color: ${({ theme }) => theme.colors.primary.text};
  transition: background-color 0.5s ease, color 0.3s ease;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
}


`;
