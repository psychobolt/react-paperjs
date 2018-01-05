// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from './logo.svg';

type Props = {
  children: any
};

const appLogoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Logo = styled.img`
  animation: ${appLogoSpin} infinite 20s linear;
  height: 80px;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const App = styled.div`
  text-align: center;
`;

export default ({ children }: Props) => (
  <App>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>Welcome to React</Title>
    </Header>
    {children}
  </App>
);
