import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
  height: 40px;
  position: relative;
  width: 40px;
  background-color: #eaeaeb;
`;

export const playIcon = () => css`
  display: grid;
  height: 100%;
  inset: 0;
  place-items: center;
  position: absolute;
  width: 100%;
`;
