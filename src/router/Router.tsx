import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App.tsx';
import DetailCard from '../components/DetailCard.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import AboutPage from '../pages/AboutPage.tsx';
import { MainLayout } from '../layout/MainLayout.tsx';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/search/1" replace />,
      },
      {
        path: '/search',
        element: <Navigate to="/search/1" replace />,
      },
      {
        path: 'search/:search',
        element: <App />,
        children: [
          {
            path: ':id',
            Component: DetailCard,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
