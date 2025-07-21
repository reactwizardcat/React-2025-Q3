import {
  SPINNER_DELAY,
  SKELETON_ELEMENTS_COUNT,
  STORAGE_KEY,
} from './constants';

describe('Constants', () => {
  it('SPINNER_DELAY should be 5000', () => {
    expect(SPINNER_DELAY).toBe(5000);
    expect(SPINNER_DELAY).toBeTypeOf('number');
  });

  it('SKELETON_ELEMENTS_COUNT should be 10', () => {
    expect(SKELETON_ELEMENTS_COUNT).toBe(10);
  });

  it('STORAGE_KEY should be "my_search_query"', () => {
    expect(STORAGE_KEY).toBe('my_search_query');
    expect(STORAGE_KEY).toBeTypeOf('string');
  });
});
