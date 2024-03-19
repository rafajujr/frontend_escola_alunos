import styled, { createGlobalStyle } from 'styled-components';
import {
  primaryColor,
  primaryDarkColor,
  errorColor,
  successColor,
} from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
margin: 0;
padding: 0;
outline: none;
box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: ${primaryColor};
}

html, body, #root {
  height: 100%;
}

h1 {
  text-align: center;
}

button {
  cursor: pointer;
  background: rgba(205, 0, 0, 0.9);
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  transition: all 300ms;
}

button:hover {
  filter: brightness(75%)
}

a {
  text-decoration: none;
  color: ${primaryDarkColor};
}

ul {
  list-style: none;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background-color: ${successColor};
  color: white
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: ${errorColor};
  color: white;
}

`;

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
