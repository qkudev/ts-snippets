type Key = string | number | Symbol;

class LinkedListNode<T, K extends Key = Key> {
  constructor(
    public readonly key: K,
    public readonly value: T,
    public next: Nullable<LinkedListNode<T, K>> = null,
    public prev: Nullable<LinkedListNode<T, K>> = null
  ) {}
}

/**
 * Cache with limited capacity.
 * Acts like queue, e.g. first-in value will be deleted first
 * if size is exceeding capacity. No matter how many
 * times the value is used.
 */
class FIFOCache<T, K extends Key = Key> {
  private head: Nullable<LinkedListNode<T, K>> = null;

  private tail: Nullable<LinkedListNode<T, K>> = null;

  public size = 0;

  private mapping: Map<K, LinkedListNode<T, K>> = new Map();

  public constructor(public readonly capacity: number) {}

  /**
   * Sets value by key.
   */
  public set(key: K, value: T) {
    if (this.size >= this.capacity) {
      this.deleteFromTail();
    }

    this.insertToHead(key, value);
  }

  /**
   * Gets value by key.
   * `undefined` if no value.
   */
  public get(key: K): T | undefined {
    return this.mapping.get(key)?.value;
  }

  /**
   * Deletes key from cache.
   * Cache's current size is decreased by 1.
   */
  public delete(key: K) {
    if (!this.mapping.has(key)) {
      return;
    }

    const node = this.mapping.get(key)!;
    this.mapping.delete(key);
    node.prev = node.next;
    this.size--;
  }

  /**
   * Returns true if cache has key.
   */
  public has(key: K) {
    return this.mapping.has(key);
  }

  private insertToHead(key: K, value: T) {
    const node = new LinkedListNode(key, value, this.head);

    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    this.size++;
    this.mapping.set(key, node);

    return node;
  }

  private deleteFromTail() {
    if (!this.tail) {
      return;
    }

    const toRemove = this.tail;
    this.mapping.delete(toRemove.key);

    if (this.tail.prev) {
      this.tail.prev.next = null;
    }
    this.tail = this.tail.prev;

    this.size--;
  }
}

export default FIFOCache;
