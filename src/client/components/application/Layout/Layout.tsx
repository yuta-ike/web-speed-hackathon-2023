import { Outlet } from 'react-router-dom';

import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';

import * as styles from './Layout.styles';

import type { FC } from 'react';

export const Layout: FC = () => (
  <>
    <Header />
    <main className={styles.container()}>
      <Outlet />
    </main>
    <Footer />
  </>
);
