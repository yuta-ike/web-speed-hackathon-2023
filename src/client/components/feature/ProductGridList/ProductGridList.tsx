import { ProductCard } from '../ProductCard';

import * as styles from './ProductGridList.styles';

import type { FC } from 'react';
import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
  isInFirstView: boolean;
};

export const ProductGridList: FC<Props> = ({ featureSection, isInFirstView }) => {
  const products = featureSection.items.map((item) => item.product);

  return (
    <ul className={styles.cardList()}>
      {products.map((product) => {
        return (
          <li key={product.id} className={styles.cardListItem()}>
            <ProductCard isInFirstView={isInFirstView} product={product} />
          </li>
        );
      })}
    </ul>
  );
};
