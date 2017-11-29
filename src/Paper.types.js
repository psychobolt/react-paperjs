// @flow
import type { Node } from 'react';
import paperCore from 'paper';

import withScopedProps from './hoc/ScopedProps';

export type Paper = typeof paperCore.PaperScope;

export type PaperTypes = {
  [string]: (props: any, scope: Paper, children: Node) => any
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

export default {
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

export const {
  Tool,
  Layer,
  Group,
  Path,
  Line,
  Rectangle,
  Circle,
  PointText,
} = Object.entries(PAPER).reduce((types, [key, type]) =>
  ({ ...types, [key]: withScopedProps(type) }), {});

export * from './components';
