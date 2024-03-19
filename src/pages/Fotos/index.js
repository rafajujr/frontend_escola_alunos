import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import { Container } from '../../styles/globalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Fotos() {
  const { id } = useParams();

  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');
      history.push('/');
      history.go(0);
      setIsLoading(false);
    } catch (err) {
      toast.error('Erro ao enviar foto');
    }
  };

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);
      } catch {
        toast.error('Erro ao obter a imagem');
        history.push('/');
      }
    }

    getData();
  });

  return (
    <Container>
      <Loading isloading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar foto'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
