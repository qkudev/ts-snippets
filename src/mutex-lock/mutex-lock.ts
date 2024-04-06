import PriorityQueue from '../priority-queue/priority-queue';

type Release = () => void;

type Task = (release: Release) => void;

/**
 * The `MutexLock` class provides a simple and efficient way to control
 * access to a shared resource in a multi-threaded or asynchronous environment.
 * It ensures that only one thread or process can acquire the lock at a time,
 * preventing race conditions and ensuring data integrity.
 * With MutexLock, you can easily synchronize access to critical sections
 * of your code, improving concurrency and preventing conflicts.
 *
 * @example
 * const lock = new MutexLock();
 * async function task1() {
 *   const release = await lock.acquire();
 *   // do your stuff. Any other call of `lock.aqcuire()`
 *   // won't resolve unitl `release()` call
 *   // e.g. any code between `lock.acquire()` and `release()` will be
 *   // syncrhonized between other `lock.acquire()` and `release()`
 *   // ...
 *   release()
 * }
 * async function task2() {
 *   const releae = await lock.acquire();
 *   // "synchronized" code
 *   release()
 * }
 */
class MutexLock {
  private __locked = false;

  private queue = new PriorityQueue<Task>();

  /**
   * Aqcuires a "thread" lock.
   * Accepts `priority` for the task. Less priority
   * means earlier run.
   * Returns `release()` function to release the lock.
   */
  public acquire = (priority = 0) =>
    new Promise<Release>((resolve) => {
      this.queue.push(resolve, priority);
      Promise.resolve().then(this.runLocks);
    });

  public get isLocked() {
    return this.__locked;
  }

  private lock = () => {
    this.__locked = true;
  };

  private release = () => {
    this.__locked = false;
  };

  private runLocks = async () => {
    if (this.queue.isEmpty || this.__locked) {
      return;
    }

    while (this.queue.size) {
      const task = this.queue.pop()!;

      await new Promise<void>((resolve) => {
        this.lock();

        task(() => {
          this.release();
          resolve();
        });
      });
    }
  };
}

export default MutexLock;
