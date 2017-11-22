// @flow
import type { Node } from 'react';
import paperCore from 'paper';

import withScopedProps from './HOC/ScopedProps';

export type Paper = typeof paperCore.PaperScope;

export type PaperTypes = {
  [string]: (props: any, scope: Paper, children: Node) => any
};

export const PaperScope = 'PaperScope';

const PAPER = {
  Tool: 'Tool',
  Layer: 'Layer',
  Group: 'Group',
  Line: 'Line',
  Circle: 'Circle',
  PointText: 'PointText',
};

const TYPES: PaperTypes = {
  [PaperScope]: (props, paper) => new paper.PaperScope(),
  [PAPER.Tool]: (props, paper) => new paper.Tool(props),
  [PAPER.Layer]: (props, paper) => new paper.Layer(props),
  [PAPER.Group]: (props, paper) => new paper.Group(props),
  [PAPER.Line]: (props, paper) => new paper.Path.Line(props),
  [PAPER.Circle]: (props, paper) => new paper.Path.Circle(props),
  [PAPER.PointText]: (props, paper, children) => new paper.PointText({
    ...props,
    content: children,
  }),
};

export default TYPES;
export const {
  Tool,
  Layer,
  Group,
  Line,
  Circle,
  PointText,
} = Object.entries(PAPER).reduce((types, [key, type]) =>
  ({ ...types, [key]: withScopedProps(type) }), {});
export * from './components';
