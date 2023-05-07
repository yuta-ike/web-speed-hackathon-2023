import * as styles from './TextInput.styles';

import type { ComponentProps, FC } from 'react';

type Props = Omit<ComponentProps<'input'>, 'className'> & {
  label: string;
};

export const TextInput: FC<Props> = ({ label, ...rest }) => (
  <label className={styles.container()}>
    {label}
    <input className={styles.input()} {...rest} />
  </label>
);
