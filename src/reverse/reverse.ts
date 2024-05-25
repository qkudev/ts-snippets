/**
 * Accepts an array of type `T`
 * and returns new array with reversed order
 *
 * @example
 * const arr = [1,2,3]
 * const result = reverse(arr)
 * console.log(arr)    // [3,2,1]
 */
function reverse<T>(arr: T[]): T[] {
  const result: T[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

export default reverse;
