// @flow
import React from 'react';
import type { KeyEvent, MouseEvent } from 'paper';

import PaperContainer, { getProps, type Props, type EventHandler } from '../../Paper.container';

type ExtendedProps = {
  prepanStyle: {},
  panStyle: {},
  onPanEnabled: Function,
  onPanDisabled: Function,
  onZoom: Function,
  viewZoom: number,
  viewCenter: {} | number[],
} & Props;

type State = {
  draggable: boolean,
  dragStart: ?Object,
  viewZoom: number,
  viewCenter: ?number[] | ?Object
};

function add(num1, num2) {
  return ((num1 * 10) + (num2 * 10)) / 10;
}

function callAllHandlers(handlers: EventHandler[] = []) {
  return event => handlers.forEach(handler => handler && handler(event));
}

export default (Container: any) =>
  class PanAndScroll extends React.Component<ExtendedProps, State> {
    static defaultProps = {
      viewZoom: 1,
      onPanEnabled: () => {},
      onPanDisabled: () => {},
      onZoom: () => {},
    };

    constructor(props: ExtendedProps) {
      super(props);
      this.state = {
        draggable: false,
        dragStart: null,
        viewZoom: props.viewZoom,
        viewCenter: props.viewCenter,
      };
    }

    componentWillReceiveProps(props: ExtendedProps) {
      const { viewZoom } = props;
      if (this.props.viewZoom !== viewZoom) this.setState({ viewZoom });
    }

    onWheel = (event: SyntheticWheelEvent<HTMLCanvasElement>) => {
      const { viewZoom } = this.state;
      if (event.deltaY < 0) {
        const level = add(viewZoom, 0.1);
        this.setState({ viewZoom: level });
        this.props.onZoom(level);
      }
      if (event.deltaY > 0 && viewZoom > 0.1) {
        const level = add(viewZoom, -0.1);
        this.setState({ viewZoom: level });
        this.props.onZoom(level);
      }
    }

    onKeyDown = (event: KeyEvent) => {
      if (event.key === 'space' && !this.state.draggable) {
        this.setState({ draggable: true });
        this.props.onPanEnabled();
      }
    }

    onKeyUp = (event: KeyEvent) => {
      if (event.key === 'space') {
        this.setState({ draggable: false });
        this.props.onPanDisabled();
      }
    }

    onMouseDown = (event: MouseEvent) => {
      if (this.state.draggable && !this.state.dragStart) {
        this.setState({ dragStart: event.point });
      }
    }

    onMouseUp = () => {
      if (this.state.dragStart) {
        this.setState({ dragStart: null });
      }
    }

    onMouseDrag = (event: MouseEvent) => {
      if (this.container && this.state.dragStart) {
        this.setState({
          dragStart: event.point,
          viewCenter:
            this.container.paper.view.center
              .add(event.point.subtract(this.state.dragStart)
                .multiply(0.5)),
        });
      }
    }

    getPanStyle = () => {
      const { prepanStyle, panStyle } = this.props;
      const { draggable, dragStart } = this.state;
      if (draggable) {
        if (dragStart) {
          return panStyle;
        }
        return prepanStyle;
      }
      return {};
    }

    container: ?PaperContainer;

    render() {
      const { canvasProps, viewProps, ...rest } = this.props;
      const { viewZoom, viewCenter } = this.state;
      const { onWheel: onZoom, getPanStyle } = this;
      const getCanvasProps = container => {
        const { onWheel, style, ...props } = getProps(container, canvasProps);
        return {
          onWheel: callAllHandlers([onWheel, onZoom]),
          style: Object.assign({}, style, getPanStyle()),
          ...props,
        };
      };
      const getViewProps = container => {
        const { onKeyDown, onKeyUp, onMouseDown, onMouseDrag, onMouseUp, ...props } =
          getProps(container, viewProps);
        return {
          onKeyDown: callAllHandlers([onKeyDown, this.onKeyDown]),
          onKeyUp: callAllHandlers([onKeyUp, this.onKeyUp]),
          onMouseDown: callAllHandlers([onMouseDown, this.onMouseDown]),
          onMouseDrag: callAllHandlers([onMouseDrag, this.onMouseDrag]),
          onMouseUp: callAllHandlers([onMouseUp, this.onMouseUp]),
          zoom: viewZoom,
          center: viewCenter || container.paper.view.center,
          ...props,
        };
      };
      return (
        <Container
          ref={ref => { this.container = ref; }}
          canvasProps={getCanvasProps}
          viewProps={getViewProps}
          {...this.state}
          {...rest}
        />
      );
    }
  };
