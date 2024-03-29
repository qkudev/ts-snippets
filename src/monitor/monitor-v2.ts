import PriorityQueue from '../priority-queue';

type Task<R = void> = () => Promise<R>;

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
const monitor = () => {
  const queue = new PriorityQueue<Task>();

  let running = false;

  const run = async () => {
    if (running) {
      return;
    }

    running = true;

    while (queue.size) {
      const task = queue.pop()!;
      await task();
    }

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
