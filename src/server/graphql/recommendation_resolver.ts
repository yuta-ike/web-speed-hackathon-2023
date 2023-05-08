import { Recommendation } from '../../model/recommendation';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const recommendationResolver: GraphQLModelResolver<Recommendation> = {
  product: async (parent) => {
    const recommendation = await dataSource.manager.findOneOrFail(Recommendation, {
      relations: {
        product: {
          media: true,
        },
      },
      select: {
        id: true,
        product: {
          id: true,
          media: {
            file: {
              filename: true,
            },
            isThumbnail: true,
          },
          name: true,
        },
      },
      where: { id: parent.id },
    });

    return recommendation.product;
  },
};
