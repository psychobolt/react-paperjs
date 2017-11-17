// @flow
import React, { type Element } from 'react';

import { PaperContainer } from 'src';

type Props = {};

type State = {
  draggable: boolean,
  dragStart: ?Object,
  viewZoom: number,
  viewCenter: ?number[] | ?Object
};

function add(num1, num2) {
  return ((num1 * 10) + (num2 * 10)) / 10;
}

type EventHandler = (event: {}) => any;

function callAllHandlers(handlers: EventHandler[] = []) {
  return (event) => handlers.forEach(handler => handler && handler(event));
}

export default (Container: Element<typeof PaperContainer>) =>
  class PanAndScroll extends React.Component<Props, State> {
    state = {
      draggable: false,
      dragStart: null,
      viewZoom: 1,
      viewCenter: null,
    }

    componentDidMount() {
      if (this.container) {
        const { view } = this.container.paper;
        const { viewZoom, viewCenter } = this.state;
        const { onKeyDown, onKeyUp, onMouseDown, onMouseDrag, onMouseUp } = view;
        Object.assign(view, {
          onKeyDown: callAllHandlers([onKeyDown, this.onKeyDown]),
          onKeyUp: callAllHandlers([onKeyUp, this.onKeyUp]),
          onMouseDown: callAllHandlers([onMouseDown, this.onMouseDown]),
          onMouseDrag: callAllHandlers([onMouseDrag, this.onMouseDrag]),
          onMouseUp: callAllHandlers([onMouseUp, this.onMouseUp]),
          zoom: viewZoom,
          center: viewCenter || this.container.paper.view.center,
        });
      }
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
      if (this.container) {
        const { viewZoom, viewCenter } = nextState;
        Object.assign(this.container.paper.view, {
          zoom: viewZoom,
          center: viewCenter || this.container.paper.view.center,
        });
      }
    }

    onWheel = (event: SyntheticWheelEvent<HTMLCanvasElement>) => {
      const { viewZoom } = this.state;
      if (event.deltaY < 0) {
        this.setState({ viewZoom: add(viewZoom, 0.1) });
      }
      if (event.deltaY > 0 && viewZoom > 0.1) {
        this.setState({ viewZoom: add(viewZoom, -0.1) });
      }
    }

    onKeyDown = (event: any) => {
      if (event.key === 'space' && !this.state.draggable) {
        this.setState({ draggable: true });
      }
    }

    onKeyUp = (event: any) => {
      if (event.key === 'space') {
        this.setState({ draggable: false });
      }
    }

    onMouseDown = (event: any) => {
      if (this.state.draggable && this.state.dragStart == null) {
        this.setState({ dragStart: event.point });
      }
    }

    onMouseUp = () => {
      this.setState({ dragStart: null });
    }

    onMouseDrag = (event: any) => {
      if (this.state.draggable) {
        this.setState({
          dragStart: event.point,
          viewCenter:
            this.container.paper.view.center
              .add(event.point.subtract(this.state.dragStart)
                .multiply(0.5)),
        });
      }
    }

    container: PaperContainer;

    render() {
      return (
        <div onWheel={this.onWheel}>
          <Container
            containerRef={ref => { this.container = ref; }}
            {...this.state}
          />
        </div>
      );
    }
  };
