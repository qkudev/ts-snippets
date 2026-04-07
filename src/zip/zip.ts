/**
 * Zips given arrays
 * @example
 * const result = zip(
 *   [1, 2, 3],
 *   ['a', 'b', 'c']
 * )
 * console.log(result) // [[1, 'a'], [2, 'b'], [3, 'c']]
 */
function zip<Args extends any[][]>(...arrays: Args) {
  const output = [];
  const tupleLength = arrays.length;
  const outputLength = arrays[0].length;

  for (let i = 0; i < outputLength; i++) {
    const tuple = [];

    for (let j = 0; j < tupleLength; j++) {
      if (!Array.isArray(arrays[j])) {
        throw new Error(
          `Argument ${j + 1} is not an array. Received: ${typeof arrays[j]}`
        );
      }

      const item = arrays[j][i];
      tuple.push(item);
    }

    output.push(tuple);
  }

  return output;
}

export default zip;
