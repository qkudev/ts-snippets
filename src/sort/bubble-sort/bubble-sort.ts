export const bubbleSort = (arr: number[]) => {
  let hasSwapped = true;

  while (hasSwapped) {
    hasSwapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
        hasSwapped = true;
      }
    }
  }

  return arr;
}