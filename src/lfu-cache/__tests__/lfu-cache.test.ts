import LFUCache from '../lfu-cache';

describe('LFUCache', () => {
  it('should return undefined for non-existent keys', () => {
    const cache = new LFUCache<string>(2);
    expect(cache.get(1)).toBeUndefined();
  });

  it('should return the value for an existing key', () => {
    const cache = new LFUCache<string>(2);
    cache.put(1, 'one');
    expect(cache.get(1)).toBe('one');
  });

  it('should return undefined for evicted keys', () => {
    const cache = new LFUCache<string>(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.put(3, 'three');
    expect(cache.get(1)).toBeUndefined();
  });

  it('should update the value for an existing key', () => {
    const cache = new LFUCache<string>(2);
    cache.put(1, 'one');
    cache.put(1, 'new one');
    expect(cache.get(1)).toBe('new one');
  });

  it('should evict the least frequently used key when capacity is exceeded', () => {
    const cache = new LFUCache<string>(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.get(1);
    cache.put(3, 'three');
    expect(cache.get(2)).toBeUndefined();
  });
});
