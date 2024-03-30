/**
 * Performs deep clone for given value
 */
const clone = <T>(val: T): T => {
  if (typeof val !== 'object') {
    return val;
  }

  if (val === null) {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((element) => clone(element)) as unknown as T;
  }

  if ('constructor' in val && val.constructor === Object) {
    return Object.fromEntries(
      Object.entries(val).map(([key, value]) => [key, clone(value)])
    ) as unknown as T;
  }

  return val;
};

export default clone;
