import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/Router.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Better use Vue.');
}
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
