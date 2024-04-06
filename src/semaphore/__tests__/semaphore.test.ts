import Semaphore from '../semaphore';

describe('Semaphore', () => {
  let semaphore = new Semaphore(2);

  beforeEach(() => {
    semaphore = new Semaphore(2);
  });

  it('should throw if maxThread is less than 1', () => {
    expect(() => new Semaphore(-1)).toThrow();
  });

  it('should run 2 tasks in parallel', async () => {
    let result = 0;

    const add10 = async () => {
      const release = await semaphore.acquire();
      result += 10;
      release();
    };

    const mul2 = async () => {
      const release = await semaphore.acquire();
      result *= 2;
      release();
    };

    await Promise.all([mul2(), add10()]);

    expect(result).toBe(10);
  });

  it('should at most 2 tasks in parallel', async () => {
    let result = 0;

    const add10 = async () => {
      const release = await semaphore.acquire();
      result += 10;
      release();
    };

    const log = jest.fn();

    const mul2 = async () => {
      const release = await semaphore.acquire();
      result *= 2;
      log();
      release();
    };

    add10();
    const secondTask = add10();
    const thirdTask = mul2();
    await secondTask;

    expect(log).not.toHaveBeenCalled();
    expect(result).toBe(20);

    await thirdTask;

    expect(log).toHaveBeenCalled();
  });

  it('should work with priorities', async () => {
    let result = 0;

    const add = async (priority: number, value: number) => {
      const release = await semaphore.acquire(priority);
      result += value;
      release();
    };

    const mul2 = async (priority: number) => {
      const release = await semaphore.acquire(priority);
      result *= 2;
      release();
    };

    await Promise.all([add(10, 3), add(10, 4), mul2(0)]);

    expect(result).toBe(7);
  });

  it('should cause deadlock', async () => {
    let result = 0;

    const calculate = async () => {
      const release = await semaphore.acquire();
      result += 10;
      if (result < 30) {
        await calculate();
      }

      release();
    };

    const promise = new Promise<void>((resolve, reject) => {
      calculate().then(resolve);
      setTimeout(() => reject(new Error('Timeout')), 1000);
    });

    expect(promise).rejects.toThrow('Timeout');
  });
});
