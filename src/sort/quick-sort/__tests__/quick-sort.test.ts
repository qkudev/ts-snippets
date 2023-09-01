import { quickSort } from '../quick-sort';

const isSorted = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};

describe('Quick sort', () => {
  it('should sort array', () => {
    for (let i = 100; i < 10000; i = i + 100) {
      const randArr = new Array(i)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100000));
      const sorted = quickSort(randArr);

      expect(isSorted(sorted)).toEqual(true);
    }
  });
});
