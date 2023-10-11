import binarySearch from '../binary-search';

describe('binarySearch', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  it('searches for the given value in sorted array', () => {
    const idx = binarySearch(arr, 6);

    expect(idx).toEqual(5);
  });

  it('returns -1 for a value that not in array', () => {
    const idx = binarySearch(arr, 9);

    expect(idx).toEqual(-1);
  });
});
