// @flow
import * as React from 'react';
import styled, { type StyledComponent } from 'styled-components';

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

const App: StyledComponent<any, any, HTMLDivElement> = styled.div`
  ${styles.app}
`;

export default ({ children }: Props): React.Node => (
  <App>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>Welcome to React</Title>
    </Header>
    {children}
  </App>
);
