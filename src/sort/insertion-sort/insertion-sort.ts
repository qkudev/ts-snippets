export const insertionSort = (arr: number[]) => {
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
}