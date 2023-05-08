import { useMemo, useState } from 'react';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextArea } from '../../foundation/TextArea';
import { ReviewList } from '../ReviewList';

import * as styles from './ReviewSection.styles';

import type { FC, FormEvent } from 'react';
import type { ReviewFragmentResponse } from '../../../graphql/fragments';

const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;
// NOTE: 改行含めて 64 文字以内であるかどうか確認する
// const commentSchema = z.string().regex(LESS_THAN_64_LENGTH_REGEX);

type Props = {
  reviews: ReviewFragmentResponse[] | undefined;
  hasSignedIn: boolean;
  onSubmitReview: (reviewForm: ReviewForm) => void;
};

type ReviewForm = {
  comment: string;
};

export const ReviewSection: FC<Props> = ({ hasSignedIn, onSubmitReview, reviews }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitReview({ comment });
    setComment('');
  };

  const error = useMemo(() => {
    if (comment != '' && !LESS_THAN_64_LENGTH_REGEX.test(comment)) {
      return '64 文字以内でコメントしてください';
    }
  }, [comment]);

  return (
    <div>
      {reviews != null ? <ReviewList reviews={reviews} /> : null}
      {hasSignedIn && (
        <form className={styles.form()} data-testid="form-review" onSubmit={handleSubmit}>
          <div className={styles.commentTextAreaWrapper()}>
            <TextArea
              required
              id="comment"
              label="レビューを送信する"
              placeholder="こちらの野菜はいかがでしたか？"
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className={styles.error()}>{error}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              送信
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

ReviewSection.displayName = 'ReviewSection';
