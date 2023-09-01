type Task = () => Promise<void>;
export const promisePool = (tasks: Task[], parallel: number) => {
  const queue = [...tasks];
  const initial = queue.splice(0, parallel);
  queue.reverse();

  const run = (task: Task): Promise<void> =>
    new Promise<void>(resolve => {
      return task()
        .then(() => {
          if (queue.length) {
            const next = queue.pop()!;
            return run(next);
          }
          return resolve();
        })
        .then(resolve);
    });

  return Promise.all(initial.map(run));
};
