import classnames from 'classnames';

import * as styles from './OutlineButton.styles';

import type { ComponentProps, FC } from 'react';

type Size = 'base' | 'lg';
type Props = Omit<ComponentProps<'button'>, 'className'> & {
  size: Size;
};

export const OutlineButton: FC<Props> = ({ children, size, ...rest }) => {
  return (
    <button
      className={classnames(styles.container(), {
        [styles.container__base()]: size === 'base',
        [styles.container__lg()]: size === 'lg',
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
