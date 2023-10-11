import Queue from '../queue';

type SyncTask = () => void;
type AsyncTask = () => Promise<void>;
type Task = SyncTask | AsyncTask;

/**
 * Runs given tasks in sequence
 */
class TaskScheduler {
  private readonly queue: Queue<Task> = new Queue<Task>();

  private running = false;

  public add = (...tasks: Task[]) => Promise.all(tasks.map(this.pushToQueue));

  private pushToQueue = (task: Task) => new Promise<void>((resolve) => {
    const wrapped = async () => resolve(await task());
    this.queue.push(wrapped);

    if (!this.running) {
      this.run();
    }
  });

  public clear = () => {
    this.queue.clear();
  };

  private run = async () => {
    this.running = true;
    while (!this.queue.empty) {
      const task = this.queue.pop() as Task;
      await task();
    }
    this.running = false;
  };
}

export default TaskScheduler;
