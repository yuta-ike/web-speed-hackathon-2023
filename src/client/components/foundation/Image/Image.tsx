import classNames from 'classnames';

import * as styles from './Image.styles';

import type { ComponentProps, FC } from 'react';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
};

export const Image: FC<Props> = ({ fill, ...rest }) => {
  return (
    <img
      className={classNames(styles.container(), {
        [styles.container__fill()]: fill === true,
      })}
      loading="eager"
      {...rest}
    />
  );
};
