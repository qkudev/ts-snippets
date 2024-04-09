import wait from '../../wait';
import Monitor from '../monitor';

describe('Monitor', () => {
  let monitor = Monitor();

  beforeEach(() => {
    monitor = Monitor();
  });

  it('should wrap two functions and make their calls sequentual', async () => {
    let result = 0;

    const g1 = monitor(async () => {
      result += 10;
    });
    const g2 = monitor(async () => {
      await wait(30);

      result *= 2;
    });
    await Promise.all([g1(), g2()]);

    expect(result).toBe(20);
  });

  it('should reject inner promise', () => {
    const g = monitor(async () => {
      throw new Error('Error');
    });

    expect(g()).rejects.toThrow('Error');
  });

  it('should return value from original fn', async () => {
    const g = monitor(async () => {
      await wait(0);

      return 42;
    });
    const result = await g();

    expect(result).toBe(42);
  });

  it('should use given task priority', async () => {
    let result = 0;

    const g1 = monitor(async () => {
      await wait(10);
      result *= 2;
    }, 10);
    const g2 = monitor(async () => {
      await wait(10);
      result += 10;
    }, 0);

    await Promise.all([g1(), g2(), g2()]);

    expect(result).toBe(40);
  });

  it('should run two tasks in parallel', async () => {
    monitor = Monitor({ parallel: 2 });

    let result = 0;

    const mul2 = monitor(async () => {
      await wait(10);
      result *= 2;
    });
    const add10 = monitor(async () => {
      await wait(10);
      result += 10;
    });

    await Promise.all([mul2(), add10(), mul2()]);

    expect(result).toBe(20);
  });

  it('should lock', () => {
    let result = 0;

    const f1 = monitor(async () => {
      await wait(0);
      result += 10;
    });

    const throws = async () => {
      await wait(1000);
      if (result === 0) {
        throw new Error('Lock success');
      }
    };

    monitor.lock();

    expect(() => Promise.all([f1(), throws()])).rejects.toThrow('Lock success');
  });

  it('should unlock', () => {
    let result = 0;

    const f1 = monitor(async () => {
      await wait(0);
      result += 10;

      return result;
    });

    const throws = async () => {
      await wait(1000);
      if (result === 0) {
        throw new Error('Lock success');
      }
    };

    const unlock = monitor.lock();
    unlock();

    expect(Promise.all([f1(), throws()])).resolves.toEqual([10]);
  });

  it('should lock independently', () => {
    let result = 0;

    const f1 = monitor(async () => {
      await wait(0);
      result += 10;

      return result;
    });

    const throws = async () => {
      await wait(1000);
      if (result === 0) {
        throw new Error('Lock success');
      }
    };

    const unlock1 = monitor.lock();
    unlock1();

    expect(() => Promise.all([f1(), throws()])).rejects.toThrow('Lock success');
  });
});
