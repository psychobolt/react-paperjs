import './styles.css';
import React, { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { fetchContributors } from './api';
import Details from './Details';
import Spinner, { SIZES } from './Spinner';
import * as styles from './UserPage.style';

const UserDetailsResource = createResource(fetchContributors);

const Container = styled.div`${styles.container}`;

const Repositories = React.lazy(() => import('./Repositories'));

const Contributors = () => {
  const users = UserDetailsResource.read();
  return users.map(user => (
    <Container key={user.name}>
      <Details image={user.image} name={user.name} />
      <Suspense fallback={<Spinner size={SIZES.Medium} />}>
        <Repositories id={user.name} />
      </Suspense>
    </Container>
  ));
};

export default () => (
  <Suspense fallback={<Spinner size={SIZES.Large} />}>
    <Contributors />
  </Suspense>
);
