import PriorityQueue from '../priority-queue';

type Task<R = void> = () => Promise<R>;

interface MonitorOptions {
  /**
   * Max parallel calls running.
   * @default 1
   */
  parallel?: number;
}

/**
 * A function that accepts any function and priority (number, optional)
 * and returns wrapped function that will never be called parallel
 * with other wrapped functions.
 * Priority works like this: if N wrapped functions were called
 * in the same time, all of them will be called consequently and
 * with order "less is better".
 *
 * @example
 * let result = 0;
 * const f1 = monitor(async () => {
 *   await wait(10);
 *   result *= 2;
 * }, 10);
 *
 * const f2 = monitor(async () => {
 *   await wait(10);
 *   result += 10;
 * }, 0);
 *
 * await Promise.all([f1(), f2(), f2()]);
 *
 * console.log(result)   // 40
 */
const monitor = (options: MonitorOptions = {}) => {
  const parallel = options.parallel ?? 1;

  if (parallel < 1) {
    throw new Error('Number of parallel tasks less than 1');
  }

  const queue = new PriorityQueue<Task>();
  async function runner(): Promise<void> {
    while (queue.size) {
      const task = queue.pop() as Task;
      await task();
    }
  }

  let running = false;

  const run = async () => {
    if (running) {
      return;
    }

    running = true;
    const runners = new Array(parallel).fill(0).map(runner);
    await Promise.all(runners);
    running = false;
  };

  const registerTask = (task: Task, priority: number) => {
    queue.push(task, priority);
    Promise.resolve().then(run);
  };

  return <F extends (...args: any[]) => any>(fn: F, priority: number = 0) =>
    (...args: Parameters<typeof fn>) =>
      new Promise((resolve, reject) => {
        const task = async () => {
          try {
            resolve(await fn(...args));
          } catch (error) {
            reject(error);
          }
        };

        registerTask(task, priority);
      });
};

export default monitor;
