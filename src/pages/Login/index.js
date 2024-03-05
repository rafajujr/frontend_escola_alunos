import React from 'react';
// import { useHistory } from 'react-router-dom';

// import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/globalStyles';
import { Title } from './styled';
import * as exampleActions from '../../store/modules/example/action';

export default function Login() {
  // const history = useHistory();
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(exampleActions.clicaBotaoRequest());
    // history.push('/');
  }
  /*
  toast.success('Jesus te ama!', {
    toastId: 'success1',
  });
  toast.error('entrega tua vida a Ele', {
    toastId: 'Error1',
  });
  */

  return (
    <Container>
      <Title isRed={false}>
        Login
        <small>Oie</small>
      </Title>
      <p>Loren 5</p>

      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
