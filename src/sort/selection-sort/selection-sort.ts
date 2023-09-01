export const selectionSort = (arr: number[]) => {
  let minIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
};
