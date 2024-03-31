import flatten, { NestedArray } from '../flatten';

describe('flatten', () => {
  it('should return array for flatten 0', () => {
    const array = [1, 2, 3];

    const result = flatten(array, 0);

    expect(result).toEqual(array);
  });

  it('should flatten array for 1 lvl', () => {
    const array: NestedArray<number> = [1, [2, 3, [4]]];

    const result = flatten(array, 1);

    expect(result).toEqual([1, 2, 3, [4]]);
  });

  it('should flatten array for 2 lvl', () => {
    const array: NestedArray<number> = [1, [2, 3, [4, [5]]]];

    const result = flatten(array, 2);

    expect(result).toEqual([1, 2, 3, 4, [5]]);
  });

  it('should fully flatten array', () => {
    const array: NestedArray<number> = [1, [2, 3, [4, [5]]]];

    const result = flatten(array, Number.POSITIVE_INFINITY);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should throw error for negative level', () => {
    expect(() => flatten([1], -1)).toThrow();
  });
});
