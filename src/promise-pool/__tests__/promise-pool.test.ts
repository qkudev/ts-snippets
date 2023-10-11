import promisePool from '../promise-pool';

const wait = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

type Task = () => Promise<void>;

describe('promisePool', () => {
  it('should execute all tasks in parallel', async () => {
    const result: number[] = [];
    const tasks = [
      async () => {
        await wait(100);
        result.push(1);
      },
      async () => {
        await wait(50);
        result.push(2);
      },
      async () => {
        await wait(10);
        result.push(3);
      },
    ];

    const parallel = 3;
    await promisePool(tasks, parallel);

    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it('should execute all tasks in series if parallel is 1', async () => {
    const result: number[] = [];
    const tasks = [
      async () => {
        await wait(100);
        result.push(1);
      },
      async () => {
        await wait(50);
        result.push(2);
      },
      async () => {
        await wait(10);
        result.push(3);
      },
    ];

    const parallel = 1;

    await promisePool(tasks, parallel);

    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it('should return an empty array if tasks is empty', async () => {
    const tasks: Task[] = [];
    const parallel = 3;

    expect(promisePool(tasks, parallel)).resolves.toEqual([]);
  });
});
