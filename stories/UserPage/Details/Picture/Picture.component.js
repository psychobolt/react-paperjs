// @flow
import * as React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import * as styles from './Picture.style';

const { Suspense } = React;

const ImageResource = createResource(src => new Promise(resolve => {
  const img = new Image();
  img.onload = () => resolve(src);
  img.src = src;
}));

const Img = styled(({ src, alt, ...rest }) => (
  <img src={ImageResource.read(src)} alt={alt} {...rest} />
))`${styles.img}`;

type Props = {
  source: string
};

export default ({ source }: Props) => (
  <Suspense maxDuration={1500} fallback={<img src={source} alt="poster" />}>
    <Img src={source} alt="profile picture" />
  </Suspense>
);
