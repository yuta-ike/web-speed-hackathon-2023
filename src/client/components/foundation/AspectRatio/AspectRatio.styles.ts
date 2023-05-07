import { css } from '@emotion/css';

export const container = ({ h, w }: { w: number; h: number }) => css`
  position: relative;
  width: 100%;
  aspect-ratio: ${w} / ${h};
`;
