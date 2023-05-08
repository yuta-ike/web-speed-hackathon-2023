export type ModalKey = 'SIGN_UP' | 'SIGN_IN';

import { proxy } from 'valtio';

export const modalState = proxy({ modal: undefined as ModalKey | undefined });
