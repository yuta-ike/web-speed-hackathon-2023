import classNames from 'classnames';

import { Anchor } from '../../foundation/Anchor';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';
import { useRecommendation } from '../../../hooks/useRecommendation';

import * as styles from './ProductHeroImage.styles';

import type { FC } from 'react';

const EMPTY_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

type Props = {
  title?: string;
};

export const ProductHeroImage: FC<Props> = ({ title: _title }) => {
  const recommendationData = useRecommendation();

  if (recommendationData.recommendation == null) {
    return null;
  }

  const product = recommendationData.recommendation.product;

  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const title = _title ?? product.name;

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor href={`/product/${product.id}`}>
              <div className={styles.container()}>
                <img
                  className={styles.image()}
                  decoding="async"
                  loading="eager"
                  srcSet={
                    thumbnailFile == null
                      ? EMPTY_IMAGE_SRC
                      : `${thumbnailFile.filename.replace('.webp', '_400.webp')} 400w,` +
                        `${thumbnailFile.filename.replace('.webp', '_800.webp')} 800w,` +
                        `${thumbnailFile.filename.replace('.webp', '_1024.webp')} 1024w`
                  }
                />

                <div className={styles.overlay()}>
                  <p
                    className={classNames(styles.title(), {
                      [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description(), {
                      [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {product.name}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
};

ProductHeroImage.displayName = 'ProductHeroImage';

export const ProductHeroImageFallback: React.FC = () => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <div className={styles.container()} style={{ opacity: 0 }}>
              <div className={styles.image()} />
              <div className={styles.overlay()}>
                <div
                  className={classNames(styles.title(), {
                    [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                    [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                  })}
                  style={{ height: '1lh' }}
                />
                <div
                  className={classNames(styles.description(), {
                    [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                    [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                  })}
                  style={{ height: '1lh' }}
                />
              </div>
            </div>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
};
