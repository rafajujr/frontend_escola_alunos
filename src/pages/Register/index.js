import React, { useEffect, useState } from 'react';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Container } from '../../styles/globalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/action';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isloading = useSelector((state) => state.auth.isloading);

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error('Email inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErros = true;
      toast.error('A senha deve ter entre 6 e 50 caracteres');
    }

    if (formErros) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  return (
    <Container>
      <Loading isloading={isloading} />

      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite eus e-mail"
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>

        <button type="submit">
          {id ? 'salvar dados' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
