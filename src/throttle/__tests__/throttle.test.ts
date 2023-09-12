import { wait } from '../../wait';
import { throttle } from '../throttle';

describe('throttle', () => {
  const ms = 50;
  let f = jest.fn();
  let throttled = throttle(f, ms);

  beforeEach(() => {
    throttled = throttle(f, ms);
    f.mockReset();
    jest.clearAllTimers();
  });

  it('should call original first time as normal fn', () => {
    throttled(1);

    expect(f).toHaveBeenCalledTimes(1);
  });

  it('should call fn after throttle ms with last arg', async () => {
    throttled(1);
    throttled(2);
    throttled(3);
    await wait(ms);

    expect(f).toHaveBeenCalledTimes(2);
    expect(f).toHaveBeenNthCalledWith(1, 1);
    expect(f).toHaveBeenNthCalledWith(2, 3);
  });

  it('should call instantly after throttle ms', async () => {
    throttled(1);
    await wait(ms);
    throttled(2);

    expect(f).toHaveBeenCalledTimes(2);
    expect(f).toHaveBeenNthCalledWith(1, 1);
    expect(f).toHaveBeenNthCalledWith(2, 2);
  });
});
