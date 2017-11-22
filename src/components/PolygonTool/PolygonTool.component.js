// @flow
import React from 'react';
import { typeof Path, typeof Group, typeof Segment, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';

type Props = {
  pathProps: {
    strokeColor: string,
  },
  onMouseDown: MouseEventHandler
};

// $FlowFixMe
@ScopedProps
export default class PolygonTool extends React.PureComponent<Props> {
  static defaultProps = {
    pathProps: {
      strokeColor: 'black',
      selected: true,
    },
    onMouseDown: () => {},
  };

  static contextTypes = {
    paper: PropTypes.instanceOf(PaperScope).isRequired,
  };

  path: Path;
  points: Group;
  selectedSegment: Segment;

  render() {
    const { pathProps, onMouseDown, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        onMouseDown={event => {
          if (!ref.path) {
            const path = new this.context.paper.Path(pathProps);
            const points = new this.context.paper.Group();
            ref.path = path;
            ref.points = points;
          }
          const { path, points, selectedSegment } = ref;
          if (selectedSegment == null) {
            path.add(event.point);
            const segment = path.lastSegment;
            const point = new this.context.paper.Path.Circle({
              center: event.point,
              radius: 7,
              fillColor: 'white',
              opacity: 0,
            });
            point.on('mousedown', () => {
              if (!path.closed && path.contains(point.position)) {
                ref.selectedSegment = segment;
              }
            });
            points.addChild(point);
          } else {
            const { index } = selectedSegment;
            path.removeSegments(0, index);
            points.remove();
            path.closed = true;
            path.selected = false;
            ref.path = null;
            ref.points = null;
            ref.selectedSegment = null;
          }
          onMouseDown(event);
        }}
        {...rest}
      />
    );
  }
}
