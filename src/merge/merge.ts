const notObjectOrNull = (arg: any) => typeof arg !== 'object' || arg === null;
const xor = (a: boolean, b: boolean) => (a && !b) || (b && !a);

/**
 * Performs deep merge of two given objects.
 *
 * @example
 * const obj1 = {
 *   a: {
 *     b: 1,
 *     c: 3,
 *   }
 * }
 * conts obj2 = {
 *   a: {
 *     b: 2,
 *     d: 4
 *   }
 * }
 *
 * console.log(merge(obj1, obj2)) // { a: { b: 2, c: 3, d: 4 }}
 */
function merge(obj1: any, obj2: any): any {
  if (typeof obj1 !== typeof obj2 || notObjectOrNull(obj1) || obj2 === null) {
    return obj2;
  }

  const newObj: any = Array.isArray(obj2) ? [] : {};
  for (const [k, v] of Object.entries(obj1)) {
    newObj[k] = v;
  }
  for (const key in obj2) {
    if (xor(Array.isArray(obj1[key]), Array.isArray(obj2[key]))) {
      newObj[key] = obj2[key];
    } else {
      newObj[key] = merge(obj1[key], obj2[key]);
    }
  }

  return newObj;
}

export default merge;
