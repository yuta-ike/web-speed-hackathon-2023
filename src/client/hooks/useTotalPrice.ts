import { useMemo } from 'react';

import { getActiveOffer } from '../utils/get_active_offer';

import type { OrderFragmentResponse } from '../graphql/fragments';

export function useTotalPrice(order: OrderFragmentResponse) {
  const totalPrice = useMemo(() => {
    let total = 0;
    for (const item of order.items) {
      const offer = getActiveOffer(item.product.offers);
      const price = offer?.price ?? item.product.price;
      total += price * item.amount;
    }
    return total;
  }, [order.items]);

  return { totalPrice };
}
