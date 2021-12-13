import { memo, VFC } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/organisms/Header';

export const Home: VFC = memo(() => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
});
