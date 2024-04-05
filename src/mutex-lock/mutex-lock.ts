import Queue from '../queue/queue-v2';

type Waiter = () => void;

type Release = () => void;

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
 *   // won't resolve unit `release()` call
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

  private queue = new Queue<Waiter>();

  public acquire = () =>
    new Promise<Release>((resolve) => {
      if (this.__locked) {
        this.queue.push(() => this.lock(resolve));

        return;
      }

      this.lock(resolve);
    });

  public get isLocked() {
    return this.__locked;
  }

  private lock = (handler: (relese: Release) => void) => {
    this.__locked = true;

    handler(this.release);
  };

  private release = () => {
    this.__locked = false;

    if (!this.queue.empty) {
      const waiter = this.queue.pop()!;
      waiter();
    }
  };
}

export default MutexLock;
