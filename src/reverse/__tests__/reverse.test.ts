import reverse from '../reverse';

describe('reverse', () => {
  it('should reverse array', () => {
    const arr = [1, 2, 3];

    const result = reverse(arr);

    expect(result).toEqual([3, 2, 1]);
  });

  it('should not mutate original array', () => {
    const arr = [1, 2, 3];

    reverse(arr);

    expect(arr).toEqual([1, 2, 3]);
  });

  it('should create new array', () => {
    const arr = [1, 2, 3];

    const result = reverse(arr);

    expect(result).not.toBe(arr);
  });

  it('should create array even for empy input', () => {
    const arr: number[] = [];

    const result = reverse(arr);

    expect(result).not.toBe(arr);
    expect(result).toEqual([]);
  });
});
