import { gql, useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetFeatureSections {
    features {
      id
      title
      items {
        id
        product {
          id
          media {
            file {
              filename
            }
            isThumbnail
          }
          name
          price
          offers {
            price
            startDate
            endDate
          }
        }
      }
    }
  }
`;

export const useFeatures = () => {
  const featuresResult = useSuspenseQuery<GetFeatureSectionsQueryResponse>(Query);

  const features = featuresResult.data?.features;

  return { features };
};
