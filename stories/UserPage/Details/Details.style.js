import { css } from 'styled-components';

export const container = css`
  display: grid;
  grid-gap: 0.5rem;
  width: 20rem;
  padding: 1rem;
  background-color: var(--color-buttonBg);
  border: 1px solid var(--color-buttonBorder);
  border-radius: 1em;
`;

export const name = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-pageTextDark);
`;
