import { Suspense } from 'react';

import { ReviewList, ReviewListFallback } from '../ReviewList';
import { ReviewForm } from '../ReviewForm';

import type { FC } from 'react';

type Props = {
  productId: number;
  hasSignedIn: boolean;
};

export const ReviewSection: FC<Props> = ({ hasSignedIn, productId }) => {
  return (
    <div>
      <Suspense fallback={<ReviewListFallback />}>
        <ReviewList productId={productId} />
      </Suspense>
      {hasSignedIn && <ReviewForm productId={productId} />}
    </div>
  );
};

ReviewSection.displayName = 'ReviewSection';
