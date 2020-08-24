// @flow
import * as React from 'react';
import styled, { type StyledComponent } from 'styled-components';

import Picture from './Picture';
import * as styles from './Details.style';

const Container: StyledComponent<any, any, HTMLDivElement> = styled.div`${styles.container}`;

const Name = styled.div`${styles.name}`;

type Props = {
  image: string,
  name: string
};

export default ({ image, name }: Props) => (
  <Container>
    <Picture source={image} />
    <Name>{name}</Name>
  </Container>
);
