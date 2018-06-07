// @flow
import * as React from 'react';
import { typeof KeyEvent, typeof MouseEvent, typeof ToolEvent, typeof Event } from 'paper';

import PaperRenderer from './Paper.renderer';
import PaperProvider from './Paper.provider';
import { type Paper, CONSTANTS } from './Paper.types';

/* eslint-disable no-use-before-define */

type CanvasProps = {
  onWheel: (event: SyntheticWheelEvent<HTMLCanvasElement>) => any,
  style: {}
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

type ScopedProps<P> = (container: Canvas) => P;

type NestedProps<P> = P | ScopedProps<P>;

export function getProps<P>(container: Canvas, props: NestedProps<P>) {
  if (typeof props === 'function') {
    const scopedProps = (props: ScopedProps<P>);
    return scopedProps(container);
  }
  return props || {};
}

export type Props = {
  onMount: (container: {}) => void,
  canvasProps: NestedProps<CanvasProps>,
  viewProps: NestedProps<ViewProps>,
  paper: Paper,
  renderer: PaperRenderer,
  className: string,
  children: any,
};

/* eslint-enable no-use-before-define */

export class Canvas extends React.Component<Props> {
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
    if (this.canvas.current) {
      this.props.paper.setup(this.canvas.current);
      const layer = this.newLayer({ name: '$$default' });
      this.newLayer({ name: '$$metadata' });
      layer.activate();
      this.update();
    }
    this.props.onMount(this);
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.props.renderer.reconciler.updateContainer(null, this.mountNode, this);
  }

  update = () => {
    const { paper, viewProps, renderer, children } = this.props;
    Object.assign(paper.view, getProps(this, viewProps));
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
    const { className, canvasProps } = this.props;
    return <canvas className={className} {...getProps(this, canvasProps)} ref={this.canvas} />;
  }
}

// $FlowFixMe
export default React.forwardRef((props, ref) => <PaperProvider {...props} innerRef={ref} />);
