// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import typeof { Layer as LayerType } from 'paper';

const { Layer, Group, Line } = ReactPaperJS;

type Props = {
  top: number,
  left: number,
  right: number,
  bottom: number,
  width: number,
  height: number,
  cellSize: number,
  strokeColor: string,
  strokeWidth: number,
  innerRef: React.Ref<LayerType>
};

const Grid = ({ width, height, top = 0, left = 0, right = left + width, bottom = top + height, cellSize = 50, strokeColor = '#D0D0D0', strokeWidth = 1, innerRef }: Props) => {
  const x = Math.ceil(left / cellSize) * cellSize;
  const y = Math.ceil(top / cellSize) * cellSize;
  const cols = Math.ceil((right - left) / cellSize);
  const rows = Math.ceil((bottom - top) / cellSize);
  const verticalLines = [];
  const horizontalLines = [];
  for (let i = 0; i <= cols; i += 1) {
    const position = x + (i * cellSize);
    verticalLines.push(<Line
      key={i}
      from={[position, top]}
      to={[position, bottom]}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
    />);
  }
  for (let i = 0; i <= rows; i += 1) {
    const position = y + (i * cellSize);
    horizontalLines.push(<Line
      key={i}
      from={[left, position]}
      to={[right, position]}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
    />);
  }
  return (
    <Layer ref={innerRef}>
      <Group>
        {verticalLines}
      </Group>
      <Group>
        {horizontalLines}
      </Group>
    </Layer>
  );
};

export default React
  .forwardRef<Props, LayerType>((props, ref) => <Grid innerRef={ref} {...props} />);
