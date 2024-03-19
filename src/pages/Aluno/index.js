import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmail, isFloat, isInt } from 'validator';
import { get } from 'lodash';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Container } from '../../styles/globalStyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
// import * as actions from '../../store/modules/auth/action';

export default function Aluno() {
  const { id } = useParams();

  // const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);

        setNome(data.nome);
        setEmail(data.email);
        setIdade(data.idade);
        setAltura(data.altura);
        setPeso(data.peso);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        toast.error(`Erro status ${status}: ${errors}`);
        history.push('/');
        history.go(0);
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome deve ter entre 3 e 255 caracetres');
      formErrors = true;
    }

    if (isEmail(email)) {
      formErrors = true;
    } else {
      toast.error('Email inválido');
    }

    if (isInt(String(idade))) {
      formErrors = true;
    } else {
      toast.error('Idade tem que ser um número inteiro');
    }

    if (isFloat(String(altura))) {
      formErrors = true;
    } else {
      toast.error('Altura tem que ser um numero, separado por ponto');
    }

    if (isFloat(String(peso))) {
      formErrors = true;
    } else {
      toast.error('Peso tem que ser um numero inteiro, separado por ponto');
    }

    if (!formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // Editando aluno
        await axios.put(`/alunos/${id}`, {
          nome,
          email,
          idade,
          altura,
          peso,
        });

        toast.success('Edição realizada com sucesso');
        history.push('/');
        history.go(0);
      } else {
        // Criando aluno
        const { data } = await axios.post(`/alunos/`, {
          nome,
          email,
          idade,
          altura,
          peso,
        });
        console.log('ue');
        toast.success(`Aluno ${data.nome} cadastrado com sucesso`);
        history.push(`/`);
        history.go(0);
      }

      setIsLoading(false);
    } catch (err) {
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </label>

        <label htmlFor="idade">
          Idade:
          <input
            type="text"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite sua idade"
          />
        </label>

        <label htmlFor="altura">
          Altura:
          <input
            type="text"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite sua Altura"
          />
        </label>

        <label htmlFor="peso">
          Peso:
          <input
            type="text"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite seu peso"
          />
        </label>

        <button type="submit">{id ? 'Editar aluno' : 'Cadastrar Aluno'}</button>
      </Form>
    </Container>
  );
}
