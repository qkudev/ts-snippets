import uniq from '../uniq';

describe('uniq', () => {
  it('should return unique values of an array', () => {
    const arr = [1, 2, 2, 3, 3, 3];

    const result = uniq(arr);

    expect(result).toEqual([1, 2, 3]);
  });

  it('should return unique values of map', () => {
    const map = new Map<number, number>();
    map.set(1, 1);
    map.set(2, 2);
    map.set(3, 1);

    const result = uniq(map.values());

    expect(result).toEqual([1, 2]);
  });

  it('should work with generator', () => {
    function* lessThanFive() {
      let i = 0;
      while (i < 5) {
        yield i;
        i++;
      }
    }

    const result = uniq(lessThanFive());

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should not check equality by value', () => {
    const arr = [{ a: 1 }, { a: 1 }];

    const result = uniq(arr);

    expect(result).toEqual(arr);
  });
});
