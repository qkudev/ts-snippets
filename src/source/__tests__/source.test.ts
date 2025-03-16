import Source from '../source';

describe('Source', () => {
  let source: Source<number> = new Source();

  beforeEach(() => {
    source = new Source();
  });

  it('should write data to buffer', () => {
    source.write(1);

    expect((source as TSFixMe).buffer.size).toBe(1);
  });

  it('should have proper buffer length', () => {
    [1, 2, 3].forEach((num) => {
      source.write(num);
    });

    expect(source.buffeSize).toBe(3);
  });

  it('should pull data from buffer', async () => {
    source.write(1);

    const num = await source.pull();

    expect(num).toBe(1);
  });

  it('should pull newly written data', async () => {
    let i = 0;
    const interval = setInterval(() => {
      source.write(i);
      i++;
    }, 100);

    const nums: number[] = [];
    while (i < 3) {
      const num = await source.pull();
      nums.push(num);
    }

    clearInterval(interval);

    expect(nums).toEqual([0, 1, 2]);
  });

  it('should return proper pull queue size', () => {
    [1, 2, 3].forEach(() => {
      source.pull();
    });

    expect(source.pullQeueSize).toBe(3);
  });
});
