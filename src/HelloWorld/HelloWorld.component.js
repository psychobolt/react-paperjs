import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import * as styles from './HelloWorld.style';

const Content = styled.p`
  ${styles.content}
`;

const Messenger = () => console.log('Hello World!'); // eslint-disable-line no-console

const HelloWorld = () => (
  <Content>
      To get started, edit <code>src/HelloWorld/HelloWorld.component.js</code> and save to reload.
  </Content>
);

export default compose(HelloWorld, Messenger);
