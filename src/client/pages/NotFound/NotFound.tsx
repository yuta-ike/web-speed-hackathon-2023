import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import { loadFonts } from '../../utils/load_fonts';

import * as styles from './NotFound.styles';

import type { FC } from 'react';

export const NotFound: FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await loadFonts();
      setIsReady(true);
    };

    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>ページが見つかりませんでした</title>
      </Helmet>
      <div className={styles.container()}>
        <div className={styles.inner()}>
          <p
            className={classNames(styles.mainParagraph(), {
              [styles.mainParagraphFallback()]: !isReady,
            })}
          >
            {isReady ? 'ページが存在しません' : ''}
          </p>
          <p
            className={classNames(styles.subParagraph(), {
              [styles.subParagraphFallback()]: !isReady,
            })}
          >
            {isReady ? 'Not Found' : ''}
          </p>
        </div>
      </div>
    </>
  );
};
