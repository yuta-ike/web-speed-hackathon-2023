import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalState } from './state';

import type { ModalKey } from './state';

export const useIsOpenModal = (key: ModalKey) => {
  const modalKey = useRecoilValue(modalState);

  return modalKey === key;
};

export const useOpenModal = () => {
  const setModal = useSetRecoilState(modalState);

  return (key: ModalKey) => {
    setModal(key);
  };
};

export const useCloseModal = () => {
  const setModal = useSetRecoilState(modalState);

  return () => {
    setModal(undefined);
  };
};
