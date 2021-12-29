import React from 'react';
import { PaperContainer, Layer, Circle, renderWithPaperScope } from '@psychobolt/react-paperjs';
import { Grid, PanAndZoom } from '@psychobolt/react-paperjs-editor';
import styled from 'styled-components';

import * as styles from './PanAndZoom.style';
import { ref } from '../../shared';

const width = 500;
const height = 500;

const Container = styled(PaperContainer)`
  ${styles.container}
`;

export default () => (
  <Container
    canvasProps={{
      width,
      height,
      tabIndex: 0,
    }}
    onMount={paper => paper.view.element.focus()}
  >
    <PanAndZoom
      center={[0, 0]}
      prepanStyle={{
        cursor: '-webkit-grab',
      }}
      panStyle={{
        cursor: '-webkit-grabbing',
      }}
      onPanEnabled={() => {
        console.log('Pan enabled'); // eslint-disable-line no-console
      }}
      onPanDisabled={() => {
        console.log('Pan disabled'); // eslint-disable-line no-console
      }}
      onZoom={level => {
        console.log(`Zoom: ${level}`); // eslint-disable-line no-console
      }}
    >
      {renderWithPaperScope(paper => {
        const { top, left, right, bottom } = paper.view.bounds;
        return (
          <Grid
            ref={ref}
            width={width}
            height={height}
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            strokeWidth={1 / paper.view.zoom}
          />
        );
      })}
      <Layer ref={ref}>
        <Circle
          ref={ref}
          radius={35}
          strokeColor="black"
          fillColor="white"
        />
      </Layer>
    </PanAndZoom>
  </Container>
);
