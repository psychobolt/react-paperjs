// @flow
import React from 'react';
import styled from 'styled-components';

import * as styles from './App.style';
import logo from './logo.svg';

type Props = {
  children: any
};

const Logo = styled.img`
  ${styles.logo}
`;

const Header = styled.header`
  ${styles.header}
`;

const Title = styled.h1`
  ${styles.h1}
`;

const App = styled.div`
  ${styles.app}
`;

export default ({ children }: Props) => (
  <App>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>
        {'Welcome to React'}
      </Title>
    </Header>
    {children}
  </App>
);
