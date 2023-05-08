import { useMemo, useState } from 'react';

import { useSignUp } from '../../../hooks/useSignUp';
import { useCloseModal, useIsOpenModal, useOpenModal } from '../../../store/modal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './SignUpModal.styles';

import type { FC, FormEvent } from 'react';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^([a-zA-Z0-9]{2,})+$/;

// // NOTE: 文字列に @ が含まれているか確認する
// const emailSchema = z.string().refine((v) => !NOT_INCLUDED_AT_CHAR_REGEX.test(v));
// // NOTE: 文字列に英数字以外の文字が含まれているか確認する
// const passwordSchema = z.string().refine((v) => !NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(v));

export type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

export const SignUpModal: FC = () => {
  const isOpened = useIsOpenModal('SIGN_UP');
  const { signUp } = useSignUp();

  const handleOpenModal = useOpenModal();
  const handleCloseModal = useCloseModal();

  const [submitError, setSubmitError] = useState<Error | null>(null);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({
        variables: {
          email,
          name,
          password,
        },
      });
      setEmail('');
      setName('');
      setPassword('');
      setSubmitError(null);
      handleCloseModal();
    } catch (err) {
      setSubmitError(err as Error);
    }
  };

  const emailError = useMemo(() => {
    if (email != '' && NOT_INCLUDED_AT_CHAR_REGEX.test(email)) {
      return 'メールアドレスの形式が間違っています';
    }
  }, [email]);

  const passwordError = useMemo(() => {
    if (password != '' && NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(password)) {
      return '英数字以外の文字を含めてください';
    }
  }, [password]);

  return (
    <Modal onHide={handleCloseModal} show={isOpened}>
      <div className={styles.inner()}>
        <header className={styles.header()}>
          <h2 className={styles.heading()}>会員登録</h2>
          <button
            className={styles.switchToSignInButton()}
            data-testid="modal-switch-to-signin"
            onClick={() => handleOpenModal('SIGN_IN')}
          >
            ログイン
          </button>
        </header>
        <form className={styles.form()} onSubmit={handleSubmit}>
          <div className={styles.inputList()}>
            <TextInput
              required
              id="email"
              label="メールアドレス"
              placeholder="メールアドレスを入力"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={styles.error()}>{emailError}</p>

            <TextInput
              required
              id="name"
              label="名前"
              placeholder="名前を入力"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className={styles.error()}></p>

            <TextInput
              required
              id="password"
              label="パスワード"
              placeholder="パスワードを入力"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={styles.error()}>{passwordError}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              登録する
            </PrimaryButton>
          </div>
          {submitError ? <p className={styles.error()}>会員登録に失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
