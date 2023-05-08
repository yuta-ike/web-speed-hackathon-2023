import { getMediaType } from '../../../../utils/get_media_type';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItemPreiewer.styles';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import type { FC } from 'react';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={file.filename} />}
      {type === 'video' && <video autoPlay controls muted playsInline className={styles.video()} src={file.filename} />}
    </div>
  );
};
