// @flow
import * as React from 'react';
import paper from 'paper';

import PaperRenderer from './Paper.renderer';
import { type Paper, CONSTANTS } from './Paper.types';
import { PaperScopeContext } from './hoc/PaperScope';

type Props = {
  renderer: typeof PaperRenderer,
  innerRef: Object,
  mergeProps: () => any,
  children: React.Node
};

type State = {
  paper: Paper,
};

export default (Container: React.ComponentType<any>) => class PaperProvider
  extends React.Component<Props, State> {
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
    const { innerRef, children, ...rest } = this.props;
    return (
      <Container
        {...rest}
        {...this.state}
        ref={innerRef}
        renderer={this.renderer}
      >
        <PaperScopeContext.Provider value={this.state}>
          {children}
        </PaperScopeContext.Provider>
      </Container>
    );
  }
};
