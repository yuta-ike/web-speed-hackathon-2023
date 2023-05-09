import { Icon } from '../../foundation/Icon';
import { OutlineButton } from '../../foundation/OutlineButton';
import { PrimaryAnchor } from '../../foundation/PrimaryAnchor';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { useUpdateCartItem } from '../../../hooks/useUpdateCartItems';
import { normalizeCartItemCount } from '../../../utils/normalize_cart_item';
import { useOpenModal } from '../../../store/modal';

import * as styles from './ProductPurchaseSection.styles';

import type { FC } from 'react';

type Props = {
  productId: number;
  amountInCart: number;
  isAuthUser: boolean;
};

export const ProductPurchaseSection: FC<Props> = ({ amountInCart, isAuthUser, productId }) => {
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = useOpenModal();

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({
      variables: { amount: normalizeCartItemCount(amount), productId },
    });
  };

  if (!isAuthUser) {
    return (
      <div className={styles.container()}>
        <div className={styles.signInWrapper()}>
          <span className={styles.signIn()}>購入にはログインが必要です</span>
          <PrimaryButton onClick={() => handleOpenModal('SIGN_IN')} size="sm">
            ログイン
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (amountInCart === 0) {
    return (
      <div className={styles.container()}>
        <PrimaryButton onClick={() => handleUpdateItem(productId, 1)} size="sm">
          カートに追加
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className={styles.container()}>
      <p className={styles.amount()}>
        <span className={styles.checkIcon()}>
          <Icon color="#3BA175" height={18} type="FaCheckCircle" width={18} />
        </span>
        <span>{amountInCart}個 カートに追加済み</span>
      </p>
      <div className={styles.actionButtonList()}>
        <PrimaryAnchor href="/order" size="base">
          購入手続きへ
        </PrimaryAnchor>
        <OutlineButton onClick={() => handleUpdateItem(productId, amountInCart + 1)} size="lg">
          カートに追加
        </OutlineButton>
      </div>
    </div>
  );
};

ProductPurchaseSection.displayName = 'ProductPurchaseSection';
