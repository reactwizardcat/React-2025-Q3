import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App.tsx';
import DetailCard from '../components/DetailCard.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { fetchCard } from '../api/fetchCard.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="search" replace />,
  },
  {
    path: 'search',
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
    element: <p>about</p>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
