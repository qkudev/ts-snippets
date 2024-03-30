import promisify from '../promisify';

type Callback<R = void> = (err: unknown, result: R) => void;

describe('promisify', () => {
  it('should promisify function with callback', async () => {
    const f = (cb: Callback<number>) => {
      setTimeout(() => {
        cb(undefined, 42);
      }, 0);
    };

    const promisified = promisify(f);

    expect(await promisified()).toBe(42);
  });

  it('should promisify function with argument', async () => {
    const f = (n: number, cb: Callback<number>) => {
      setTimeout(() => {
        cb(undefined, n);
      }, 0);
    };

    const promisified = promisify(f);

    expect(await promisified(1)).toBe(1);
  });

  it('should promisify function of two arguments', async () => {
    const f = (a: number, b: number, cb: Callback<number>) => {
      setTimeout(() => {
        cb(undefined, a + b);
      }, 0);
    };

    const promisified = promisify(f);

    expect(await promisified(1, 2)).toBe(3);
  });

  it('should throw error', () => {
    const f = (cb: Callback) => {
      setTimeout(() => {
        cb(new Error('test'));
      }, 0);
    };

    const promisified = promisify(f);

    expect(() => promisified()).rejects.toThrow('test');
  });
});
