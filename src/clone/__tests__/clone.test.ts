import clone from '../clone';

describe('clone', () => {
  it.each([1, '1', undefined, null, Symbol('test'), () => undefined])(
    'should return same value',
    (value: unknown) => {
      const cloned = clone(value);

      expect(cloned).toBe(value);
    }
  );

  it('should return cloned plain object', () => {
    const obj = { a: 1 };

    const cloned = clone(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned).toEqual(obj);
  });

  it('should clone array', () => {
    const arr = [1, 2, 3];

    const cloned = clone(arr);

    expect(cloned).not.toBe(arr);
    expect(cloned).toEqual(arr);
  });

  it('should clone nested object', () => {
    const obj = {
      a: {
        b: {
          c: 3,
        },
      },
    };

    const cloned = clone(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
    expect(cloned).toEqual(obj);
  });

  it('should clone array of objects', () => {
    const arr = [{ a: 1 }, { b: 2 }];

    const cloned = clone(arr);

    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]);
    expect(cloned[1]).not.toBe(arr[1]);
    expect(cloned).toEqual(arr);
  });
});
