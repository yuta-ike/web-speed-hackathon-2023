import { useQuery } from '@apollo/client';

import { GetAuthUserQuery } from '../graphql/queries';

import type { GetUserAuthQueryResponse } from '../graphql/queries';

export const useAuthUser = () => {
  const authUserResult = useQuery<GetUserAuthQueryResponse>(GetAuthUserQuery);
  console.log(authUserResult);
  const authUser = authUserResult.data?.me;
  const authUserLoading = authUserResult.loading;
  const isAuthUser = !!authUser;

  return { authUser, authUserLoading, isAuthUser };
};
