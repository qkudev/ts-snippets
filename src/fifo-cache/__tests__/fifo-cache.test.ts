import FIFOCache from '../fifo-cache';

describe('FIFOCache', () => {
  let cache = new FIFOCache(3);

  beforeEach(() => {
    cache = new FIFOCache(3);
  });

  it('should be defined', () => {
    expect(cache).toBeDefined();
  });

  it('should set and get key', () => {
    cache.set('a', 1);

    expect(cache.get('a')).toBe(1);
    expect(cache.size).toBe(1);
  });

  it('should set max capacity keys', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    for (const [key, value] of [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]) {
      expect(cache.get(key)).toBe(value);
      expect(cache.has(key)).toBe(Boolean(value));
    }

    expect(cache.size).toBe(3);
  });

  it('should exceed capacity correctly', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    cache.set('d', 4);

    for (const [key, value] of [
      ['a', undefined],
      ['b', 2],
      ['c', 3],
      ['d', 4],
    ] as [string, number | undefined][]) {
      expect(cache.get(key)).toBe(value);
      expect(cache.has(key)).toBe(Boolean(value));
    }

    expect(cache.size).toBe(3);
  });

  it('should delete by key', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    cache.delete('b');
    cache.set('d', 4);

    for (const [key, value] of [
      ['a', 1],
      ['b', undefined],
      ['c', 3],
      ['d', 4],
    ] as const) {
      expect(cache.get(key)).toBe(value);
    }

    expect(cache.size).toBe(3);
  });
});
