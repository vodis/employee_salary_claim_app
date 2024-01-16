import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AdminHome = React.lazy(() => import('./pages/AdminPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AdminHome />,
    exact: true,
    secure: false,
    errorElement: <ErrorPage />
  }
]);

export default routes;
