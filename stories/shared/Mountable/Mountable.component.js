// @flow
import * as React from 'react';
import styled from 'styled-components';

import { PaperContainer } from 'src';

type Props = {
  mount?: boolean,
  children: React.ReactNode,
  className: string,
};

type State = {
  mount?: boolean
}

class Mountable extends React.Component<Props, State> {
  static defaultProps = {
    mount: true,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      mount: props.mount,
    };
  }

  onClick = () => this.setState(state => ({ mount: !state.mount }));

  render() {
    const { className, mount, children, ...props } = this.props;
    const { mount: mounted } = this.state;
    return (
      <div className={className}>
        <div>
          <button type="button" onClick={this.onClick}>
            {'Attach/Detach'}
          </button>
        </div>
        <PaperContainer {...props}>
          {mounted ? children : null}
        </PaperContainer>
      </div>
    );
  }
}

export default styled(Mountable)`
  /* empty */
`;
