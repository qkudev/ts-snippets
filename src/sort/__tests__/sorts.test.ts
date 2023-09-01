import { bubbleSort } from '../bubble-sort';
import { heapSort } from '../heap-sort';
import { insertionSort } from '../insertion-sort';
import { selectionSort } from '../selection-sort';
import { quickSort } from '../quick-sort';

describe('sorts', () => {
  const getRandomInt = () =>
    Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1);

  const getRandomArrays = () =>
    new Array(10).fill(0).map(() => new Array(100).fill(0).map(getRandomInt));

  const isArraySorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }

    return true;
  };

  const testSort = (sort: (arr: number[]) => number[]) => {
    const arrays: number[][] = getRandomArrays();

    arrays.forEach(arr => {
      sort(arr);

      expect(isArraySorted(arr)).toBe(true);
    });

    expect.assertions(arrays.length);
  };

  it('should sort random arrays by bubble sort', () => {
    testSort(bubbleSort);
  });

  it('should sort random arrays by selection sort', () => {
    testSort(selectionSort);
  });

  it('should sort random arrays by insertion sort', () => {
    testSort(insertionSort);
  });

  it('should sort random arrays by heap sort', () => {
    testSort(heapSort);
  });

  it('should sort random arrays by quick sort', () => {
    testSort(quickSort);
  });

  it('should sort given array', () => {
    const arr = [-2, 3, -5];
    heapSort(arr);

    expect(isArraySorted(arr)).toBe(true);
  });
});
