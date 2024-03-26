import Queue from '../queue';

type Task<R = void> = () => Promise<R>;

/**
 * Influenced by Java's monitors.
 * The idea is that `Monitor` as an instance that can wrap given
 * functions with `add` method. Wrapped function calls will
 * not be executed in parallel.
 *
 * @example
 * const monitor = new Monitor()
 * let result = 0
 * const f1 = async () => {
 *  await wait(100)
 *  result += 10;
 * }
 * const f2 = async () => {
 *   await wait(10);
 *   result *= 2
 * }
 * const g1 = monitor.add(g1)
 * const g2 = monitor.add(g2)
 *
 * await Promise.all([g1(), g2()])
 *
 * console.log(result) // 20
 */
class Monitor {
  private readonly queue: Queue<Task> = new Queue<Task>();

  private running = false;

  private runTask = (...tasks: Task[]) =>
    Promise.all(tasks.map(this.pushToQueue));

  private pushToQueue = <R>(task: Task<R>) =>
    new Promise<R>((resolve, reject) => {
      const wrapped: Task<void> = async () =>
        task().then(resolve).catch(reject);
      this.queue.push(wrapped);

      this.run();
    });

  private run = async () => {
    if (this.running) {
      return;
    }

    this.running = true;

    while (!this.queue.empty) {
      const task = this.queue.pop() as Task;
      await task();
    }

    this.running = false;
  };

  public add<F extends (...args: any[]) => Promise<any>>(fn: F) {
    return (...args: Parameters<typeof fn>) =>
      new Promise((resolve, reject) => {
        this.runTask(() => fn(...args))
          .then(resolve)
          .catch(reject);
      });
  }
}

export default Monitor;
