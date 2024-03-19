import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { get } from 'lodash';
import * as actions from './action';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token/', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
    history.go('/');
  } catch (err) {
    toast.error('Usuário ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

// permanecer o token logado
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// saga de editar dados
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso');
      yield put(actions.registerSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSuccess());
      history.push('/login');
      history.go(0);
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      yield put(actions.loginFailure());
      toast.error('Voçê tem que fazer o login novamente');
      history.push('/login');
      return history.go(0);
    }

    if (errors.lenght > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('outro');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
