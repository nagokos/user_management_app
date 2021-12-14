import { atom, selector } from 'recoil';
import { User } from '../types/index';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const adminState = selector<boolean>({
  key: 'adminState',
  get: ({ get }) => {
    const currentUser = get<User | null>(userState);
    const isAdmin = currentUser?.id === 10;
    return isAdmin;
  },
});
