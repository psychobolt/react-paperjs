import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const Content = styled.p`
  font-size: large;
`;

const Messenger = () => console.log('Hello World!'); // eslint-disable-line no-console

const HelloWorld = () => (
  <Content>
      To get started, edit <code>src/HelloWorld/HelloWorld.component.js</code> and save to reload.
  </Content>
);

export default compose(HelloWorld, Messenger);
