import wait from '../wait';

type TaskCallback<T> = (result: T) => void;
type Task<ID, Result> = TaskCallback<Result> & {
  id: ID;
};

interface Cache<T> {
  get: (key: any) => T;
  has: (key: any) => boolean;
  set: (key: any, val: T) => void;
  delete: (key: any) => void;
  keys: () => IterableIterator<any>;
}

/**
 * Options for the query batcher with caching.
 *
 * @template T - The type of data returned by the query.
 */
interface Options<T> {
  /**
   * Determines whether the initial query should be debounced. If `false`, the first query will be initiated immediately.
   *
   * @default true
   */
  debounce?: boolean;

  /**
   * Determines whether the next batched query should wait for a response before executing.
   * For example, even if the `ms` parameter is set to 500ms, but the `Task` execution time is 1s,
   * the next batched query will be executed in 1s.
   */
  shouldWaitResponse?: boolean;

  /**
   * The cache to use for storing query results. If `null`, no caching will be used.
   */
  cache?: Cache<T> | null;
}
const defaultOptions: Required<Options<unknown>> = {
  debounce: true,
  shouldWaitResponse: false,
  cache: null,
};

/**
 * Utility class for solving N+1 problem. create the `QueryBatcher` instance and
 * then maker queries using it. Then, for example, if you have 3 requests on one view,
 * it will batch these 3 queries and make only one actual API call.
 * For usage examples, see `__tests__` folder.
 */
class QueryBatcher<ID extends string | number, T> {
  private canCall = true;

  private queue: Task<ID, T>[] = [];

  private options: Required<Options<T>>;

  constructor(
    /**
     * Function that queries multiple entries by their ID array
     */
    private readonly queryMultiple: (payloads: ID[]) => Promise<T[]>,

    /**
     * Milliseconds to wait before next query
     */
    private readonly ms: number,

    options: Options<T> = defaultOptions as Options<T>
  ) {
    this.options = {
      ...(defaultOptions as Required<Options<T>>),
      ...options,
    };
  }

  /**
   * Adds a task to the query batcher and returns a Promise that resolves with the result.
   * @param payload - The query parameters.
   * @returns A Promise that resolves with the query result.
   */
  public query = (payload: ID): Promise<T> =>
    new Promise<T>((resolve) => {
      this.addTask(payload, resolve);
    });

  private addTask = (payload: ID, cb: TaskCallback<T>) => {
    const task: Task<ID, T> = Object.assign(cb, { id: payload });
    this.queue.push(task);

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
    const { cache } = this.options;
    const ids = [...new Set(tasks.map((task) => task.id))];
    const [cachedIds, notCachedIds] = ids.reduce<[ID[], ID[]]>(
      (acc, id) => {
        const group = cache?.has(id) ? acc[0] : acc[1];
        group.push(id);

        return acc;
      },
      [[], []]
    );

    const resultMap: Record<ID, T> = {} as Record<ID, T>;
    const query = this.queryMultiple(notCachedIds).then((result) => {
      notCachedIds.forEach((id, i) => {
        resultMap[id] = result[i];

        if (cache) {
          cache.set(id, result[i]);
        }
      });

      cachedIds.forEach((id) => {
        resultMap[id] = this.options.cache!.get(id);
      });

      // Make sure that tasks are called in the same order as they were added
      tasks.forEach((task) => {
        task(resultMap[task.id]);
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
