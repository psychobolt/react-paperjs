// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';

const { PaperContainer } = ReactPaperJS;

type DefaultProps = {
  mount?: boolean
};

type Props = {
  mount?: boolean,
  children: React.Node,
  className: string,
};

type State = DefaultProps;

export default class Mountable extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    mount: true,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      mount: props.mount,
    };
  }

  onClick: SyntheticMouseEvent<'div'> => void = () => this.setState(state => ({ mount: !state.mount }));

  render(): React.Node {
    const { className, mount, children, ...props } = this.props;
    const { mount: mounted } = this.state;
    return (
      <div className={className}>
        <div>
          <button type="button" onClick={this.onClick}>Attach/Detach</button>
        </div>
        <PaperContainer {...props}>
          {mounted ? children : null}
        </PaperContainer>
      </div>
    );
  }
}
