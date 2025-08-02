import { Outlet } from 'react-router';
import ErrorBoundary from '../components/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

export const MainLayout = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
);
