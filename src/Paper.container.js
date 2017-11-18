// @flow
import React, { type Node } from 'react';
import paper from 'paper/dist/paper-core';

import PaperRenderer from './Paper.renderer';
import { type Paper, PaperScope } from './Paper.types';

function getScopedProps(components: Node) {
  const thisArg = this;
  return (components ? React.Children.map(components, component => {
    const { props } = component;
    if (props) {
      const { scopedProps, children, ...rest } = props;
      const nodes = getScopedProps.call(this, children);
      return React.cloneElement(component, {
        ...rest,
        ...((scopedProps && scopedProps.call(thisArg, thisArg)) || {}),
        children: nodes,
      });
    }
    return component;
  }) : null);
}

/* eslint-disable no-use-before-define */

type CanvasProps = {
  onWheel: (event: SyntheticWheelEvent<HTMLCanvasElement>) => any,
  style: {}
};

export type EventHandler = (event: {}) => any;

type ViewProps = {
  onKeyDown: EventHandler,
  onKeyUp: EventHandler,
  onMouseDown: EventHandler,
  onMouseDrag: EventHandler,
  onMouseUp: EventHandler,
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
  children: any,
};

/* eslint-enable no-use-before-define */

export default class PaperContainer extends React.Component<Props> {
  static defaultProps = {
    renderer: PaperRenderer,
  };

  componentWillMount() {
    const { onMount } = this.props;
    this.onmount = () => {
      if (onMount) {
        onMount(this);
      }
    };
  }

  componentDidMount() {
    if (this.canvas) {
      const Renderer = this.props.renderer;
      const renderer = new Renderer();
      this.paper = renderer.createInstance(PaperScope, { canvas: this.canvas }, paper);
      const { reconciler } = renderer;
      const node = reconciler.createContainer(this.paper);
      this.update = () => {
        const { viewProps, children } = this.props;
        Object.assign(this.paper.view, getProps(this, viewProps));
        reconciler.updateContainer(getScopedProps.call(this, children), node);
      };
      this.unmount = () => {
        reconciler.updateContainer(null, node);
      };
      this.update();
    }
    this.onmount();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.unmount();
  }

  onmount = () => {};
  unmount = () => {};
  update = () => {};

  canvas: ?HTMLCanvasElement;
  paper: Paper;

  render() {
    const { canvasProps } = this.props;
    return <canvas {...getProps(this, canvasProps)} ref={ref => { this.canvas = ref; }} />;
  }
}
