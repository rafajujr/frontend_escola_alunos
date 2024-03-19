import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/globalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/action';

import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isloading = useSelector((state) => state.auth.isloading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hanleSubmit = async (e) => {
    e.preventDefault();
    let formErros = false;

    if (!isEmail(email)) {
      formErros = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErros = true;
      toast.error('Senha inválida');
    }

    if (formErros) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isloading={isloading} />

      <h1>Login</h1>

      <Form onSubmit={hanleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
