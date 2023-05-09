import { Helmet } from 'react-helmet-async';

import { Layout } from '../../components/application/Layout';

import * as styles from './Fallback.styles';

import type { FC } from 'react';

export const Fallback: FC = () => (
  <>
    <Helmet>
      <title>エラーが発生しました</title>
    </Helmet>
    <Layout>
      <div className={styles.container()}>
        <div className={styles.inner()}>
          <p className={styles.mainParagraph()}>エラーが発生しました</p>
          <p className={styles.subParagraph()}>Some error has occurred</p>
        </div>
      </div>
    </Layout>
  </>
);
