import { FeatureItem } from '../../model/feature_item';
import { dataSource } from '../data_source';

import type { FeatureSection } from '../../model/feature_section';
import type { GraphQLModelResolver } from './model_resolver';

export const featureSectionResolver: GraphQLModelResolver<FeatureSection> = {
  items: async (parent, args) => {
    return dataSource.manager.find(FeatureItem, {
      relations: {
        product: true,
      },
      take: args.limit,
      where: {
        section: parent,
      },
    });
  },
};
