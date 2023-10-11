import WSet from '../weak-set';

describe('WeakSet', () => {
  let s: WSet = beforeEach(() => {
    s = new WSet();
  });

  it('should add item as check relation', () => {
    const o = {};
    s.add(o);

    expect(s.has(o)).toBe(true);
  });

  it('should remove item from set', () => {
    const o = {};
    s.add(o);
    s.delete(o);
    expect(s.has(o)).toBe(false);
  });

  it('should throw TypeError in case where key is not an object', () => {
    expect(() => s.add(1)).toThrowError(TypeError);
    expect(() => s.add(null)).toThrowError(TypeError);
    expect.assertions(2);
  });
});
