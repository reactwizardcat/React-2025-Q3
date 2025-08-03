import { describe, it, expect } from 'vitest';
import { getVisiblePages } from './linksArray';

describe('getVisiblePages', () => {
  vi.mock('../constants', () => ({ MAX_VISIBLE_PAGES: 5 }));
  it('should return correct pages when current page is in the middle', () => {
    const result = getVisiblePages(5, 10);
    expect(result).toEqual([3, 4, 5, 6, 7]);
  });

  it('should adjust start page when current page is near the beginning', () => {
    const result = getVisiblePages(2, 10);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should adjust end page when current page is near the end', () => {
    const result = getVisiblePages(9, 10);
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });

  it('should return all pages when total pages less than MAX_VISIBLE_PAGES', () => {
    const result = getVisiblePages(3, 4);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle case when current page is first', () => {
    const result = getVisiblePages(1, 10);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle case when current page is last', () => {
    const result = getVisiblePages(10, 10);
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });

  it('should return single page when total pages is 1', () => {
    const result = getVisiblePages(1, 1);
    expect(result).toEqual([1]);
  });
});
