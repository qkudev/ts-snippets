import wait from '../../wait';
import IdleQueue from '../idle-queue';

describe('IdleQueue', () => {
  let idle = new IdleQueue();

  beforeEach(() => {
    idle = new IdleQueue();
  });

  it('should not run tasks synchronously', async () => {
    let sum = 0;

    idle.addTask(() => {
      sum += 2;
    });
    idle.addTask(() => {
      sum += 3;
    });

    expect(sum).toEqual(0);

    await wait(0);

    expect(sum).toEqual(5);
  });

  it('should run many tasks', async () => {
    let sum = 0;

    idle.addTask(() => {
      sum += 2;
    });
    idle.addTask(() => {
      sum += 3;
    });

    await wait(0);

    expect(sum).toEqual(5);

    idle.addTask(() => {
      sum += 5;
    });

    await wait(0);

    expect(sum).toEqual(10);
  });

  it('addTask should return promise', async () => {
    let sum = 0;

    await idle.addTask(() => {
      sum += 5;
    });

    expect(sum).toBe(5);
  });

  it('should return value from task', async () => {
    const result = await idle.addTask(() => 42);

    expect(result).toBe(42);
  });
});
