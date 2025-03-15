import Queue from '../queue';

type SyncTask = () => void;
type AsyncTask = () => Promise<void>;
type Task = SyncTask | AsyncTask;

/**
 * Runs given tasks in sequence
 */
class Runner {
  private readonly queue: Queue<Task> = new Queue<Task>();

  public running = false;

  constructor(public readonly id: number) {}

  public get size() {
    return this.queue.size;
  }

  public add = (...tasks: Task[]) => Promise.all(tasks.map(this._pushToQueue));

  private _pushToQueue = (task: Task) =>
    new Promise<void>((resolve) => {
      const wrapped = async () => resolve(await task());
      this.queue.enqueue(wrapped);

      if (!this.running) {
        this.run();
      }
    });

  public clear = () => {
    this.queue.clear();
  };

  private run = async () => {
    this.running = true;
    while (!this.queue.isEmpty) {
      const task = this.queue.dequeue()!;
      await task();
    }
    this.running = false;
  };
}

/**
 * Runs given tasks in sequence
 */
class TaskScheduler {
  private readonly queue: Queue<Task> = new Queue<Task>();

  private running = false;

  private runners: Runner[] = [];

  private idx = 0;

  constructor(parallel: number = 1) {
    for (let i = 0; i < parallel; i++) {
      this.runners.push(new Runner(i));
    }
  }

  public add = (...tasks: Task[]) => Promise.all(tasks.map(this._pushToQueue));

  private _pushToQueue = (task: Task) =>
    new Promise<void>((resolve) => {
      const wrapped = async () => resolve(await task());
      Object.defineProperty(wrapped, 'id', {
        value: this.idx++,
      });
      this.queue.enqueue(wrapped);

      if (!this.running) {
        this.run();
      }
    });

  public clear = () => {
    this.queue.clear();
  };

  private getRunner = () =>
    [...this.runners].sort((a, b) => a.size - b.size)[0]!;

  private run = async () => {
    this.running = true;
    const promises: Promise<any>[] = [];
    while (!this.queue.isEmpty) {
      const task = this.queue.dequeue()!;
      const runner = this.getRunner();
      promises.push(runner.add(task));
    }
    this.running = false;
  };
}

export default TaskScheduler;
