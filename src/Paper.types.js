// @flow
import paperCore from 'paper/dist/paper-core';

export type Paper = typeof paperCore.PaperScope;

export type PaperTypes = {
  [string]: (props: any, scope: Paper) => any
};

export const PaperScope = 'PaperScope';
export const Tool = 'Tool';
export const Layer = 'Layer';
export const Group = 'Group';
export const Line = 'Line';
export const Circle = 'Circle';
export const PointText = 'PointText';
export { default as Grid } from './components/Grid';

const TYPES: PaperTypes = {
  [PaperScope]: (props, paper) => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(props.canvas);
    return paperScope;
  },
  [Tool]: (props, paper) => new paper.Tool(props),
  [Layer]: (props, paper) => new paper.Layer(props),
  [Group]: (props, paper) => new paper.Group(props),
  [Line]: (props, paper) => new paper.Path.Line(props),
  [Circle]: (props, paper) => new paper.Path.Circle(props),
  [PointText]: (props, paper) => new paper.PointText(props),
};

export default TYPES;
