// @flow
import * as React from 'react';
import { typeof KeyEvent, typeof MouseEvent, typeof ToolEvent, typeof Event } from 'paper';

import PaperRenderer from './Paper.renderer';
import PaperProvider from './Paper.provider'; // eslint-disable-line no-unused-vars
import { type Paper, CONSTANTS } from './Paper.types';

/* eslint-disable no-use-before-define */

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

export function getProps<P>(paper: Paper, props: NestedProps<P>) {
  if (typeof props === 'function') {
    const scopedProps = (props: ScopedProps<P>);
    return scopedProps(paper);
  }
  return props || {};
}

export type Props = {
  onMount?: (paper: Paper) => void,
  canvasProps: NestedProps<CanvasProps>,
  viewProps: NestedProps<ViewProps>,
  paper: Paper,
  renderer: PaperRenderer,
  className: string,
  children: any,
};

/* eslint-enable no-use-before-define */

// $FlowFixMe
@PaperProvider
class PaperContainer extends React.Component<Props> {
  static defaultProps = {
    onMount: () => {},
  };

  constructor(props: Props) {
    super(props);
    const { renderer, paper } = this.props;
    this.mountNode = renderer.reconciler.createContainer(paper);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const { paper, onMount } = this.props;
    if (this.canvas.current) {
      paper.setup(this.canvas.current);
      const layer = this.newLayer({ name: '$$default' });
      this.newLayer({ name: '$$metadata' });
      layer.activate();
      this.update();
    }
    if (onMount) {
      onMount(paper);
    }
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    const { renderer } = this.props;
    renderer.reconciler.updateContainer(null, this.mountNode, this);
  }

  update = () => {
    const { paper, viewProps, renderer, children } = this.props;
    Object.assign(paper.view, getProps(paper, viewProps));
    renderer.reconciler.updateContainer(children, this.mountNode, this);
  };

  newLayer(options: {} = {}) {
    const { paper, renderer } = this.props;
    return paper.project
      .addLayer(renderer.createInstance(CONSTANTS.Layer, options, paper));
  }

  mountNode: any;

  canvas: React.Ref<'canvas'>;

  render() {
    const { className, canvasProps, paper } = this.props;
    return <canvas className={className} {...getProps(paper, canvasProps)} ref={this.canvas} />;
  }
}

// $FlowFixMe
export default React.forwardRef((props, ref) => <PaperContainer {...props} innerRef={ref} />);
