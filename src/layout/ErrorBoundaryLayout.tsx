import { Outlet } from 'react-router';
import ErrorBoundary from '../components/ErrorBoundary';

export const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);
