// @flow
import React from 'react';
import typeof { Group, Segment } from 'paper';

import { Tool } from '../../Paper.types';
import { PathTool } from '../shared/PathTool';

type Props = {
  pathProps: {
    strokeColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

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
    const { pathProps, onMouseDown, onPathAdd, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        ref={this.ref}
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            if (!ref.path) {
              const path = new this.context.paper.Path(pathProps);
              const points = new this.context.paper.Group();
              ref.path = path;
              ref.points = points;
            }
            const { path, points, selectedSegment } = ref;
            if (selectedSegment == null) {
              path.add(toolEvent.point);
              const segment = path.lastSegment;
              const point = new this.context.paper.Path.Circle({
                center: toolEvent.point,
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
