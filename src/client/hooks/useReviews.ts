import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductReviewsQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetProductReviews($productId: Int!) {
    product(id: $productId) {
      reviews {
        id
        comment
        postedAt
        user {
          id
          profile {
            avatar {
              filename
            }
          }
        }
      }
    }
  }
`;

export const useReviews = (productId: number | undefined) => {
  const handleError = useErrorHandler();

  const [loadReviews, reviewsResult] = useLazyQuery<GetProductReviewsQueryResponse>(Query, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  useEffect(() => {
    // サーバー負荷が懸念されそうなので、リクエストを少し待つ
    // サーバー負荷がなくなれば、すぐ読み込んでもよい
    const timer = setTimeout(() => {
      loadReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [loadReviews, productId]);

  const reviews = reviewsResult.data?.product.reviews;

  return { reviews };
};
