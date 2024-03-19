import styled from 'styled-components';

export const Title = styled.h1``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  input {
    height: 30px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: 300ms;
    padding: 0 10px;

    &:focus {
      border-color: rgba(200, 50, 50, 1);
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: bottom;
  margin-top: 20px;
  position: relative;
  padding: 0 0 25px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: rgba(250, 250, 250, 0.8);
    background: rgba(255, 50, 50, 0.9);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  img {
    width: 180px;
    height: 180px;
  }
`;
