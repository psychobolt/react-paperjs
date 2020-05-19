// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import type { EventHandler } from '@psychobolt/react-paperjs';
import type { PaperScope as PaperScopeType, KeyEvent, MouseEvent } from 'paper';

const { PaperScope, getProps } = ReactPaperJS;

type Props = {
  onPanEnabled?: () => any,
  onPanDisabled?: () => any,
  onZoom?: (level: number) => any,
  zoomLevel?: number,
  center: Object | number[],
  paper: PaperScopeType,
  mergeProps: (state: {}, props?: {}) => {},
  children: any,
};

type State = {
  draggable: boolean,
  dragStart: ?Object,
};

function add(num1, num2) {
  return ((num1 * 10) + (num2 * 10)) / 10;
}

function callAllHandlers(handlers: EventHandler[] = []) {
  return event => handlers.forEach(handler => handler && handler(event));
}

// $FlowFixMe
export default @PaperScope class PanAndScroll extends React.Component<Props, State> {
  static defaultProps = {
    zoomLevel: 1,
    onPanEnabled: () => {},
    onPanDisabled: () => {},
    onZoom: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      draggable: false,
      dragStart: null,
    };
  }

  componentDidMount() {
    const { paper, zoomLevel, center, mergeProps } = this.props;
    mergeProps((state, props) => {
      const { onWheel, ...canvasProps } = getProps(paper, props.canvasProps);
      const {
        onKeyDown, onKeyUp, onMouseDown, onMouseDrag, onMouseUp, ...viewProps
      } = getProps(paper, props.viewProps);
      return {
        canvasProps: {
          ...canvasProps,
          onWheel: callAllHandlers([onWheel, this.onWheel]),
          'drag-state': 'disabled',
        },
        viewProps: {
          ...viewProps,
          onKeyDown: callAllHandlers([onKeyDown, this.onKeyDown]),
          onKeyUp: callAllHandlers([onKeyUp, this.onKeyUp]),
          onMouseDown: callAllHandlers([onMouseDown, this.onMouseDown]),
          onMouseDrag: callAllHandlers([onMouseDrag, this.onMouseDrag]),
          onMouseUp: callAllHandlers([onMouseUp, this.onMouseUp]),
          zoom: zoomLevel,
          center,
        },
      };
    });
  }

  onWheel = ({ deltaY }: SyntheticWheelEvent<HTMLCanvasElement>) => {
    const { onZoom, mergeProps } = this.props;
    mergeProps((state, props) => {
      let { zoom } = state.viewProps;
      if (deltaY < 0) {
        zoom = add(zoom, 0.1);
        if (onZoom) onZoom(zoom);
        return {
          viewProps: {
            ...props.viewProps,
            ...state.viewProps,
            zoom,
          },
        };
      }
      if (deltaY > 0 && zoom > 0.1) {
        zoom = add(zoom, -0.1);
        if (onZoom) onZoom(zoom);
        return {
          viewProps: {
            ...props.viewProps,
            ...state.viewProps,
            zoom,
          },
        };
      }
      return null;
    });
  }

  onKeyDown = ({ key }: KeyEvent) => {
    const { draggable } = this.state;
    if (key === 'space' && !draggable) {
      const { onPanEnabled, mergeProps } = this.props;
      mergeProps((state, props) => ({
        ...state,
        canvasProps: {
          ...props.canvasProps,
          ...state.canvasProps,
          'drag-state': 'enabled',
        },
      }));
      this.setState({ draggable: true });
      if (onPanEnabled) onPanEnabled();
    }
  }

  onKeyUp = ({ key }: KeyEvent) => {
    if (key === 'space') {
      const { onPanDisabled, mergeProps } = this.props;
      mergeProps((state, props) => ({
        ...state,
        canvasProps: {
          ...props.canvasProps,
          ...state.canvasProps,
          'drag-state': 'disabled',
        },
      }));
      this.setState({ draggable: false });
      if (onPanDisabled) onPanDisabled();
    }
  }

  onMouseDown = ({ point }: MouseEvent) => {
    const { draggable, dragStart } = this.state;
    if (draggable && !dragStart) {
      const { mergeProps } = this.props;
      mergeProps((state, props) => ({
        ...state,
        canvasProps: {
          ...props.canvasProps,
          ...state.canvasProps,
          'drag-state': 'dragging',
        },
      }));
      this.setState({ dragStart: point });
    }
  }

  onMouseUp = () => {
    const { dragStart, draggable } = this.state;
    if (dragStart) {
      if (draggable) {
        const { mergeProps } = this.props;
        mergeProps((state, props) => ({
          ...state,
          canvasProps: {
            ...props.canvasProps,
            ...state.canvasProps,
            'drag-state': 'enabled',
          },
        }));
      }
      this.setState({ dragStart: null });
    }
  }

  onMouseDrag = ({ point }: MouseEvent) => {
    const { mergeProps, paper } = this.props;
    const { draggable, dragStart } = this.state;
    mergeProps((state, props) => {
      if (dragStart) {
        return {
          viewProps: {
            ...props.viewProps,
            ...state.viewProps,
            center:
              paper.view.center
                .add(point.subtract(dragStart)
                  .multiply(0.5)),
          },
        };
      }
      return null;
    });
    if (draggable) {
      this.setState({ dragStart: point });
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
