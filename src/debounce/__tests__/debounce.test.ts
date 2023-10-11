import wait from '../../wait';
import debounce from '../debounce';

describe('debounce', () => {
  const ms = 100;
  const f = jest.fn();
  let debounced = debounce(f, ms);

  beforeEach(async () => {
    debounced.clear();
    jest.clearAllTimers();
    f.mockReset();
    debounced = debounce(f, ms);
    await wait(ms);
  });

  it('should not call instantly', () => {
    debounced(1);
    expect(f).toHaveBeenCalledTimes(0);
  });

  it('should call fn after given ms', async () => {
    debounced(1);
    await wait(ms);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(1);
  });

  it('should call once wth latest args (debounced)', async () => {
    debounced(1);
    debounced(2);
    debounced(3);
    debounced(4);

    await wait(ms);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(4);
  });
});
