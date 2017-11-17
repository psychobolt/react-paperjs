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

type ChildProps = {} | (container: {}) => {};

function getProps(props: ChildProps) {
  return (typeof props === 'function') ? props(this) : props;
}

type Props = {
  onMount?: (container: {}) => void,
  canvasProps: ChildProps,
  viewProps: ChildProps,
  renderer: typeof PaperRenderer,
  children: any,
};

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
        Object.assign(this.paper.view, getProps.call(this, viewProps));
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
    return <canvas {...getProps.call(this, canvasProps)} ref={ref => { this.canvas = ref; }} />;
  }
}
