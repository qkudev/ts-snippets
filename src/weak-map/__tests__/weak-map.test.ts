import WeakMap from '../weak-map';

describe('WeakMap', () => {
  it('should set and get', () => {
    const map = new WeakMap<object, number>();
    const o = {
      a: 1,
    };

    map.set(o, 1);
    map.set(o, 2);
    expect(map.get(o)).toEqual(2);
    expect(Object.keys(o)).toEqual(['a']);
  });

  it('should check for relation', () => {
    const map = new WeakMap<object, number>();
    const o = {
      a: 1,
    };

    map.set(o, 1);
    expect(map.has(o)).toEqual(true);
  });

  it('should delete from map', () => {
    const map = new WeakMap<object, number>();
    const o = {
      a: 1,
    };

    map.set(o, 1);
    map.delete(o);
    expect(map.has(o)).toBe(false);
  });
});
