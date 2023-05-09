import * as currencyFormatter from 'currency-formatter';

import { useTotalPrice } from '../../../hooks/useTotalPrice';
import { CartItem } from '../CartItem';

import * as styles from './OrderPreview.styles';

import type { ShoppingCartItemFragmentResponse } from '../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  orderItems: ShoppingCartItemFragmentResponse[];
  onUpdateCartItem: (productId: number, amount: number) => void;
  onRemoveCartItem: (productId: number) => void;
};

export const OrderPreview: FC<Props> = ({ onRemoveCartItem, onUpdateCartItem, orderItems }) => {
  const { totalPrice } = useTotalPrice(orderItems);

  return (
    <div className={styles.container()}>
      <ul className={styles.itemList()}>
        {orderItems.map((item) => {
          return (
            <li key={item.product.id}>
              <CartItem item={item} onRemove={onRemoveCartItem} onUpdate={onUpdateCartItem} />
            </li>
          );
        })}
      </ul>
      <p className={styles.totalPrice()}>{currencyFormatter.format(totalPrice, { code: 'JPY', precision: 0 })}</p>
    </div>
  );
};

OrderPreview.displayName = 'OrderPreview';
