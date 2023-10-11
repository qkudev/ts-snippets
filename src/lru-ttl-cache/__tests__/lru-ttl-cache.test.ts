import wait from '../../wait';
import LRUTTLCache from '../lru-ttl-cache';

describe('LRUCache', () => {
  const ttl = 100;

  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('works', () => {
    const cache = new LRUTTLCache(2, ttl);

    expect(cache.capacity).toEqual(2);
    expect(cache.get('2')).toEqual(undefined);

    cache.set('2', 6);
    cache.get('1');
    cache.set('1', 5);
    cache.set('1', 2);
    expect(cache.get('1')).toEqual(2);
    expect(cache.get('2')).toEqual(6);
  });

  it('will drop value out by capacity', () => {
    const cache = new LRUTTLCache<number>(2, ttl);
    cache.set('2', 6);
    cache.set('1', 5);
    cache.set('3', 2);

    expect(cache.get('3')).toEqual(2);
    expect(cache.get('1')).toEqual(5);
    expect(cache.get('2')).toEqual(undefined);
  });

  it('should be empty after ttl', async () => {
    const cache = new LRUTTLCache<number>(2, ttl);
    cache.set('2', 6);
    cache.set('1', 5);
    cache.set('3', 2);

    await wait(ttl);

    expect(cache.size).toEqual(0);

    cache.set('2', 3);
    cache.set('1', 1);
    expect(cache.get('2')).toEqual(3);
    expect(cache.get('1')).toEqual(1);
  });
});
