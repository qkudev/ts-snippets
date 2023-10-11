import deepFilter from '../deep-filter';

describe('deepFilter', () => {
  it('should act as normal filter for an array', () => {
    const arr = [1, 2, 3, 4, 5];
    const fn = (val: unknown) => Number.isInteger(val) && Number(val) < 3;

    const result = deepFilter(arr, fn);

    expect(result).toEqual([1, 2]);
  });

  it('should return undefined if no items accepted by filter fn', () => {
    const arr = [1, 2, 3, 4, 5];
    const fn = (val: unknown) => Number.isInteger(val) && Number(val) > 10;

    const result = deepFilter(arr, fn);

    expect(result).toEqual(undefined);
  });

  it('should filter nested array', () => {
    const arr = [1, [2, 3], [4, 5], [6, [7, 8]]];
    const fn = (val: unknown) => Number.isInteger(val) && Number(val) > 4 && Number(val) < 8;

    const result = deepFilter(arr, fn);

    expect(result).toEqual([[5], [6, [7]]]);
  });

  it('should filter object values', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const fn = (val: unknown) => Number.isInteger(val) && Number(val) < 3;

    const result = deepFilter(obj, fn);
    expect(result).toEqual({
      a: 1,
      b: 2,
    });
  });

  it('should return undefined if no values accepted by filter fn', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const fn = (val: unknown) => Number.isInteger(val) && Number(val) > 10;

    const result = deepFilter(obj, fn);
    expect(result).toEqual(undefined);
  });

  it('should filter by null', () => {
    const obj = {
      a: null,
      b: { c: null },
      d: [null, null],
      e: { f: null },
      g: 'Hello',
    };
    const fn = (x: unknown) => x === null;

    const result = deepFilter(obj, fn);

    expect(result).toEqual({
      a: null,
      b: {
        c: null,
      },
      d: [null, null],
      e: {
        f: null,
      },
    });
  });
});
