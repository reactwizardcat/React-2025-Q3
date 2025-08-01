import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/Router.tsx';

createRoot(document.body).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
