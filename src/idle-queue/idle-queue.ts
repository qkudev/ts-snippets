import Queue from '../queue';

/**
 * A function with 0 arguments
 */
type Task<R = void> = (() => R) | (() => Promise<R>);

/**
 * Manages a queue of tasks to be executed asynchronously when the browser is idle.
 */
class IdleQueue {
  private queue = new Queue<Task>();

  private plannedTask = false;

  public constructor(private readonly timeout: number = 0) {}

  /**
   * Adds given task to the queue. Returns `Promise` that
   * fulfills when the task will be completed.
   * If the task returns anything, promise will be fulfilled with
   * result of the task.
   */
  public addTask<R = void>(task: Task<R>): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await task());
        } catch (error) {
          reject(error);
        }
      });

      this.requestRun();
    });
  }

  public clear() {
    this.queue.clear();
  }

  private requestRun = () => {
    if (this.plannedTask) {
      return;
    }

    this.plannedTask = true;
    this.requestIdleCallback(this.run);
  };

  private run = async () => {
    while (!this.queue.empty) {
      const task = this.queue.pop()!;
      await task();
    }

    this.plannedTask = false;
  };

  private requestIdleCallback = (cb: () => void) => {
    if (typeof requestIdleCallback === 'function') {
      return requestIdleCallback(cb, { timeout: this.timeout });
    }

    return setTimeout(cb, this.timeout);
  };
}

export default IdleQueue;
