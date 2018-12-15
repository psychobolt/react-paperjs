// @flow
import * as React from 'react';
import styled from 'styled-components';

import * as styles from './Spinner.style';

const { SIZES } = styles;

const SPINNER_SIZES = {
  [SIZES.Small]: 30,
  [SIZES.Medium]: 50,
  [SIZES.Large]: 70,
};

const STROKE_WIDTHS = {
  [SIZES.Small]: 4,
  [SIZES.Medium]: 5,
  [SIZES.Large]: 6,
};

type Props = {
  size: typeof SIZES,
};

const Container = styled.div`${styles.container}`;

const Path = styled.svg`${styles.path}`;

// Heavily inspired by https://codepen.io/mrrocks/pen/EiplA
export default ({ size = SIZES.Small }: Props) => {
  const baseSize = SPINNER_SIZES[size];
  const pathSize = baseSize / 2;
  const strokeWidth = STROKE_WIDTHS[size];
  const pathRadius = `${pathSize - strokeWidth}px`;
  return (
    <Container size={size}>
      <Path size={size} width={baseSize} height={baseSize} viewBox={`0 0 ${baseSize} ${baseSize}`}>
        <circle fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" cx={pathSize} cy={pathSize} r={pathRadius} />
      </Path>
    </Container>
  );
};
