/**
 * Determines whether two values are equal (deep equality check).
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are equal, `false` otherwise.
 */
const equals = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    // null check
    if (!a || !b) {
      return false;
    }

    // array check
    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)) {
        return false;
      }

      if (a.length !== b.length) {
        return false;
      }

      for (let i = 0; i < a.length; i++) {
        if (!equals(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    // object deep check
    for (const [key, value] of Object.entries(a)) {
      if (!(key in b) || !equals(value, b[key as keyof typeof b])) {
        return false;
      }
    }

    // a keys already checked
    const checked = new Set(Object.keys(a));

    for (const [key, value] of Object.entries(b)) {
      if (checked.has(key)) {
        continue;
      }

      if (!(key in a) || !equals(value, a[key as keyof typeof a])) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export default equals;
