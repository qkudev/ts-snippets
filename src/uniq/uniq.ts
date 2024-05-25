/**
 * Accepts iterable and returns array of uniq values
 * of the iterable
 *
 * @example
 * const result = uniq([1,2,2,3,3,3])
 * console.log(result)   // [1,2,3]
 */
function uniq<T>(iterable: Iterable<T>): T[] {
  if (!['object', 'function'].includes(typeof iterable)) {
    throw new TypeError('iterable should be object or function');
  }

  if (iterable === null) {
    throw new TypeError('iterable can not be null');
  }

  if (!(Symbol.iterator in iterable)) {
    throw new Error('iterable should have Symbol.iterator');
  }

  return Array.from(new Set(iterable));
}

export default uniq;
