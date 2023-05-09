import { useMemo, useState } from 'react';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextArea } from '../../foundation/TextArea';
import { useSendReview } from '../../../hooks/useSendReview';

import * as styles from './ReviewForm.styles';

import type { FC, FormEvent } from 'react';

// NOTE: 改行含めて 64 文字以内であるかどうか確認する
const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

export type Props = {
  productId: number;
};

export const ReviewForm: FC<Props> = ({ productId }) => {
  const [comment, setComment] = useState('');
  const { sendReview } = useSendReview();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendReview({
      variables: {
        comment,
        productId: Number(productId),
      },
    });
    setComment('');
  };

  const error = useMemo(() => {
    if (comment != '' && !LESS_THAN_64_LENGTH_REGEX.test(comment)) {
      return '64 文字以内でコメントしてください';
    }
  }, [comment]);

  return (
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
  );
};
