import { gql, useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';
import { Temporal } from '@js-temporal/polyfill';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetRecommendations {
    recommendations {
      id
      product {
        id
        thumbnail {
          id
          file {
            filename
          }
        }
        name
      }
    }
  }
`;

export const useRecommendation = () => {
  const recommendationsResult = useSuspenseQuery<GetRecommendationsQueryResponse>(Query);

  const hour = Temporal.Now.plainTimeISO().hour;
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};
