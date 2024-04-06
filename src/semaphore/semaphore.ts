import PriorityQueue from '../priority-queue';

type Release = () => void;

type Task = (release: Release) => void;

/**
 * A semaphore is a synchronization tool limiting access
 * to shared resources for concurrent threads or processes.
 * It maintains a counter, allowing a fixed number of entities
 * to access the resource simultaneously, preventing race conditions.
 *
 * @example
 * const semaphore = new Semaphore(2);
 * async function task1() {
 *   const release = await semaphore.acquire();
 *   // do your stuff. Any other call of `semaphore.aqcuire()`
 *   // syncrhonized between other `semaphore.acquire()` and `release()`
 *   // Number of parallel `semaphore.acquire()` is set in the constructor
 *   // ...
 *   release()
 * }
 * async function task2() {
 *   const releae = await semaphore.acquire();
 *   // "synchronized" code
 *   release()
 * }
 */
class Semaphore {
  constructor(public readonly maxThreads: number = 1) {
    if (maxThreads < 1) {
      throw new Error('maxThreads should be no less than 1');
    }
  }

  private running = 0;

  private queue = new PriorityQueue<Task>();

  /**
   * Aqcuires a "thread" lock.
   * Accepts `priority` for the task. Less priority
   * means earlier run.
   * Returns `release()` function to release the lock.
   */
  public acquire(priority: number = 0): Promise<Release> {
    return new Promise<Release>((resolve) => {
      this.queue.push(resolve, priority);

      Promise.resolve().then(this.runLocks);
    });
  }

  private inc = () => {
    this.running++;
  };

  private dec = () => {
    this.running--;
  };

  private runner = async () => {
    while (this.queue.size && this.running < this.maxThreads) {
      const task = this.queue.pop()!;

      await new Promise<void>((resolve) => {
        this.inc();

        task(() => {
          this.dec();
          resolve();
        });
      });
    }
  };

  private runLocks = async () => {
    await Promise.all(
      new Array(this.maxThreads - this.running).fill(null).map(this.runner)
    );
  };
}

export default Semaphore;
