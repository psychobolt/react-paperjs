// @flow
import * as React from 'react';
import { defaultMemoize } from 'reselect';
import paper, { typeof KeyEvent, typeof MouseEvent, typeof ToolEvent, typeof Event } from 'paper';

import PaperRenderer from './Paper.renderer';
import { type Paper, CONSTANTS } from './Paper.types';
import { PaperScopeContext } from './hoc/PaperScope';

type CanvasProps = {
  onWheel: (event: SyntheticWheelEvent<HTMLCanvasElement>) => any
};

export type EventHandler = (event: Event) => any;
export type KeyEventHandler = (event: KeyEvent) => any;
export type MouseEventHandler = (event: MouseEvent) => any;
export type ToolEventHandler = (event: ToolEvent) => any;

type ViewProps = {
  onKeyDown: KeyEventHandler,
  onKeyUp: KeyEventHandler,
  onMouseDown: MouseEventHandler,
  onMouseDrag: MouseEventHandler,
  onMouseUp: MouseEventHandler,
  zoom: number,
  center: {} | number[],
};

type ScopedProps<P> = (paper: Paper) => P;

type NestedProps<P> = P | ScopedProps<P>;

export type Props = {
  renderer: typeof PaperRenderer,
  innerRef: Object,
  viewProps: NestedProps<ViewProps>,
  canvasProps: NestedProps<CanvasProps>,
  mergeProps: () => any,
  children: React.Node
};

type State = {
  paper: Paper,
  viewProps?: NestedProps<ViewProps>,
  canvasProps?: NestedProps<CanvasProps>
};

export function getProps<P>(scope: Paper, props: NestedProps<P>) {
  if (typeof props === 'function') {
    const scopedProps = (props: ScopedProps<P>);
    return scopedProps(scope);
  }
  return props || {};
}

const getMergeProps = () => (state, props, scope) => ({
  ...getProps(scope, props),
  ...getProps(scope, state),
});

export default (Container: React.ComponentType<any>) => class PaperProvider
  extends React.Component<Props, State> {
  mergeViewProps = defaultMemoize(getMergeProps());

  mergeCanvasProps = defaultMemoize(getMergeProps());

  static defaultProps = {
    renderer: PaperRenderer,
  }

  constructor(props: Props) {
    super(props);
    const Renderer = props.renderer;
    this.renderer = new Renderer();
    this.state = {
      paper: this.renderer.createInstance(CONSTANTS.PaperScope, {}, paper),
      mergeProps: props.mergeProps
        || (mergeProps => this.setState(state => mergeProps(state, props))),
    };
  }

  renderer: PaperRenderer;

  render() {
    const { innerRef, children, viewProps, canvasProps, ...rest } = this.props;
    const { viewProps: viewState, canvasProps: canvasState, ...state } = this.state;
    return (
      <Container
        {...rest}
        {...state}
        viewProps={this.mergeViewProps(viewState, viewProps, state.paper)}
        canvasProps={this.mergeCanvasProps(canvasState, canvasProps, state.paper)}
        ref={innerRef}
        renderer={this.renderer}
      >
        <PaperScopeContext.Provider value={state}>
          {children}
        </PaperScopeContext.Provider>
      </Container>
    );
  }
};
