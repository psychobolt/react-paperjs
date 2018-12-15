import { css } from 'styled-components';

export const SIZES = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
};

export const container = css`
  ${({ size }) => (size === 'large' ? css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  ` : '')}
`;

function getStrokeDashOffset(size) {
  switch (size) {
    case SIZES.Large: return 200;
    case SIZES.Medium: return 150;
    default: return 100;
  }
}

const Dash = size => css`
  @keyframes ${size}Dash {
    0% { stroke-dashoffset: ${getStrokeDashOffset(size)} }
    50% {
      stroke-dashoffset: 50;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 100;
      transform: rotate(450deg);
    }
  }
`;

export const path = css`
  ${({ size }) => Dash(size)}

  ${({ size }) => {
    switch (size) {
      case SIZES.Large:
        return css`
          stroke-dasharray: 200;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: largeDash 1.3s ease-in-out infinite;
        `;
      case SIZES.Medium:
        return css`
          stroke-dasharray: 150;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: mediumDash 1.3s ease-in-out infinite;
        `;
      case SIZES.Small:
        return css`
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: smallDash 1.3s ease-in-out infinite;
        `;
      default:
        return '';
    }
  }}
`;
