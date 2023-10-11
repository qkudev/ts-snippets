type Task = () => Promise<void>;

/**
 * Runs an array of tasks in parallel with a maximum number of tasks running at the same time.
 * @param tasks An array of functions that return a Promise.
 * @param parallel The maximum number of tasks to run at the same time.
 * @returns A Promise that resolves when all tasks have completed.
 */
const promisePool = (tasks: Task[], parallel: number) => {
  const queue = [...tasks];
  queue.reverse();

  const runner = async (): Promise<void> => {
    if (!queue.length) {
      return Promise.resolve();
    }

    const task = queue.pop() as Task;
    await task();

    return runner();
  };

  return Promise.all(new Array(parallel).fill(null).map(runner));
};

export default promisePool;
