// @flow
import React from 'react';
import paper from 'paper';

import PaperRenderer from './Paper.renderer';
import { Canvas, type Props as ChildProps } from './Paper.container';
import { type Paper, CONSTANTS } from './Paper.types';
import { PaperScopeContext } from './hoc/PaperScope';

type Props = {
  renderer: typeof PaperRenderer,
  innerRef: Object,
  mergeProps: () => any,
} & ChildProps;

type State = {
  paper: Paper,
};

export default class PaperProvider extends React.Component<ChildProps & Props, State> {
  static defaultProps = {
    renderer: PaperRenderer,
  }

  constructor(props: Props) {
    super(props);
    const Renderer = props.renderer;
    this.renderer = new Renderer();
    this.state = {
      paper: this.renderer.createInstance(CONSTANTS.PaperScope, {}, paper),
      mergeProps: props.mergeProps || (mergeProps => this.setState(mergeProps(this.state, props))),
    };
  }

  renderer: PaperRenderer;

  render() {
    const { innerRef, children, ...rest } = this.props;
    return (
      <Canvas
        {...rest}
        {...this.state}
        ref={innerRef}
        renderer={this.renderer}
      >
        <PaperScopeContext.Provider value={this.state}>{children}</PaperScopeContext.Provider>
      </Canvas>
    );
  }
}
