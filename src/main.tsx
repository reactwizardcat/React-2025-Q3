import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Better use Vue.');
}
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
