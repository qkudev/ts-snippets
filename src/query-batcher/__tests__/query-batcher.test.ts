import { wait } from '../../wait';
import { QueryBatcher } from '../query-batcher';

describe('QueryBatcher', () => {
  let batchedCallback = jest.fn();
  const timeout = 100;
  let qb = new QueryBatcher(batchedCallback, timeout);

  beforeEach(() => {
    batchedCallback = jest.fn().mockImplementation(val => Promise.resolve(val));
    qb = new QueryBatcher(batchedCallback, timeout);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be defined', () => {
    expect(qb).toBeInstanceOf(QueryBatcher);
  });

  it('should not instantly call the callback ("debounce: true")', () => {
    qb.query(1);

    expect(batchedCallback).toHaveBeenCalledTimes(0);
  });

  it('should batch 3 and 2 queries and call batch fn only twice', async () => {
    qb.query(1);
    qb.query(2);
    qb.query(3);

    await wait(timeout);

    expect(batchedCallback).toHaveBeenCalledWith([1, 2, 3]);

    await Promise.all([wait(timeout), qb.query(4), qb.query(5)]);

    expect(batchedCallback).toHaveBeenCalledWith([4, 5]);
    expect(batchedCallback).toHaveBeenCalledTimes(2);
  });

  it('should handle "debounce: false" option', async () => {
    qb = new QueryBatcher(batchedCallback, timeout, {
      debounce: false,
    });

    qb.query(1);

    await wait(0);
    // no debounce, calls immediately
    expect(batchedCallback).toHaveBeenCalledTimes(1);
    expect(batchedCallback).toHaveBeenCalledWith([1]);

    // next queries will be timed out and batched
    qb.query(2);
    qb.query(3);

    await wait(timeout);

    expect(batchedCallback).toHaveBeenCalledTimes(2);
    expect(batchedCallback).toHaveBeenCalledWith([2, 3]);
  });

  it('should handle "shouldWaitResponse: true" option', async () => {
    batchedCallback = jest
      .fn()
      .mockImplementation(val => wait(1000).then(() => val));
    qb = new QueryBatcher(batchedCallback, timeout, {
      shouldWaitResponse: true,
      debounce: false,
    });

    qb.query(1);

    await wait(timeout);
    const secondTask = qb.query(2);
    // no debounce, calls immediately
    expect(batchedCallback).toHaveBeenCalledTimes(1);
    expect(batchedCallback).toHaveBeenCalledWith([1]);

    await secondTask;

    expect(batchedCallback).toHaveBeenCalledTimes(2);
    expect(batchedCallback).toHaveBeenCalledWith([2]);
  });
});
