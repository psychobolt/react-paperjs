// @flow
import * as React from 'react';
import Paper from 'paper';

import PaperRenderer from './Paper.renderer';
import PaperProvider, { type Props as ProviderProps } from './Paper.provider'; // eslint-disable-line no-unused-vars
import { CONSTANTS } from './Paper.types';

type PaperScope = typeof Paper.PaperScope;

type Props = {
  paper: PaperScope,
  renderer: PaperRenderer,
  canvasProps: {},
  viewProps: {},
  onMount?: PaperScope => void,
  className: string,
} & ProviderProps;

// $FlowFixMe
@PaperProvider
class PaperContainer extends React.Component<Props> {
  static defaultProps = {
    onMount: () => {},
  };

  mountNode: any;

  canvas: { current: null | HTMLCanvasElement };

  constructor(props: Props) {
    super(props);
    const { renderer, paper } = this.props;
    this.mountNode = renderer.reconciler.createContainer(paper);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const { paper, onMount } = this.props;
    if (this.canvas.current) {
      paper.setup(this.canvas.current);
      const layer = this.newLayer({ name: '$$default' });
      this.newLayer({ name: '$$metadata' });
      layer.activate();
      this.update();
    }
    if (onMount) {
      onMount(paper);
    }
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    const { renderer } = this.props;
    renderer.reconciler.updateContainer(null, this.mountNode, this);
  }

  update = () => {
    const { paper, viewProps, renderer, children } = this.props;
    Object.assign(paper.view, viewProps);
    renderer.reconciler.updateContainer(children, this.mountNode, this);
  };

  newLayer(options = {}) {
    const { paper, renderer } = this.props;
    return paper.project
      .addLayer(renderer.createInstance(CONSTANTS.Layer, options, paper));
  }

  render() {
    const { className, canvasProps } = this.props;
    return <canvas {...canvasProps} className={className} ref={this.canvas} />;
  }
}

export default (React.forwardRef(
  (props: any, ref) => <PaperContainer {...props} innerRef={ref} />,
): React.AbstractComponent<Props | {}>);
