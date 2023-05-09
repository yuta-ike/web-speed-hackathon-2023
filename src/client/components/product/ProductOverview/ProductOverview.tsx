import * as currencyFormatter from 'currency-formatter';
import { Temporal } from '@js-temporal/polyfill';
import classNames from 'classnames';

import { ProductOfferLabel } from '../ProductOfferLabel';
import { useActiveOffer } from '../../../hooks/useActiveOffer';

import * as styles from './ProductOverview.styles';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  product: ProductFragmentResponse | undefined;
};

export const ProductOverview: FC<Props> = ({ product }) => {
  const { activeOffer } = useActiveOffer(product);

  const renderActiveOffer = () => {
    if (activeOffer === undefined) {
      return;
    }

    const endTime = Temporal.Instant.from(activeOffer.endDate).toLocaleString('ja-jp', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      second: '2-digit',
      year: 'numeric',
    });

    return (
      <div className={styles.offerLabel()}>
        <ProductOfferLabel size="lg">
          <time>{endTime}</time> までタイムセール
        </ProductOfferLabel>
      </div>
    );
  };

  return (
    <div className={styles.container()}>
      {renderActiveOffer()}
      <p
        className={classNames(styles.productName(), {
          [styles.productNameFallback()]: product == null,
        })}
      >
        {product?.name ?? ''}
      </p>
      <p
        className={classNames(styles.productDescription(), {
          [styles.productDescriptionFallback()]: product == null,
        })}
      >
        {product?.description ?? ''}
      </p>

      <div className={styles.priceWrapper()}>
        {activeOffer !== undefined && product != null ? (
          <span className={styles.priceWithoutOffer()}>
            {currencyFormatter.format(product.price, { code: 'JPY', precision: 0 })}
          </span>
        ) : null}
        <span className={styles.price()}>
          {currencyFormatter.format(activeOffer?.price ?? product?.price ?? 0, { code: 'JPY', precision: 0 })}
        </span>
      </div>
    </div>
  );
};

ProductOverview.displayName = 'ProductOverview';
