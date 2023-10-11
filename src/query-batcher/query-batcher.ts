import wait from '../wait';

type TaskCallback<Result> = (result: Result) => void;
type Task<Payload, Result> = [Payload, TaskCallback<Result>];

interface Options {
  /**
   * Should the initial query be debounced. If `false`, first query will be initiated immediately
   *
   * @default true
   */
  debounce?: boolean;

  /**
   * Should wait response before start next batch.
   * E.g. even if `ms` param is 500ms, but `Task` exec time is 1s, next batched query will
   * be executed in 1s.
   */
  shouldWaitResponse?: boolean;
}
const defaultOptions: Required<Options> = {
  debounce: true,
  shouldWaitResponse: false,
};

/**
 * Utility class for solving N+1 problem. create the `QueryBatcher` instance and
 * then maker queries using it. Then, for example, if you have 3 requests on one view,
 * it will batch these 3 queries and make only one actual API call.
 * For usage examples, see `__tests__` folder.
 */
class QueryBatcher<Param, Result> {
  private canCall = true;

  private queue: Task<Param, Result>[] = [];

  private options: Required<Options>;

  constructor(
    /**
     * Function that queries multiple entries by their ID array
     */
    private readonly queryMultiple: (payloads: Param[]) => Promise<Result[]>,

    /**
     * Milliseconds to wait before next query
     */
    private readonly ms: number,

    options: Options = defaultOptions,
  ) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  /**
   * Adds a task to the query batcher and returns a Promise that resolves with the result.
   * @param payload - The query parameters.
   * @returns A Promise that resolves with the query result.
   */
  public query = (payload: Param): Promise<Result> => new Promise<Result>((resolve) => {
    this.addTask(payload, resolve);
  });

  private addTask = (payload: Param, cb: TaskCallback<Result>) => {
    this.queue.push([payload, cb]);

    // Do not make it zalgo
    setTimeout(this.run, this.ms * +this.options.debounce);
  };

  private run = async () => {
    if (!this.queue.length || !this.canCall) {
      return;
    }

    this.canCall = false;
    const tasks = [...this.queue];
    this.queue = [];
    const payloads = tasks.map(([payload]) => payload);
    const query = this.queryMultiple(payloads).then((result) => {
      tasks.forEach(([, cb], i) => {
        cb(result[i]);
      });
    });

    const promises = [wait(this.ms)];
    if (this.options.shouldWaitResponse) {
      promises.push(query);
    }

    await Promise.all(promises);

    this.canCall = true;
    this.run();
  };
}

export default QueryBatcher;