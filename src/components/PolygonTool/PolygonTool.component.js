// @flow
import React from 'react';
import typeof { Group, Segment } from 'paper';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    strokeColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class PolygonTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
      selected: true,
    },
  };

  points: Group;
  selectedSegment: Segment;

  render() {
    const {
      pathProps, onMouseDown, onPathAdd, onSegmentAdd, onSegmentRemove, paper, instanceRef, ...rest
    } = this.props;
    const { Path, Group, project } = paper;
    const ref = this;
    return (
      <Tool
        ref={instanceRef}
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            if (!ref.path) {
              const path = new Path(pathProps);
              const points = new Group();
              project.layers[0].addChild(points);
              ref.path = path;
              ref.points = points;
            }
            const { path, points, selectedSegment } = ref;
            if (selectedSegment == null) {
              path.add(toolEvent.point);
              const segment = path.lastSegment;
              const bounds = new Path.Circle({
                center: toolEvent.point,
                radius: 7,
                fillColor: 'white',
                opacity: 0,
              });
              bounds.on('mousedown', () => {
                if (!path.closed && path.contains(bounds.position)) {
                  ref.selectedSegment = segment;
                }
              });
              points.addChild(bounds);
              onSegmentAdd(segment, bounds);
            } else {
              const { index } = selectedSegment;
              const segments = path.removeSegments(0, index);
              const bounds = points.removeChildren(0, index);
              if (segments.length) {
                onSegmentRemove(segments, bounds);
              }
              path.closed = true;
              path.selected = false;
              onPathAdd(path);
              ref.path = null;
              ref.points = null;
              ref.selectedSegment = null;
            }
          }
          onMouseDown(toolEvent);
        }}
        {...rest}
      />
    );
  }
}
