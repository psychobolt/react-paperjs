// @flow
import * as React from 'react';
import { defaultMemoize } from 'reselect';
import Paper from 'paper';

import PaperRenderer from './Paper.renderer';
import { CONSTANTS } from './Paper.types';
import { PaperScopeContext } from './hoc/PaperScope';

type CanvasProps = {
  onWheel: (event: SyntheticWheelEvent<HTMLCanvasElement>) => any
};

export type EventHandler = (event: any) => any;
export type KeyEventHandler = (event: typeof Paper.KeyEvent) => any;
export type MouseEventHandler = (event: typeof Paper.MouseEvent) => any;
export type ToolEventHandler = (event: typeof Paper.ToolEvent) => any;

type ViewProps = {
  onKeyDown: KeyEventHandler,
  onKeyUp: KeyEventHandler,
  onMouseDown: MouseEventHandler,
  onMouseDrag: MouseEventHandler,
  onMouseUp: MouseEventHandler,
  zoom: number,
  center: {} | number[],
};

type ScopedProps<P> = (paper: typeof Paper.PaperScope) => P;

type NestedProps<P> = P | ScopedProps<P>;

export type Props = {
  renderer?: typeof PaperRenderer,
  innerRef: Object,
  viewProps: NestedProps<ViewProps>,
  canvasProps: NestedProps<CanvasProps>,
  mergeProps: () => any,
  children?: React.Node
};

type State = {
  paper: typeof Paper.PaperScope,
  viewProps?: NestedProps<ViewProps>,
  canvasProps?: NestedProps<CanvasProps>
};

export function getProps(scope: typeof Paper.PaperScope, props: NestedProps<any>): any {
  if (typeof props === 'function') {
    return props(scope);
  }
  return props || {};
}

const getMergeProps = () => (state, props, scope) => ({
  ...getProps(scope, props),
  ...getProps(scope, state),
});

export default (Container => class PaperProvider
  extends React.Component<Props, State> {
  mergeContainerProps = defaultMemoize(getMergeProps());

  mergeViewProps = defaultMemoize(getMergeProps());

  mergeCanvasProps = defaultMemoize(getMergeProps());

  static defaultProps = {
    renderer: PaperRenderer,
    children: null,
  }

  constructor(props: Props) {
    super(props);
    const { renderer: Renderer = PaperRenderer } = props;
    this.renderer = new Renderer();
    this.state = {
      paper: this.renderer.createInstance(CONSTANTS.PaperScope, {}, Paper),
      mergeProps: props.mergeProps // eslint-disable-line react/no-unused-state
        || (mergeProps => this.setState(state => mergeProps(state, props))),
    };
  }

  renderer: PaperRenderer;

  render() {
    const { innerRef, children, viewProps, canvasProps, ...rest } = this.props;
    const { viewProps: viewState, canvasProps: canvasState, ...state } = this.state;
    return (
      <Container
        {...this.mergeContainerProps(state, rest, state.paper)}
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
}: React.ComponentType<any> => React.AbstractComponent<Props>);
