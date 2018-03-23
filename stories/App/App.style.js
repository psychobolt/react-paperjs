import { css, keyframes } from 'styled-components';

const appLogoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const logo = css`
  animation: ${appLogoSpin} infinite 20s linear;
  height: 80px;
`;

export const header = css`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

export const h1 = css`
  font-size: 1.5em;
`;

export const app = css`
  text-align: center;
`;
