import { lazy } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { Layout } from '../Layout';

import { useScrollToTop } from './hooks';

import type { FC } from 'react';

const Top = lazy(() => import('../../../pages/Top').then((res) => ({ default: res.Top })));
const ProductDetail = lazy(() =>
  import('../../../pages/ProductDetail').then((res) => ({ default: res.ProductDetail })),
);
const Order = lazy(() => import('../../../pages/Order').then((res) => ({ default: res.Order })));
const OrderComplete = lazy(() =>
  import('../../../pages/OrderComplete').then((res) => ({ default: res.OrderComplete })),
);
const NotFound = lazy(() => import('../../../pages/NotFound').then((res) => ({ default: res.NotFound })));

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route element={<Top />} path="/" />
        <Route element={<ProductDetail />} path="/product/:productId" />
        <Route element={<Order />} path="/order" />
        <Route element={<OrderComplete />} path="/order/complete" />
        <Route element={<NotFound />} path="*" />
      </Route>
    </RouterRoutes>
  );
};
