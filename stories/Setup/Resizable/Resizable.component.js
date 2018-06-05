import React from 'react';
import Resizable from 're-resizable';

import { renderWithPaperScope, PaperContainer, Circle } from 'src';

import { ref } from '../../shared';
import styles from './Resizable.style';

export default class extends React.Component {
  state = {
    width: styles.canvas.width,
    height: styles.canvas.height,
  }

  onResizeStop = (event, direction, refToElement) => {
    const width = refToElement.clientWidth;
    const height = refToElement.clientHeight;
    Object.assign(this.container.paper.view.viewSize, { width, height });
  }

  setContainer = container => { this.container = container; };

  render() {
    return (
      <Resizable style={styles.container} defaultSize={{ width: 'calc(100% - 10px)' }} onResizeStop={this.onResizeStop}>
        <PaperContainer
          ref={this.setContainer}
          canvasProps={{
            resize: 'true',
            style: {
              width: this.state.width,
              height: this.state.height,
            },
          }}
          viewProps={container => ({
            onResize: () => {
              const { width, height } = container.paper.view.viewSize;
              this.setState({ width: `${width}px`, height: `${height}px` });
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
      </Resizable>
    );
  }
}
