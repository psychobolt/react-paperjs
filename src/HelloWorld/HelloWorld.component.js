import React, { Suspense } from 'react';
import styled from 'styled-components';

import * as styles from './HelloWorld.style';

export const Content = styled.p`
  ${styles.content}
`;

const Messenger = React.lazy(() => import('./Messenger'));

export default () => (
  <Suspense fallback={<p>Waiting for message...</p>}>
    <Content>
      {'To get started, edit '}
      <code>
        src/HelloWorld/HelloWorld.component.js
      </code>
      {' and save to reload.'}
    </Content>
    <Messenger />
  </Suspense>
);
