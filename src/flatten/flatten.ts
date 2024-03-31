export type NestedArray<T> = (T | NestedArray<T>)[];

/**
 * Flatten array for given levels.
 * Fuly flatten array by default.
 *
 * @example
 * const arr = [1, [2, 3, [4, [5]]]];
 *
 * console.log(flatten(arr));    // [1, 2, 3, 4, 5]
 * console.log(flatten(arr, 2))  // [1, 2, 3, 4, [5]]
 */
const flatten = <T>(
  array: NestedArray<T>,
  level = Number.POSITIVE_INFINITY
) => {
  if (level < 0) {
    throw new Error('Flatten level should be no less than 0');
  }

  const result: NestedArray<T> = [];

  const helper = (arr: NestedArray<T>, lvl: number) => {
    arr.forEach((val) => {
      if (!Array.isArray(val) || !lvl) {
        result.push(val);
      } else {
        helper(val, lvl - 1);
      }
    });
  };

  helper(array, level);

  return result;
};

export default flatten;
