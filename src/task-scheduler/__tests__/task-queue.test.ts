import { wait } from '../../wait';
import { TaskScheduler } from '../task-scheduler';

jest.setTimeout(20000);

describe('TaskQueue', () => {
  it('should run tasks sequentually', async () => {
    let i = 1;
    const createTask = (ms: number) => {
      const idx = i++;
      return async (): Promise<number> => {
        console.log('started ', idx);
        await wait(ms);
        return idx;
      };
    };

    const taskQueue = new TaskScheduler();
    let j = 1;
    const logComplete: any = ([i]: number[]) => {
      expect(i).toEqual(j);
      j++;
    };
    taskQueue.add(createTask(2000)).then(logComplete);
    taskQueue.add(createTask(3000)).then(logComplete);
    taskQueue.add(createTask(2000)).then(logComplete);
    await wait(4000);

    taskQueue.add(createTask(3000)).then(logComplete);
    await wait(10000);
    expect(true).toBe(true);
  });

  it('should add many tasks at a time and resolve it as one promise', async () => {
    let i = 1;
    const createTask = (ms: number) => {
      const idx = i++;
      return async (): Promise<number> => {
        console.log('started ', idx);
        await wait(ms);
        return idx;
      };
    };

    const taskQueue = new TaskScheduler();
    const logComplete: any = (result: number[]) => {
      expect(result).toEqual([1, 2, 3]);
    };
    await taskQueue
      .add(createTask(2000), createTask(2000), createTask(2000))
      .then(logComplete);
  });
});
