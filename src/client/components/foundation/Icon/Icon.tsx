import classNames from 'classnames';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

import * as styles from './Icon.styles';

import type { FC } from 'react';

type Props = {
  type: 'FaArrowLeft' | 'FaArrowRight' | 'FaShoppingCart' | 'FaUser' | 'FaPlay' | 'FaCheckCircle';
  width: number;
  height: number;
  color: string;
};

const ICONS = {
  FaArrowLeft: <FaArrowLeft />,
  FaArrowRight: <FaArrowRight />,
  FaCheckCircle: <FaCheckCircle />,
  FaPlay: <FaPlay />,
  FaShoppingCart: <FaShoppingCart />,
  FaUser: <FaUser />,
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  return <span className={classNames(type, styles.container({ color, height, width }))}>{ICONS[type]}</span>;
};
