import { Outlet } from 'react-router-dom';

import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';

import * as styles from './Layout.styles';

import type { FC } from 'react';

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className={styles.container()}>{children ?? <Outlet />}</main>
    <Footer />
  </>
);
