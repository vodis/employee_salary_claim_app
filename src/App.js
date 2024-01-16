import React from 'react';
import Loading from './components/Loading';
import routes from './routes';
import { RouterProvider } from 'react-router-dom';
import Layout from './layout';
import NotificationsProvider from './providers/Notifications';

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <NotificationsProvider>
        <Layout>
          <RouterProvider router={routes} />
        </Layout>
      </NotificationsProvider>
    </React.Suspense>
  );
}

export default App;
