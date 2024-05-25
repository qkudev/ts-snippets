type Key = string | number;

/**
 * Joins two arrays of objects by key.
 * If an element is missing in one of the arrays,
 * resulting element will have keys only from other array.
 *
 * @example
 * const users = [
 *   { id: 1, isBanned: false },
 *   { id: 2, isBanned: false },
 * ]
 * const profiles = [
 *   { id: 1, username: 'john' },
 *   { id: 2, username: 'george' },
 * ]
 *
 * const result = join('id', users, profiles)
 * console.log(result)
 * // [
 * //  { id: 1, isBanned: false, username: 'john' },
 * //  { id: 2, isBanned: false, username: 'george' }
 * // ]
 */
function join<
  K extends Key,
  KeyType extends Key,
  Obj1 extends { [key in K]: KeyType },
  Obj2 extends { [key in K]: KeyType },
>(
  key: K,
  arr1: Obj1[],
  arr2: Obj2[]
): Array<Partial<Obj1 & Obj2> & { [key in K]: KeyType }> {
  const mapObj1 = arr1.reduce((map, el) => {
    map.set(el[key], el);
    return map;
  }, new Map<KeyType, Obj1>());
  const mapObj2 = arr2.reduce((map, el) => {
    map.set(el[key], el);
    return map;
  }, new Map<KeyType, Obj2>());

  const ids = new Set([...mapObj1.keys(), ...mapObj2.keys()]);

  return Array.from(ids).map((id) => ({
    [key]: id,
    ...(mapObj1.get(id) || ({} as Obj1)),
    ...(mapObj2.get(id) || ({} as Obj2)),
  }));
}

export default join;
