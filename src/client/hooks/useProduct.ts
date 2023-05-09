import { gql, useQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductDetailsQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetProductDetails($productId: Int!) {
    product(id: $productId) {
      description
      id
      media {
        id
        file {
          filename
        }
      }
      name
      offers {
        endDate
        price
        startDate
      }
      price
    }
  }
`;

export const useProduct = (productId: number) => {
  const handleError = useErrorHandler();
  const productResult = useQuery<GetProductDetailsQueryResponse>(Query, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  const product = productResult.data?.product;

  return { product };
};
