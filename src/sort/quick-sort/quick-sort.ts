/**
 * A utility function to swap two elements in an array
 */
const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot
 */
const partition = (arr: number[], low: number, high: number) => {
  // pivot
  const pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (arr[j] < pivot) {
      // Increment index of
      // smaller element
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
};

/**
 * The main function that implements quick sort alg
 */
function recursionQuickSort(arr: number[], low: number, high: number) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    let pi = partition(arr, low, high);

    // Separately sort elements before
    // partition and after partition
    recursionQuickSort(arr, low, pi - 1);
    recursionQuickSort(arr, pi + 1, high);
  }

  return arr;
}

/**
 * Quick sort impl
 * Mutates given array (!)
 */
export const quickSort = (arr: number[]): number[] =>
  recursionQuickSort(arr, 0, arr.length - 1);
