// @flow
import * as React from 'react';

import PaperRenderer from './Paper.renderer';
import PaperProvider, { type Props as ProviderProps } from './Paper.provider'; // eslint-disable-line no-unused-vars
import { type Paper, CONSTANTS } from './Paper.types';

/* eslint-disable no-use-before-define */

type Props = {
  paper: Paper,
  renderer: PaperRenderer,
  canvasProps: {},
  viewProps: {},
  onMount?: (paper: Paper) => void,
  className: string,
} & ProviderProps;

/* eslint-enable no-use-before-define */

// $FlowFixMe
@PaperProvider
class PaperContainer extends React.Component<Props> {
  static defaultProps = {
    onMount: () => {},
  };

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

  newLayer(options: {} = {}) {
    const { paper, renderer } = this.props;
    return paper.project
      .addLayer(renderer.createInstance(CONSTANTS.Layer, options, paper));
  }

  mountNode: any;

  canvas: React.Ref<'canvas'>;

  render() {
    const { className, canvasProps } = this.props;
    return <canvas className={className} {...canvasProps} ref={this.canvas} />;
  }
}

// $FlowFixMe
export default React.forwardRef((props, ref) => <PaperContainer {...props} innerRef={ref} />);
