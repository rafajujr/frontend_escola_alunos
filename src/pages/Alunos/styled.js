import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContanier = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  position: relative;
  left: 310px;
  padding: 5px 10px;
  margin: 10px 0;
  text-align: center;
  font-family: sans-serif;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  border: solid 2px rgba(255, 0, 0, 0.5);
  background: rgba(200, 50, 50, 1);
  border-radius: 20px;
  width: 120px;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    filter: brightness(85%);
  }
`;
