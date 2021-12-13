import { atom } from 'recoil';

export const snackbarState = atom({
  key: 'snackbarState',
  default: false,
});

export const snackbarMessage = atom({
  key: 'snackbarMessage',
  default: '',
});
