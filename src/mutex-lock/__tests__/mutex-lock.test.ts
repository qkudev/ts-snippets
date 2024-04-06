import MutexLock from '../mutex-lock';

describe('MutexLock', () => {
  let lock = new MutexLock();

  beforeEach(() => {
    lock = new MutexLock();
  });

  it('should acquire lock', async () => {
    await lock.acquire();

    expect(lock.isLocked).toBe(true);
  });

  it('should unlock', async () => {
    const release = await lock.acquire();

    release();

    expect(lock.isLocked).toBe(false);
  });

  it('should lock other runners', async () => {
    let result = 0;

    async function add10() {
      const release = await lock.acquire();
      result += 10;
      release();
    }

    async function mul2() {
      const release = await lock.acquire();
      result *= 2;
      release();
    }

    // no await for a reason
    add10();
    await mul2();

    expect(result).toBe(20);
  });

  it('should accept priority', async () => {
    let result = 0;

    async function add10() {
      const release = await lock.acquire(0);
      result += 10;
      release();
    }

    async function mul2() {
      const release = await lock.acquire(10);
      result *= 2;
      release();
    }

    await Promise.all([mul2(), add10()]);

    expect(result).toBe(20);
  });

  it('should cause dead lock', async () => {
    const f = jest.fn().mockImplementation((value: number) => value + 10);

    async function add10(n: number) {
      const release = await lock.acquire();
      const result = f(n);
      release();

      return result;
    }

    async function calculate() {
      const release = await lock.acquire();
      let n = 10;
      n = await add10(n);
      release();

      return n;
    }

    const promise = new Promise<number>((resolve, reject) => {
      calculate().then(resolve);
      setTimeout(() => reject(new Error('Timeout')), 1000);
    });

    expect(promise).rejects.toThrow('Timeout');
    expect(f).not.toHaveBeenCalled();
  });
});
