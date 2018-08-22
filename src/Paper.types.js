// @flow
import * as React from 'react';
import paperCore from 'paper';

export type Paper = {
  PaperScope: typeof paperCore.PaperScope,
  Tool: typeof paperCore.Tool,
  Layer: typeof paperCore.Layer,
  Group: typeof paperCore.Group,
  Path: typeof paperCore.Path,
  PointText: typeof paperCore.PointText,
  container: Object,
  project: Object,
  view: Object,
  setup: (canvas: mixed) => void
};

export type Types = {
  [type: string]: (props: {}, paper: Paper, children?: Node) => Object
};

export type Components = {
  [key: string]: React.ComponentType<any>
};

const PAPER = {
  Tool: 'Tool',
  Layer: 'Layer',
  Group: 'Group',
  Path: 'Path',
  Line: 'Line',
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
  [CONSTANTS.Line]: (props, paper) => new paper.Path.Line(props),
  [CONSTANTS.Rectangle]: (props, paper) => new paper.Path.Rectangle(props),
  [CONSTANTS.Circle]: (props, paper) => new paper.Path.Circle(props),
  [CONSTANTS.PointText]: (props, paper, children) => new paper.PointText({
    ...props,
    content: children,
  }),
};

export default TYPES;

const components: Components = Object.entries(PAPER).reduce((types, [key, Type]) => ({
  ...types,
  // $FlowFixMe
  [key]: React.forwardRef((props, ref) => <Type ref={ref} {...props} />),
}), {});

export const {
  Tool,
  Layer,
  Group,
  Path,
  Line,
  Rectangle,
  Circle,
  PointText,
} = components;
