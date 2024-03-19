import React from 'react';
import {
  FaHome,
  FaPowerOff,
  FaSignInAlt,
  FaUserAlt,
  FaUserEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-modal';

import { Nav } from './styled';
import * as actions from '../../store/modules/auth/action';
import history from '../../services/history';

// Modal.setAppElement('#root');

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [modalIsOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.go(0);
  };
  /*
  function abrirModal() {
    setIsOpen(true);
  }
  function fecharModal() {
    setIsOpen(false);
  }

  COLOCA O MODAL DENTRO DO COMPONENTE

  <div>
        <button onClick={abrirModal} type="submit">
          Abrir modal
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={(e) => fecharModal(e)}
          contentLabel="Modal de exemplo"
        >
          <h2>Olá</h2>
          <button onClick={fecharModal} type="submit">
            Fechar
          </button>
          <div>Eu sou uma modal</div>
        </Modal>
      </div>
  */
  return (
    <Nav>
      {isLoggedIn && (
        <Link to="/">
          <FaHome size={24} />
          <span>home</span>
        </Link>
      )}

      {isLoggedIn ? (
        <Link to="register">
          <FaUserEdit size={24} />
          <span>Editar</span>
        </Link>
      ) : (
        <Link to="/register">
          <FaUserAlt size={24} />
          <span>Cadastro</span>{' '}
        </Link>
      )}

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
          <span>Sair</span>
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
          <span>Entrar</span>
        </Link>
      )}
    </Nav>
  );
}
