export const heapSort = (arr: number[]) => {
  const maxHeapify = (_arr: number[], heapSize: number, idx: number) => {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let largest = idx;
    if (left < heapSize && _arr[left] > _arr[largest]) {
      largest = left;
    }
    if (right < heapSize && _arr[right] > _arr[largest]) {
      largest = right;
    }
    if (largest != idx) {
      const temp = _arr[idx];
      _arr[idx] = _arr[largest];
      _arr[largest] = temp;
      maxHeapify(_arr, heapSize, largest);
    }
  };

  for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    maxHeapify(arr, arr.length, i);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    // swap last element with first element
    const temp = arr[i];
    arr[i] = arr[0];
    arr[0] = temp;
    // note that we reduce the heap size by 1 every iteration
    maxHeapify(arr, i, 0);
  }

  return arr;
};
