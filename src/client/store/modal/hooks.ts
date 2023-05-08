import { useSnapshot } from 'valtio';

import { modalState } from './state';

import type { ModalKey } from './state';

export const useIsOpenModal = (key: ModalKey) => {
  const snapshot = useSnapshot(modalState);
  return snapshot.modal === key;
};

export const useOpenModal = () => {
  return (key: ModalKey) => {
    modalState.modal = key;
  };
};

export const useCloseModal = () => {
  return () => {
    modalState.modal = undefined;
  };
};
