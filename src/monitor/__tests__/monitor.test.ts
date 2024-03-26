import wait from '../../wait/wait';
import Monitor from '../monitor';

describe('Monitor', () => {
  let monitor = new Monitor();

  beforeEach(() => {
    monitor = new Monitor();
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

    const g1 = monitor.add(f1);
    const g2 = monitor.add(f2);
    await Promise.all([g1(), g2()]);

    expect(result).toBe(20);
  });

  it('should reject inner promise', () => {
    const f = jest.fn().mockImplementation(async () => {
      throw new Error('Error');
    });

    const g = monitor.add(f);

    expect(g()).rejects.toThrow('Error');
  });

  it('should return value from original fn', async () => {
    const f = jest.fn().mockImplementation(async () => {
      await wait(0);

      return 42;
    });

    const g = monitor.add(f);
    const result = await g();

    expect(result).toBe(42);
  });
});
