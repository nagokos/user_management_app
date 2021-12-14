import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../types/index';
import { useUnmountRef, useSafeState } from './index';
import { snackbarState, snackbarMessage, userState } from '../store/index';
import { useSetRecoilState } from 'recoil';

export const useAuth = () => {
  const unmountRef = useUnmountRef();
  const [loading, setLoading] = useSafeState(unmountRef, false);

  const currentUser = useSetRecoilState(userState);
  const state = useSetRecoilState(snackbarState);
  const message = useSetRecoilState(snackbarMessage);

  const navigate = useNavigate();

  const login = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      state(true);
      message('ログインしました');
      currentUser(res.data);
      navigate('/home');
    } catch (err) {
      state(true);
      message('ユーザーが見つかりませんでした');
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading };
};
