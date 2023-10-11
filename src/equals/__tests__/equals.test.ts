import equals from '../equals';

describe('equals', () => {
  it('should return true for simple values', () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals('foo', 'foo')).toBe(true);
    expect(equals(true, true)).toBe(true);
    expect(equals(null, null)).toBe(true);
    expect(equals(undefined, undefined)).toBe(true);
    expect(equals(Symbol.for('foo'), Symbol.for('foo'))).toBe(true);
  });

  it('should return false for different types', () => {
    expect(equals(1, '1')).toBe(false);
    expect(equals(1, true)).toBe(false);
    expect(equals(1, null)).toBe(false);
    expect(equals(1, undefined)).toBe(false);
    expect(equals(1, Symbol.for('foo'))).toBe(false);
  });

  it('should return false for symbols', () => {
    expect(equals(Symbol('foo'), Symbol('foo'))).toBe(false);
  });

  it('should return false for obj and array', () => {
    expect(equals({ 0: 1 }, [1])).toBe(false);
  });

  it('should return true for empty objects', () => {
    expect(equals({}, {})).toBe(true);
  });

  it('should return true for empty arrays', () => {
    expect(equals([], [])).toBe(true);
  });

  it('should return true for nested objects', () => {
    expect(equals({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });

  //
  it('should return false for different objects', () => {
    expect(equals({ a: 1 }, { b: 1 })).toBe(false);
    expect(equals({ a: 1 }, { a: 2 })).toBe(false);
    expect(equals({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('should return false for different arrays', () => {
    expect(equals([1, 2, 3], [1, 2])).toBe(false);
    expect(equals([1, 2], [1, 2, 3])).toBe(false);
    expect(equals([1, 2, 3], [1, 3, 2])).toBe(false);
  });

  it('should return true for equal objects with different property order', () => {
    expect(equals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });

  it('should return false for equal arrays with different element order', () => {
    expect(equals([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  it('should return true for equal objects with null values', () => {
    expect(equals({ a: null }, { a: null })).toBe(true);
  });

  it('should return true for equal arrays with null values', () => {
    expect(equals([null], [null])).toBe(true);
  });

  it('should return false for different objects with null values', () => {
    expect(equals({ a: null }, { b: null })).toBe(false);
  });

  it('should return false for different arrays with null values', () => {
    expect(equals([null], [undefined])).toBe(false);
  });

  it('should return false for different objects with undefined values', () => {
    expect(equals({ a: undefined }, { b: undefined })).toBe(false);
  });

  it('should return false for different arrays with undefined values', () => {
    expect(equals([undefined], [null])).toBe(false);
  });

  it('should return true for equal objects with nested arrays', () => {
    expect(equals({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBe(true);
  });

  it('should return false for different objects with nested arrays', () => {
    expect(equals({ a: [1, 2, 3] }, { a: [3, 2, 1] })).toBe(false);
  });

  it('should return true for equal arrays with nested objects', () => {
    expect(equals([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
  });

  it('should return false for different arrays with nested objects', () => {
    expect(equals([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])).toBe(false);
  });

  it('should return false for two anonymous functions', () => {
    const f1 = () => undefined;
    const f2 = () => undefined;

    expect(equals(f1, f2)).toBe(false);
  });
});
