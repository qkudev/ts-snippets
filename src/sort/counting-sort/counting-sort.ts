/**
 * @see https://leetcode.com/explore/learn/card/sorting/695/non-comparison-based-sorts/4437/
 */
const countingSort = (arr: number[]) => {
  const shift = Math.min(...arr);
  const K = Math.max(...arr);
  const counts = new Array(K).fill(0);

  for (const el of arr) {
    counts[el - shift]++;
  }

  let startingIndex = 0;
  for (let i = 0; i < K + 1; i++) {
    const count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }

  const sortedArray: number[] = new Array(arr.length);
  for (const el of arr) {
    sortedArray[counts[el - shift]] = el;
    // since we have placed an item in index counts[elem], we need to
    // increment counts[elem] index by 1 so the next duplicate element
    // is placed in appropriate index
    counts[el - shift] += 1;
  }

  // common practice to copy over sorted list into original arr
  // it's fine to just return the sortedArray at this point as well
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArray[i];
  }
};

export default countingSort;
