// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';

const { PaperContainer } = ReactPaperJS;

type Props = {
  mount?: boolean,
  children: React.Node,
  className: string,
};

type State = {
  mount?: boolean
}

export default class Mountable extends React.Component<Props, State> {
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
