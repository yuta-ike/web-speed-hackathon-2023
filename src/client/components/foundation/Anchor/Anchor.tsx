import { Link } from 'react-router-dom';

import * as styles from './Anchor.styles';

import type { ComponentPropsWithoutRef, FC } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'> & { href: string };

export const Anchor: FC<Props> = ({ children, href, ...rest }) => (
  <Link className={styles.container()} to={href} {...rest}>
    {children}
  </Link>
);
