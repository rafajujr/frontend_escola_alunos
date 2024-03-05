import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      console.log('success');
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('deu erro');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('estou fazendo a requisição');
      return state;
    }

    default: {
      return state;
    }
  }
};
