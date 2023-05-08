import { useFeatures } from '../../../hooks/useFeatures';
import { ProductList } from '../ProductList';

import * as styles from './FeatureSections.styles';

import type { FC } from 'react';

export const FeatureSections: FC = () => {
  const { features } = useFeatures();

  return (
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
  );
};

export const FeatureSectionsFallback: FC = () => {
  return <div className={styles.fallback()}></div>;
};
