import { useMutation } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import { UpdateItemInShoppingCartMutation } from '../graphql/mutations';

import type { UpdateItemInShoppingCartMutationResponse } from '../graphql/mutations';

export const useUpdateCartItem = () => {
  const handleError = useErrorHandler();
  const [updateCartItem] = useMutation<UpdateItemInShoppingCartMutationResponse>(UpdateItemInShoppingCartMutation, {
    onError: handleError,
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetAuthUser'],
  });

  return { updateCartItem };
};
