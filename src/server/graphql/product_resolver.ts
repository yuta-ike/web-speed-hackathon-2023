import { LimitedTimeOffer } from '../../model/limited_time_offer';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { Product } from '../../model/product';
import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: (parent) => {
    return dataSource.manager.find(ProductMedia, {
      where: {
        product: parent,
      },
    });
  },
  offers: (parent) => {
    return dataSource.manager.find(LimitedTimeOffer, {
      where: {
        product: parent,
      },
    });
  },
  reviews: (parent) => {
    return dataSource.manager.find(Review, {
      where: {
        product: parent,
      },
    });
  },
  thumbnail: (parent) => {
    return dataSource.manager.findOneOrFail(ProductMedia, {
      where: {
        isThumbnail: true,
        product: parent,
      },
    });
  },
};
