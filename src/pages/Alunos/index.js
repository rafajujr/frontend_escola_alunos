import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaQuestion,
} from 'react-icons/fa';
// import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Modal from 'react-modal';

import { Container } from '../../styles/globalStyles';
import { AlunoContanier, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
// import history from '../../services/history';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [foto, setFoto] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getDate() {
      setIsLoading(true);

      const response = await axios.get('/alunos/');
      setAlunos(response.data);
      setFoto(response.data.Foto);

      setIsLoading(false);
    }

    getDate();
  }, [foto]);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'blocs');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    console.log(e, id);
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);

      // DEU CERTO APAGAR A LINHA ATUALIZANDO A PÁGINA
      /*
      e.target.parentElement.remove();
      history.push('/');
      history.go(0);
      */
      setIsLoading(false);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  };

  return (
    <Container>
      <Loading isloading={isloading} />

      <h1>Lista de alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunoContanier>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img crossOrigin="anonymous" src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <spam>{aluno.nome}</spam>
            <spam>{aluno.idade}</spam>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaQuestion
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContanier>
    </Container>
  );
}
