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
});
