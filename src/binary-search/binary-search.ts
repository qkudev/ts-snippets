/**
 * Binary search implementation for number array
 */
export const binarySearch = (array: number[], target: number): number => {
  let start = 0;
  let end = array.length - 1;
  let result = -1;

  while (start <= end) {
    const middle = Math.floor((end + start) / 2);

    if (array[middle] > target) {
      end = middle - 1;
      continue;
    }

    if (array[middle] < target) {
      start = middle + 1;
      continue;
    }

    result = middle;
    break;
  }

  return result;
};
