import React from 'react';
import Resizable from 're-resizable';
import styled from 'styled-components';

import { renderWithPaperScope, PaperContainer, Circle } from '@psychobolt/react-paperjs';

import { ref } from '../../shared';
import * as styles from './Resizable.style';

const Container = styled(Resizable)`
  ${styles.container}
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: styles.canvas.width,
      height: styles.canvas.height,
    };
    this.container = React.createRef();
  }

  onResizeStop = (event, direction, refToElement) => {
    const width = refToElement.clientWidth;
    const height = refToElement.clientHeight;
    Object.assign(this.container.current.props.paper.view.viewSize, { width, height });
  }

  render() {
    const { width, height } = this.state;
    return (
      <Container defaultSize={{ width: 'calc(100% - 10px)' }} onResizeStop={this.onResizeStop}>
        <PaperContainer
          ref={this.container}
          canvasProps={{
            resize: 'true',
            style: { width, height },
          }}
          viewProps={paper => ({
            onResize: () => {
              const { width: vWidth, height: vHeight } = paper.view.viewSize;
              this.setState({ width: `${vWidth}px`, height: `${vHeight}px` });
            },
          })}
        >
          {renderWithPaperScope(paper => {
            const { x, y } = paper.view.center;
            return (
              <Circle
                ref={ref}
                radius={30}
                center={[x, y]}
                strokeColor="black"
              />
            );
          })}
        </PaperContainer>
      </Container>
    );
  }
}
