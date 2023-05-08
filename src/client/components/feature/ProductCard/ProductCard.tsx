import * as currencyFormatter from 'currency-formatter';

import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { Anchor } from '../../foundation/Anchor';
import { Image } from '../../foundation/Image';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './ProductCard.styles';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  product: ProductFragmentResponse;
  isInFirstView: boolean;
};

export const ProductCard: FC<Props> = ({ isInFirstView, product }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const { activeOffer } = useActiveOffer(product);
  const price = activeOffer?.price ?? product.price;

  return (
    <Anchor href={`/product/${product.id}`}>
      <div className={styles.inner()}>
        {thumbnailFile ? (
          <div className={styles.image()}>
            <Image
              decoding="async"
              height={126}
              loading={isInFirstView ? undefined : 'lazy'}
              src={thumbnailFile.filename.replace('.webp', '_mid.webp')}
              width={224}
            />
          </div>
        ) : null}
        <div className={styles.description()}>
          <p className={styles.itemName()}>{product.name}</p>
          <span className={styles.itemPrice()}>{currencyFormatter.format(price, { code: 'JPY', precision: 0 })}</span>
        </div>
        {activeOffer !== undefined && (
          <div className={styles.label()}>
            <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
          </div>
        )}
      </div>
    </Anchor>
  );
};
