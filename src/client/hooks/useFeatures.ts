import { gql, useLazyQuery, useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';
import { useEffect } from 'react';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';

const Query = gql`
  query GetFeatureSections($limit: Int, $itemLimit: Int) {
    features(limit: $limit) {
      id
      title
      items(limit: $itemLimit) {
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
  const featuresResult = useSuspenseQuery<GetFeatureSectionsQueryResponse>(Query, {
    variables: { itemLimit: 10, limit: 3 },
  });

  const [fetchAllFeatureSections, { data }] = useLazyQuery<GetFeatureSectionsQueryResponse>(Query, {});

  const initialFetchData = featuresResult.data?.features;

  useEffect(() => {
    fetchAllFeatureSections();
  }, [fetchAllFeatureSections]);

  return { features: data?.features ?? initialFetchData };
};
