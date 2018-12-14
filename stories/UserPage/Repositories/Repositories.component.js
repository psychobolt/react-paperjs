// @flow
import * as React from 'react';
import styled from 'styled-components';

import Repostory, { Props as Repository } from './Repository';
import * as styles from './Repositories.style';

const List = styled.ul`${styles.list}`;

type Props = {
  repos: Repository[]
}

export default ({ repos }: Props) => (
  <List>
    {repos.map(repo => <Repostory key={repo.name} {...repo} />)}
  </List>
);
