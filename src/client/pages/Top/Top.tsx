import { Helmet } from 'react-helmet';

import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

import type { FC } from 'react';

export const Top: FC = () => {
  const { recommendation } = useRecommendation();
  const { features } = useFeatures();

  if (recommendation === undefined || features === undefined) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <div>
        <ProductHeroImage product={recommendation.product} title="今週のオススメ" />

        <div className={styles.featureList()}>
          {features.map((featureSection, i) => {
            return (
              <div key={featureSection.id} className={styles.feature()}>
                <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                <ProductList featureSection={featureSection} isInFirstView={i <= 1} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
