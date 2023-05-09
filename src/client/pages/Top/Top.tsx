import { Helmet } from 'react-helmet-async';
import { Suspense } from 'react';

import { ProductHeroImage, ProductHeroImageFallback } from '../../components/product/ProductHeroImage';
import { FeatureSections, FeatureSectionsFallback } from '../../components/feature/FeatureSections/FeatureSections';

import type { FC } from 'react';

export const Top: FC = () => {
  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <div>
        <Suspense fallback={<ProductHeroImageFallback />}>
          <ProductHeroImage title="今週のオススメ" />
        </Suspense>

        <Suspense fallback={<FeatureSectionsFallback />}>
          <FeatureSections />
        </Suspense>
      </div>
    </>
  );
};
