import styled from 'styled-components';

export const Title = styled.h1``;

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed rgba(255, 80, 80, 1);
    cursor: pointer;
    border-radius: 50%;
    margin: 30px auto;
  }

  input {
    display: none;
  }

  img {
    width: 180px;
    height: 170px;
    border-radius: 50%;
  }
`;
