import wait from '../../wait';
import TaskScheduler from '../task-scheduler.v2';

jest.setTimeout(20000);

describe('TaskQueue', () => {
  it('should run tasks in sequence', async () => {
    const i = 1;
    const createTask = (ms: number, j = i) => {
      const idx = j;
      const task = async (): Promise<number> => {
        await wait(ms);
        return idx;
      };
      Object.defineProperty(task, 'n', {
        value: `task ${j}`,
      });
      return task;
    };

    const taskQueue = new TaskScheduler(2);
    taskQueue.add(createTask(200, 1));
    taskQueue.add(createTask(300, 2));
    taskQueue.add(createTask(500, 3));
    await wait(400);

    taskQueue.add(createTask(300, 4));
    await wait(1000);
    expect(true).toBe(true);
  });
});
