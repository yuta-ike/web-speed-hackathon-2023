import { useMemo } from 'react';

import { getActiveOffer } from '../utils/get_active_offer';

import type { ShoppingCartItemFragmentResponse } from '../graphql/fragments';

export function useTotalPrice(orderItems: ShoppingCartItemFragmentResponse[]) {
  const totalPrice = useMemo(() => {
    let total = 0;
    for (const item of orderItems) {
      const offer = getActiveOffer(item.product.offers);
      const price = offer?.price ?? item.product.price;
      total += price * item.amount;
    }
    return total;
  }, [orderItems]);

  return { totalPrice };
}
