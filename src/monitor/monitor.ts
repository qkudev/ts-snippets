import PriorityQueue from '../priority-queue';

type Task<R = void> = () => Promise<R>;

interface MonitorOptions {
  /**
   * Max parallel calls running.
   * @default 1
   */
  parallel?: number;
}

type Unlock = () => void;

interface Monitor {
  <F extends (...args: any[]) => any>(
    fn: F,
    priority?: number
  ): (...args: Parameters<typeof fn>) => Promise<ReturnType<typeof fn>>;

  /**
   * Stops function calls until `Unlock` is called.
   * All queued calls will sleep too.
   *
   * @example
   * const f = monitor(async () => {
   *   // ... some stuff
   * })
   * const unlock = monitor.lock()
   *
   * f()         // "sleeps" until `unlock` is called
   *
   * // ...later
   *
   * unlock()    // now `f` actually runs
   *
   */
  lock: () => Unlock;
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
const monitor = (options: MonitorOptions = {}): Monitor => {
  const parallel = options.parallel ?? 1;
  const lockPromises: Promise<void>[] = [];

  if (parallel < 1) {
    throw new Error('Number of parallel tasks less than 1');
  }

  const queue = new PriorityQueue<Task>();
  async function runner(): Promise<void> {
    while (queue.size) {
      await Promise.all(lockPromises);
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

  const call =
    <F extends (...args: any[]) => any>(fn: F, priority: number = 0) =>
    (...args: Parameters<typeof fn>) =>
      new Promise<ReturnType<typeof fn>>((resolve, reject) => {
        const task = async () => {
          try {
            resolve(await fn(...args));
          } catch (error) {
            reject(error);
          }
        };

        registerTask(task, priority);
      });

  call.lock = (): Unlock => {
    let unlock: Unlock;
    const lockPromise = new Promise<void>((resolve) => {
      unlock = resolve;
    });

    lockPromises.push(lockPromise);

    return () => unlock();
  };

  return call as Monitor;
};

export default monitor;
