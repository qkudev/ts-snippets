/**
 * Sorts an array of numbers using the insertion sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
const insertionSort = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    let currentIdx = i;

    while (currentIdx > 0 && arr[currentIdx - 1] > arr[currentIdx]) {
      const temp = arr[currentIdx - 1];
      arr[currentIdx - 1] = arr[currentIdx];
      arr[currentIdx] = temp;
      currentIdx--;
    }
  }

  return arr;
};

export default insertionSort;
