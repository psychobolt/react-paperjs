import React from 'react';
import styled from 'styled-components';

const Content = styled.p`
  font-size: large;
`;

const HelloWorld = () => {
  console.log('Hello World!'); // eslint-disable-line no-console
  return (
    <Content>
       To get started, edit <code>src/HelloWorld/HelloWorld.component.js</code> and save to reload.
    </Content>
  );
};

export default HelloWorld;
