type TKey = string | Symbol | number;

class LRUTTLCache<T> {
  private values: Map<TKey, T> = new Map<TKey, T>();

  private timeouts: Map<TKey, NodeJS.Timeout> = new Map();

  constructor(public readonly capacity: number, private readonly ttl: number) {}

  public get(key: TKey): T | undefined {
    const hasKey = this.values.has(key);

    if (hasKey) {
      const entry = this.values.get(key)!;
      this.delete(key);
      this._set(key, entry);

      return entry;
    }

    return undefined;
  }

  public set(key: TKey, value: T) {
    this.delete(key);

    if (this.values.size >= this.capacity) {
      const keysIter = this.values.keys();
      const next = keysIter.next();
      const keyToDelete = next.value;

      this.values.delete(keyToDelete);
    }

    this._set(key, value);
  }

  public delete(key: TKey) {
    if (this.values.has(key)) {
      this.values.delete(key);

      const timeout = this.timeouts.get(key);
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }

  public clear() {
    this.values.clear();
    this.timeouts.forEach((timeout) => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }

  public get size(): number {
    return this.values.size;
  }

  private _set(key: TKey, val: T) {
    this.values.set(key, val);
    const timeout = this.timeouts.get(key);
    if (timeout) {
      clearTimeout(timeout);
    }

    this.timeouts.set(
      key,
      setTimeout(() => {
        this.delete(key);
      }, this.ttl),
    );
  }
}

export default LRUTTLCache;
