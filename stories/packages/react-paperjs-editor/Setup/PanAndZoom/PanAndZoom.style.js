import { css } from 'styled-components';

export const container = css`
  &[drag-state='enabled'] {
    cursor: grab;
  }

  &[drag-state='dragging'] {
    cursor: grabbing;
  }
`;
