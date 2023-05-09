import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
  aspect-ratio: 16 / 9;
  width: 100%;
  position: relative;
  background-color: #eaeaea;
`;

export const video = () => css`
  height: auto;
  object-fit: cover;
  width: 100%;
`;
