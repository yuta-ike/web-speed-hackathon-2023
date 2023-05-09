import { getMediaType } from '../../../../utils/get_media_type';
import { Icon } from '../../../foundation/Icon';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItem.styles';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItem: FC<Props> = ({ file }) => {
  const mediaType = getMediaType(file.filename);
  const imageSrc =
    mediaType === 'image'
      ? file.filename.replace('_1024.webp', '_thumb.webp')
      : file.filename.replace('.webm', '_thumb.webp').replace('/videos', '/images/video_thumb');

  return (
    <div className={styles.container()}>
      {imageSrc != null && <Image fill src={imageSrc} width="40px" height="40px" />}
      {mediaType === 'video' && (
        <div className={styles.playIcon()}>
          <Icon color="#ffffff" height={16} type="FaPlay" width={16} />
        </div>
      )}
    </div>
  );
};
