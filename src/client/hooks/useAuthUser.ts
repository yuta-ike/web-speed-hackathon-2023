import { gql, useQuery } from '@apollo/client';

import type { GetUserAuthQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetAuthUser {
    me {
      orders {
        isOrdered
        items {
          id
          amount
          product {
            id
            name
            price
            description
            thumbnail {
              id
              file {
                id
                filename
              }
            }
            offers {
              id
              price
              startDate
              endDate
            }
          }
        }
      }
    }
  }
`;

export const useAuthUser = () => {
  const authUserResult = useQuery<GetUserAuthQueryResponse>(Query);
  const authUser = authUserResult.data?.me;
  const authUserLoading = authUserResult.loading;
  const isAuthUser = !!authUser;

  return { authUser, authUserLoading, isAuthUser };
};
