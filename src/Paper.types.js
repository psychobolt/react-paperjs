// @flow
import * as React from 'react';
import Paper from 'paper';

export type Types = {
  [type: string]: (props: {}, paper: typeof Paper.PaperScope, children?: Node) => Object
};

export type Components = {
  [key: string]: React.AbstractComponent<any>
};

const PAPER = {
  Tool: 'Tool',
  Layer: 'Layer',
  Group: 'Group',
  Path: 'Path',
  Line: 'Line',
  Raster: 'Raster',
  Rectangle: 'Rectangle',
  Circle: 'Circle',
  PointText: 'PointText',
};

export const CONSTANTS = {
  PaperScope: 'PaperScope',
  ...PAPER,
};

const TYPES: Types = {
  [CONSTANTS.PaperScope]: (props, paper) => new paper.PaperScope(),
  [CONSTANTS.Tool]: (props, paper) => new paper.Tool(props),
  [CONSTANTS.Layer]: (props, paper) => new paper.Layer(props),
  [CONSTANTS.Group]: (props, paper) => new paper.Group(props),
  [CONSTANTS.Path]: (props, paper) => new paper.Path(props),
  [CONSTANTS.Raster]: (props, paper) => new paper.Raster(props),
  [CONSTANTS.Line]: (props, paper) => new paper.Path.Line(props),
  [CONSTANTS.Rectangle]: (props, paper) => new paper.Path.Rectangle(props),
  [CONSTANTS.Circle]: (props, paper) => new paper.Path.Circle(props),
  [CONSTANTS.PointText]: (props, paper, children) => new paper.PointText({
    ...props,
    content: children,
  }),
};

export default TYPES;

export const components: Components = Object.entries(PAPER).reduce(
  (types: Components, [key, Type]) => ({
    ...types,
    // $FlowFixMe
    [key]: React.forwardRef((props, ref) => <Type ref={ref} {...props} />),
  }),
  {},
);

export const {
  Tool,
  Layer,
  Group,
  Path,
  Line,
  Raster,
  Rectangle,
  Circle,
  PointText,
} = components;
