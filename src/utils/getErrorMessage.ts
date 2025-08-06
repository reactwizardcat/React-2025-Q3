import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError
): string {
  if ('status' in error) {
    if ('error' in error) {
      return error.error;
    } else if (error.data) {
      return error.status.toString();
    }
    return 'Unknown error';
  } else {
    return error.message || 'Unknown error';
  }
}
