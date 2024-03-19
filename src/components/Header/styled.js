// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const Nav = styled.nav`
  background: rgba(255, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
    padding: 0 5px;
    transition: 300ms;

    &:hover {
      color: black;
    }
  }
  span {
    padding: 20px 0px 0px 5px;
    position: relative;
    bottom: 5px;
    transition: 300ms;

    &:hover {
      color: black;
    }
  }
`;
