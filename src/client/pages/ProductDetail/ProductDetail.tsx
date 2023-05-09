import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductMediaListPreviewer } from '../../components/product/ProductMediaListPreviewer';
import { ProductOverview } from '../../components/product/ProductOverview';
import { ProductPurchaseSection } from '../../components/product/ProductPurchaseSeciton';
import { ReviewSection } from '../../components/review/ReviewSection';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useProduct } from '../../hooks/useProduct';

import * as styles from './ProductDetail.styles';

import type { FC } from 'react';

export const ProductDetail: FC = () => {
  const { productId } = useParams();
  const { product } = useProduct(Number(productId));
  const { authUser, isAuthUser } = useAuthUser();

  const amountInCart = useMemo(() => {
    const order = authUser?.orders.find((order) => order.isOrdered === false);
    const shoppingCartItems = order?.items ?? [];
    return shoppingCartItems.find((item) => item.product.id === Number(productId))?.amount ?? 0;
  }, [authUser?.orders, productId]);

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      )}
      <WidthRestriction>
        <div className={styles.container()}>
          <section className={styles.details()}>
            <ProductMediaListPreviewer product={product} />
            <div className={styles.overview()}>
              <ProductOverview product={product} />
            </div>
            <div className={styles.purchase()}>
              <ProductPurchaseSection
                amountInCart={amountInCart}
                isAuthUser={isAuthUser}
                productId={Number(productId)}
              />
            </div>
          </section>

          <section className={styles.reviews()}>
            <h2 className={styles.reviewsHeading()}>レビュー</h2>
            <ReviewSection hasSignedIn={isAuthUser} productId={Number(productId)} />
          </section>
        </div>
      </WidthRestriction>
    </>
  );
};
