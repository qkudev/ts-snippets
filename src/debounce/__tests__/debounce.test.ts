import { debounce } from '../debounce';

describe('debounce', () => {
  const ms = 100;
  let f = jest.fn();
  let debounced = debounce(f, ms);
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    console.log('3');
    debounced(1);
    debounced(2);
    debounced(3);
    debounced(4);

    await wait(ms);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(4);
  });
});
