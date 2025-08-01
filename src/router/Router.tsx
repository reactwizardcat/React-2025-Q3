import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App.tsx';
import DetailCard from '../components/DetailCard.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { fetchCard } from '../api/fetchCard.ts';
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
            loader: async ({ params }) => {
              if (params.id) {
                const data = await fetchCard(parseInt(params.id));
                return data;
              }
            },
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
