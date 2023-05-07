import { useMutation } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import { OrderItemsInShoppingCartMutation } from '../graphql/mutations';

import type { OrderItemsInShoppingCartMutationResponse } from '../graphql/mutations';

export const useSubmitOrder = () => {
  const handleError = useErrorHandler();
  const [submitOrder] = useMutation<OrderItemsInShoppingCartMutationResponse>(OrderItemsInShoppingCartMutation, {
    onError: handleError,
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetAuthUser'],
  });

  return { submitOrder };
};
