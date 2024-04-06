import merge from '../merge';

describe('merge', () => {
  it('should merge two plain objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };

    const result = merge(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should merge two nested objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = {
      foo: {
        bar: 'buzz',
      },
    };

    const result = merge(obj1, obj2);

    expect(result).toEqual({
      a: 1,
      b: {
        c: 2,
      },
      foo: {
        bar: 'buzz',
      },
    });
  });

  it('should overwrite property', () => {
    const obj1 = {
      a: {
        b: 2,
      },
    };
    const obj2 = {
      a: {
        b: 3,
        c: 4,
      },
    };

    const result = merge(obj1, obj2);

    expect(result).toEqual({
      a: {
        b: 3,
        c: 4,
      },
    });
  });

  it('should handle null arg', () => {
    const obj1 = null;
    const obj2 = { a: 1 };

    const result = merge(obj1, obj2);

    expect(result).toEqual({ a: 1 });
  });

  it('should deep merge arrays of objects', () => {
    const arr1 = [{ a: 1, b: 3 }];
    const arr2 = [{ a: 2, c: 4 }];

    const result = merge(arr1, arr2);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        a: 2,
        b: 3,
        c: 4,
      },
    ]);
  });
});
