import ImmutableHelper from '../immutability-helper';

describe('ImmutabilityHelper', () => {
  it('should mutate property and return new obj', () => {
    const obj = {
      a: 1,
    };
    const helper = new ImmutableHelper(obj);
    const nextObj = helper.produce((o) => {
      o.a = 2;
    });

    expect(nextObj).not.toBe(obj);
    expect(nextObj).not.toEqual(obj);
    expect(obj).toEqual({
      a: 1,
    });
    expect(nextObj).toEqual({
      a: 2,
    });
  });

  it('should mutate nested object properly', () => {
    const obj = {
      a: {
        b: 1,
        c: 3,
      },
    };
    const helper = new ImmutableHelper(obj);
    const nextObj = helper.produce((o) => {
      o.a.c = 4;
      o.a.b = o.a.c + o.a.b;
    });

    expect(nextObj.a).not.toBe(obj.a);
    expect(obj.a).toEqual({
      b: 1,
      c: 3,
    });
    expect(nextObj.a).toEqual({
      b: 5,
      c: 4,
    });
  });

  it('should mutate arr correctly', () => {
    const obj = {
      arr: [1, 2, 3],
    };
    const helper = new ImmutableHelper(obj);
    const nextObj = helper.produce((o) => {
      o.arr[0] = 5;
      o.newVal = o.arr[0] + o.arr[1];
    });

    expect(nextObj).not.toBe(obj);
    expect(nextObj.arr).not.toBe(obj.arr);
    expect(nextObj).toEqual({
      arr: [5, 2, 3],
      newVal: 5 + 2,
    });
  });

  it('should produce twice', () => {
    const obj = {
      val: 10,
    };
    const helper = new ImmutableHelper(obj);
    const o1 = helper.produce((o) => {
      o.val += 1;
    });
    const o2 = helper.produce((o) => {
      o.val -= 1;
    });

    expect(o1).not.toBe(obj);
    expect(o2).not.toBe(obj);

    expect(obj).toEqual({
      val: 10,
    });
    expect(o1).toEqual({
      val: 11,
    });
    expect(o2).toEqual({
      val: 9,
    });
  });

  it('should work deep', () => {
    const obj = {
      obj: {
        val: {
          x: 10,
          y: 20,
        },
      },
    };
    const helper = new ImmutableHelper(obj);
    const nextObj = helper.produce((o) => {
      const { val } = o.obj;
      // need to read the `val` prop
      o.obj.val = val;
      const data = o.obj.val;
      const temp = data.x;
      data.x = data.y;
      data.y = temp;
    });

    expect(nextObj).not.toBe(obj);
    expect(nextObj.obj).not.toBe(obj.obj);
    expect(nextObj.obj.val).not.toBe(obj.obj.val);
    expect(nextObj).toEqual({
      obj: {
        val: {
          x: 20,
          y: 10,
        },
      },
    });
  });

  it('should mutate deeply nested array', () => {
    const arr = [[[0]]];
    const helper = new ImmutableHelper(arr);
    const nextArr = helper.produce((o) => {
      o[0][0][0] += 42;
    });

    expect(nextArr).not.toBe(arr);
    expect(nextArr[0]).not.toBe(arr[0]);
    expect(nextArr[0][0]).not.toBe(arr[0][0]);
    expect(nextArr).toEqual([[[42]]]);
  });

  it('should do keys method', () => {
    const obj = {
      x: {
        x: 1,
        y: 2,
      },
    };
    const helper = new ImmutableHelper(obj);
    const nextObj = helper.produce((o) => {
      const { x } = o;
      const keys = Object.keys(x);
      const keysLen = keys.length;
      o.x.y = keysLen;
    });

    expect(nextObj).toEqual({
      x: {
        x: 1,
        y: 2,
      },
    });
  });

  it('should handle many patches', () => {
    const obj = (() => {
      const res: Record<number, number> = {};
      for (let i = 0; i < 10000; i++) {
        res[i] = 0;
      }

      return res;
    })();

    const helper = new ImmutableHelper(obj);

    for (let i = 0; i < 5000; i++) {
      helper.produce((o) => {
        // need to read the prop
        const x = o[9];
        o[9] = x;
      });
    }
  });

  it('should handle nested 2', () => {
    const obj = {
      x: 5,
      y: 12,
      z: {
        z: 1,
        q: 9,
        ar: [1, 2, 3],
      },
    };
    const helper = new ImmutableHelper(obj);
    const next = helper.produce((o) => {
      o.x += o.z.ar[2];
    });

    expect(next).not.toBe(obj);
    expect(next.z).not.toBe(obj.z);
    expect(next).toEqual({
      x: 8,
      y: 12,
      z: {
        z: 1,
        q: 9,
        ar: [1, 2, 3],
      },
    });
  });
});
