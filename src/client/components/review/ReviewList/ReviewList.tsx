import { Temporal } from '@js-temporal/polyfill';

import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';
import { useReviews } from '../../../hooks/useReviews';

import * as styles from './ReviewList.styles';

import type { FC } from 'react';

type Props = {
  productId: number;
  // reviews: ReviewFragmentResponse[];
};

export const ReviewList: FC<Props> = ({ productId }) => {
  const { reviews } = useReviews(productId);

  return (
    <ul className={styles.itemList()}>
      {reviews?.map((review) => {
        const endTime = Temporal.Instant.from(review.postedAt).toLocaleString('ja-jp', {
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          month: '2-digit',
          second: '2-digit',
          year: 'numeric',
        });

        return (
          <li key={review.id} className={styles.item()} data-testid="review-list-item">
            <div className={styles.avaterImage()}>
              <AspectRatio ratioHeight={1} ratioWidth={1}>
                <Image height={52} src={review.user.profile.avatar.filename} width={52} />
              </AspectRatio>
            </div>
            <div className={styles.content()}>
              <time className={styles.time()}>{endTime}</time>
              <p className={styles.comment()}>{review.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const ReviewListFallback: React.FC = () => {
  return <div className={styles.fallback()} />;
};
