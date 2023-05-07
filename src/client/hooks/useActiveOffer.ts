import { useEffect, useState } from 'react';

import { getActiveOffer } from '../utils/get_active_offer';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../graphql/fragments';

export function useActiveOffer(product: ProductFragmentResponse | undefined) {
  const [activeOffer, setActiveOffer] = useState<LimitedTimeOfferFragmentResponse | undefined>(undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!product) {
        setActiveOffer(undefined);
        return;
      }

      const offer = getActiveOffer(product.offers);
      setActiveOffer(offer);
    }, 0);

    return () => {
      clearInterval(timer);
    };
  }, [product]);

  return { activeOffer };
}
