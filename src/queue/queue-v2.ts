import LinkedList from '../linked-list/doubly-linked-list';

/**
 * Queue-ordered container.
 */
class Queue<T> {
  private list = new LinkedList<T>();

  /**
   * Returns new `Queue` created from given iterable.
   */
  public static from<V>(iterable: Iterable<V>) {
    return new Queue<V>(iterable);
  }

  /**
   * Creates queue. Optional "iterable" arg will be used for initial state.
   */
  public constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const el of iterable) {
        this.enqueue(el);
      }
    }
  }

  /**
   * Adds given item to the end of queue.
   * O(1) time complexity for 1 element insertion.
   */
  public enqueue(...items: T[]): void {
    for (const value of items) {
      this.list.insertIntoTail(value);
    }
  }

  /**
   * Removes item from start of the queue and returns it.
   * O(1) time complexity.
   */
  public dequeue(): T | undefined {
    return this.list.shift();
  }

  /**
   * Removes item from start of the queue. Will not remove it from the state.
   * O(1) time complexity.
   */
  public peek(): T | undefined {
    return this.list.peekHead();
  }

  /**
   * Returns element by given index.
   * `O(n)` time complexity.
   */
  public at(index: number): T | undefined {
    if (index < 0) {
      throw new Error('Index is lower than 0');
    }

    return this.list.at(index);
  }

  /**
   * Drops current state.
   * O(1) time complexity.
   */
  public clear(): void {
    this.list.clear();
  }

  /**
   * Returns iterator for the state.
   */
  public [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }

  /**
   * Number of items.
   * O(1) time complexity.
   */
  public get size(): number {
    return this.list.size;
  }

  /**
   * Is the state empty.
   * O(1) time complexity.
   */
  public get isEmpty(): boolean {
    return !this.size;
  }
}

export default Queue;
