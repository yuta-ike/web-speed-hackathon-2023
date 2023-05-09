import { ApolloProvider, SuspenseCache } from '@apollo/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Fallback } from '../../../pages/Fallback';
import { apolloClient } from '../../../utils//apollo_client';

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const suspenseCache = new SuspenseCache();

export const Providers: FC<Props> = ({ children }) => (
  <HelmetProvider>
    <ApolloProvider client={apolloClient} suspenseCache={suspenseCache}>
      <BrowserRouter>
        <ErrorBoundary fallbackRender={Fallback}>
          <Suspense fallback={null}>{children}</Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ApolloProvider>
  </HelmetProvider>
);
