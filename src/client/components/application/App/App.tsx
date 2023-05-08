import { lazy } from 'react';

import { Providers } from '../Providers';
import { Routes } from '../Routes';

import type { FC } from 'react';

const SignInModal = lazy(() => import('../../modal/SignInModal').then((res) => ({ default: res.SignInModal })));
const SignUpModal = lazy(() => import('../../modal/SignUpModal').then((res) => ({ default: res.SignUpModal })));

export const App: FC = () => (
  <Providers>
    <Routes />
    <SignInModal />
    <SignUpModal />
  </Providers>
);
