class ListNode<T> {
  constructor(
    public readonly value: T,
    public next: ListNode<T> | null = null,
    public prev: ListNode<T> | null = null
  ) {}
}

/**
 * Queue-ordered container.
 */
class Queue<T> {
  private head: ListNode<T> | null = null;

  private tail: ListNode<T> | null = null;

  private _size = 0;

  /**
   * Returns new `Queue` created from given iterable.
   */
  public static readonly from = <V>(iterable: Iterable<V>) =>
    new Queue<V>(iterable);

  /**
   * Creates queue. Optional "iterable" arg will be used for initial state.
   */
  public constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const el of iterable) {
        this.push(el);
      }
    }
  }

  /**
   * Adds given item to the end of queue.
   * O(1) time complexity for 1 element insertion.
   */
  public readonly push = (...items: T[]): void => {
    for (const value of items) {
      this.insertIntoTail(value);
    }
  };

  /**
   * Removes item from start of the queue and returns it.
   * O(1) time complexity.
   */
  public readonly pop = (): T | undefined => {
    if (!this.head) {
      return undefined;
    }

    const node = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head!.prev = null;
    }
    this._size--;

    return node.value;
  };

  /**
   * Removes item from start of the queue. Will not remove it from the state.
   * O(1) time complexity.
   */
  public readonly peek = (): T | undefined => this.head?.value;

  /**
   * Returns element by given index.
   * `O(n)` time complexity.
   */
  public readonly at = (index: number): T | undefined => {
    if (index < 0) {
      throw new Error('Index is lower than 0');
    }

    let i = 0;
    let node = this.head;
    while (node && i < index) {
      node = node.next;
      i++;
    }

    return node?.value;
  };

  /**
   * Drops current state.
   * O(1) time complexity.
   */
  public readonly clear = (): void => {
    this.head = null;
    this.tail = null;
    this._size = 0;
  };

  /**
   * Returns iterator for the state.
   */
  public *[Symbol.iterator](): Iterator<T> {
    let node = this.head;

    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * Number of items.
   * O(1) time complexity.
   */
  public get size(): number {
    return this._size;
  }

  /**
   * Is the state empty.
   * O(1) time complexity.
   */
  public get empty(): boolean {
    return !this.size;
  }

  private insertIntoTail(value: T) {
    this.tail = new ListNode<T>(value, null, this.tail);
    if (this.tail.prev) {
      this.tail.prev.next = this.tail;
    }
    this._size++;

    if (!this.head) {
      this.head = this.tail;
    }
  }
}

export default Queue;
