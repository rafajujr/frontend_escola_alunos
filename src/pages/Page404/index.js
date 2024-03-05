import React from 'react';

import { Container } from '../../styles/globalStyles';
import { Title } from './styled';

export default function Page404() {
  return (
    <Container>
      <Title isRed={false}>A página acessada não está disponível</Title>
      <p>Página em manutenção</p>

      <button type="button">Voltar para Home</button>
    </Container>
  );
}
