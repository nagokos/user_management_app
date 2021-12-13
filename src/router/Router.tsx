import { memo, VFC } from 'react';
import { useRoutes } from 'react-router';
import { Login, Home, NotFound, Setting, UserManagement } from '../pages/index';

export const Router: VFC = memo(() => {
  let routes = useRoutes([
    { path: 'login', element: <Login /> },
    {
      path: 'home',
      element: <Home />,
      children: [
        { path: 'setting', element: <Setting /> },
        { path: 'user_management', element: <UserManagement /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);
  return routes;
});
