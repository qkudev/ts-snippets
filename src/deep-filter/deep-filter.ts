/**
 * @see https://leetcode.com/problems/deep-object-filter/
 */
export const deepFilter = (
  obj: object,
  fn: (val: unknown) => boolean
): object | undefined => {
  const isEmpty = (obj: object) =>
    !(Array.isArray(obj) ? obj : Object.keys(obj)).length;

  const filter = (val: unknown): any => {
    if (typeof val !== 'object' || val === null) {
      if (fn(val)) {
        return val;
      }

      return undefined;
    }

    if (Array.isArray(val)) {
      const result = val.map(filter).filter((v) => v !== undefined);
      if (isEmpty(result)) {
        return undefined;
      }

      return result;
    }

    const result = Object.fromEntries(
      Object.entries(val)
        .map(([k, v]) => [k, filter(v)])
        .filter(([, v]) => v !== undefined)
    );

    return isEmpty(result) ? undefined : result;
  };

  return filter(obj);
};
