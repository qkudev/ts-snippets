import wait from '../../wait/wait';
import Monitor from '../monitor-v2';

describe('Monitor', () => {
  let monitor = Monitor();

  beforeEach(() => {
    monitor = Monitor();
  });

  it('should wrap two functions and make their calls sequentual', async () => {
    let result = 0;

    const f1 = jest.fn().mockImplementation(async () => {
      result += 10;
    });
    const f2 = jest.fn().mockImplementation(async () => {
      await wait(30);

      result *= 2;
    });

    const g1 = monitor(f1);
    const g2 = monitor(f2);
    await Promise.all([g1(), g2()]);

    expect(result).toBe(20);
  });

  it('should reject inner promise', () => {
    const f = jest.fn().mockImplementation(async () => {
      throw new Error('Error');
    });

    const g = monitor(f);

    expect(g()).rejects.toThrow('Error');
  });

  it('should return value from original fn', async () => {
    const f = jest.fn().mockImplementation(async () => {
      await wait(0);

      return 42;
    });

    const g = monitor(f);
    const result = await g();

    expect(result).toBe(42);
  });

  it('should use given task priority', async () => {
    let result = 0;
    const f1 = jest.fn().mockImplementation(async () => {
      await wait(10);
      result *= 2;
    });
    const f2 = jest.fn().mockImplementation(async () => {
      await wait(10);
      result += 10;
    });

    const g1 = monitor(f1, 10);
    const g2 = monitor(f2, 0);

    await Promise.all([g1(), g2(), g2()]);

    expect(result).toBe(40);
  });
});
