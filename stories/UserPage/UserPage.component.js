import './styles.css';
import React from 'react';
import styled from 'styled-components';

import Details from './Details';
import Repositories from './Repositories';
import * as styles from './UserPage.style';

const user = {
  name: 'psychobolt',
  image: 'https://avatars2.githubusercontent.com/u/560721?s=460&v=4',
};

const repos = [
  {
    name: 'react-rollup-boilerplate',
    url: 'https://github.com/psychobolt/react-rollup-boilerplate',
    description: 'A boilerplate for building React libraries.',
  },
  {
    name: 'react-regl',
    url: 'https://github.com/psychobolt/react-regl',
    description: 'React Fiber renderer and component container for Regl.',
  },
];

const Container = styled.div`${styles.container}`;

export default () => (
  <Container>
    <Details image={user.image} name={user.name} />
    <Repositories repos={repos} />
  </Container>
);
