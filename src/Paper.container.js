// @flow
import React from 'react';
import paper, { typeof KeyEvent, typeof MouseEvent, typeof ToolEvent, typeof Event } from 'paper';
import PropTypes from 'prop-types';

import PaperRenderer from './Paper.renderer';
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

type ScopedProps<P> = (container: PaperContainer) => P;

type NestedProps<P> = P | ScopedProps<P>;

export function getProps<P>(container: PaperContainer, props: NestedProps<P>) {
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
  renderer: typeof PaperRenderer,
  className: string,
  children: any,
};

/* eslint-enable no-use-before-define */

export default class PaperContainer extends React.Component<Props> {
  static defaultProps = {
    renderer: PaperRenderer,
    onMount: () => {},
  };

  static childContextTypes = {
    paper: PropTypes.object,
  };

  constructor(props: Props) {
    super(props);
    const Renderer = this.props.renderer;
    const renderer = new Renderer();
    this.paper = renderer.createInstance(CONSTANTS.PaperScope, {}, paper);
    const { reconciler } = renderer;
    const node = reconciler.createContainer(this.paper);
    const newLayer = (options = {}) =>
      this.paper.project.addLayer(renderer.createInstance(CONSTANTS.Layer, options, this.paper));
    this.mount = () => {
      const layer = newLayer({ name: '$$default' });
      newLayer({ name: '$$metadata' });
      layer.activate();
    };
    this.update = () => {
      const { viewProps, children } = this.props;
      Object.assign(this.paper.view, getProps(this, viewProps));
      reconciler.updateContainer(children, node, this);
    };
    this.unmount = () => {
      reconciler.updateContainer(null, node, this);
    };
  }

  getChildContext() {
    return { paper: this.paper };
  }

  componentDidMount() {
    if (this.canvas) {
      this.paper.setup(this.canvas);
      this.mount();
      this.update();
    }
    this.props.onMount(this);
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.unmount();
  }

  update: () => void
  mount: () => void
  unmount: () => void

  canvas: ?HTMLCanvasElement;
  paper: Paper;

  render() {
    const { className, canvasProps } = this.props;
    return (
      <canvas
        className={className}
        {...getProps(this, canvasProps)}
        ref={ref => { this.canvas = ref; }}
      />
    );
  }
}
