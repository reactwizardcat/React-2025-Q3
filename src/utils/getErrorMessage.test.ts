import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  describe('FetchBaseQueryError', () => {
    it('should return error message for FETCH_ERROR', () => {
      const error: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        error: 'Failed to fetch',
      };
      expect(getErrorMessage(error)).toBe('Failed to fetch');
    });

    it('should return error message for PARSING_ERROR', () => {
      const error: FetchBaseQueryError = {
        status: 'PARSING_ERROR',
        originalStatus: 200,
        data: 'Invalid JSON',
        error: 'Parsing error',
      };
      expect(getErrorMessage(error)).toBe('Parsing error');
    });

    it('should return error message for TIMEOUT_ERROR', () => {
      const error: FetchBaseQueryError = {
        status: 'TIMEOUT_ERROR',
        error: 'Request timeout',
      };
      expect(getErrorMessage(error)).toBe('Request timeout');
    });

    it('should return error message for CUSTOM_ERROR', () => {
      const error: FetchBaseQueryError = {
        status: 'CUSTOM_ERROR',
        error: 'Custom error message',
      };
      expect(getErrorMessage(error)).toBe('Custom error message');
    });

    it('should return status as string for numeric status with data', () => {
      const error: FetchBaseQueryError = {
        status: 404,
        data: { message: 'Not found' },
      };
      expect(getErrorMessage(error)).toBe('404');
    });
  });

  describe('SerializedError', () => {
    it('should return error message when present', () => {
      const error: SerializedError = {
        message: 'Runtime error',
        name: 'Error',
      };
      expect(getErrorMessage(error)).toBe('Runtime error');
    });

    it('should return "Unknown error" when message is missing', () => {
      const error: SerializedError = {
        name: 'Error',
      };
      expect(getErrorMessage(error)).toBe('Unknown error');
    });

    it('should return "Unknown error" for empty error object', () => {
      const error: SerializedError = {};
      expect(getErrorMessage(error)).toBe('Unknown error');
    });
  });
});
