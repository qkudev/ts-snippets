import LRUCache from '../lru-v2';

describe('LRUCache', () => {
  it('works', () => {
    const cache = new LRUCache(2);

    expect(cache.capacity).toEqual(2);
    expect(cache.get('2')).toEqual(undefined);

    cache.put('2', 6);
    cache.get('1');
    cache.put('1', 5);
    cache.put('1', 2);
    expect(cache.get('1')).toEqual(2);
    expect(cache.get('2')).toEqual(6);
  });

  it('will drop value out by capacity', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('2', 6);
    cache.put('1', 5);
    cache.put('3', 2);

    expect(cache.get('3')).toEqual(2);
    expect(cache.get('1')).toEqual(5);
    expect(cache.get('2')).toEqual(undefined);
  });
});
