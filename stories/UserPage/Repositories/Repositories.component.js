// @flow
import * as React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { fetchUserRepositories } from '../api';
import Repostory from './Repository';
import * as styles from './Repositories.style';

const UserRepositoriesResource = createResource(fetchUserRepositories);

const List = styled.ul`${styles.list}`;

type Props = {
  id: string;
}

export default ({ id }: Props) => {
  const repos = UserRepositoriesResource.read(id);
  return (
    <List>
      {repos.map(repo => <Repostory key={repo.name} {...repo} />)}
    </List>
  );
};
