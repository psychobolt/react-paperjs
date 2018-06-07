// @flow
import React from 'react';
import paper from 'paper';

import PaperRenderer from './Paper.renderer';
import { Canvas, type Props as ChildProps } from './Paper.container';
import { type Paper, CONSTANTS } from './Paper.types';
import { PaperScopeContext } from './hoc/PaperScope';

type Props = {
  renderer: typeof PaperRenderer,
  innerRef: Object
} & ChildProps;

export default class PaperProvider extends React.Component<Props> {
  static defaultProps = {
    renderer: PaperRenderer,
  }

  constructor(props: Props) {
    super(props);
    const Renderer = props.renderer;
    this.renderer = new Renderer();
    this.ctx = { paper: this.renderer.createInstance(CONSTANTS.PaperScope, {}, paper) };
  }

  ctx: {
    paper: Paper
  };
  renderer: PaperRenderer;

  render() {
    const { innerRef, children, ...rest } = this.props;
    return (
      <Canvas
        {...rest}
        ref={this.props.innerRef}
        renderer={this.renderer}
        paper={this.ctx.paper}
      >
        <PaperScopeContext.Provider value={this.ctx}>
          {this.props.children}
        </PaperScopeContext.Provider>
      </Canvas>
    );
  }
}
