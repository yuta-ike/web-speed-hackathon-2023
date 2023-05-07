import _ from 'lodash';
import { memo } from 'react';

import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <ProductListSlider featureSection={featureSection} />;
          }
          case DeviceType.MOBILE: {
            return <ProductGridList featureSection={featureSection} />;
          }
        }
      }}
    </GetDeviceType>
  );
}, _.isEqual);

ProductList.displayName = 'ProductList';
