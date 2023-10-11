import memoize from '../memoize';

describe('memoize', () => {
  it('should call original fn only once', () => {
    const fn = jest.fn();

    const memoized = memoize(fn);

    memoized(1);
    memoized(1);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call original fn only one for mixed args', () => {
    const fn = jest.fn();
    const memoized = memoize(fn);
    const args = [[1, 2, 3], { foo: 'bar' }, 'buzz'];

    memoized(...args);
    memoized(...args);

    expect(fn).toHaveBeenCalledWith(...args);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call original fn twice even if args are equal', () => {
    const fn = jest.fn();
    const memoized = memoize(fn);

    memoized({ a: 1 });
    memoized({ a: 1 });

    expect(fn).toHaveBeenCalledWith({ a: 1 });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should work with promises', async () => {
    const calcMock = jest.fn();
    const fn = jest.fn().mockImplementation(async () => {
      calcMock();

      return Math.random();
    });

    const memoized = memoize(fn);

    const res1 = await memoized(1);
    const res2 = await memoized(1);

    expect(calcMock).toHaveBeenCalledTimes(1);
    expect(res1).toEqual(res2);
  });

  it('should reset cache with method', () => {
    const fn = jest.fn();
    const memoized = memoize(fn);
    const arg = { a: 1 };

    memoized(arg);
    memoized.reset();
    memoized(arg);

    expect(fn).toHaveBeenCalledWith(arg);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
