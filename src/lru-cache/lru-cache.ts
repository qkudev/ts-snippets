type TKey = string | Symbol | number;

/**
 * Cache with Least recently used strategy
 */
class LRUCache<T> {
  private values: Map<TKey, T> = new Map<TKey, T>();

  constructor(public readonly capacity: number) {}

  public get(key: TKey): T | undefined {
    const hasKey = this.values.has(key);

    if (hasKey) {
      const entry = this.values.get(key)!;
      this.values.delete(key);
      this.values.set(key, entry);

      return entry;
    }

    return undefined;
  }

  public put(key: TKey, value: T) {
    if (this.values.has(key)) {
      this.values.delete(key);
    }

    if (this.values.size >= this.capacity) {
      const keysIter = this.values.keys();
      const next = keysIter.next();
      const keyToDelete = next.value;

      this.values.delete(keyToDelete);
    }

    this.values.set(key, value);
  }
}

export default LRUCache;
