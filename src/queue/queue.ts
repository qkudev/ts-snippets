// should use array-based stack because of `.at()` O(1)
import Stack from '../stack/stack';

/**
 * Queue-ordered container.
 */
class Queue<T> {
  // Using 2 stack to get amortized O(n) for n operations of push/pop
  private in = new Stack<T>();

  private out = new Stack<T>();

  public static readonly from = <V>(iterable: Iterable<V>) =>
    new Queue<V>(iterable);

  /**
   * Creates queue. Optional "iterable" arg will be used for initial state
   */
  public constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const el of iterable) {
        this.enqueue(el);
      }
    }
  }

  /**
   * Adds given item to the end of queue
   */
  public readonly enqueue = (...items: T[]): void => {
    this.in.push(...items);
  };

  /**
   * Removes item from start of the queue and returns it
   */
  public readonly dequeue = (): T | undefined => {
    if (this.out.size) {
      return this.out.pop();
    }

    while (this.in.size) {
      this.out.push(this.in.pop()!);
    }

    return this.out.pop();
  };

  /**
   * Removes item from start of the queue. Will not remove it from the state
   */
  public readonly peek = (): T | undefined => {
    if (this.out.size) {
      return this.out.at(this.out.size - 1)!;
    }

    return this.in.at(0);
  };

  /**
   * Returns element by given index
   */
  public readonly at = (index: number): T | undefined => {
    if (index < 0) {
      throw new Error('Index is lower than 0');
    }

    if (this.size < index) {
      return undefined;
    }

    if (!this.out.empty && index < this.out.size) {
      return this.out.at(this.out.size - 1 - index);
    }

    return this.in.at(index - this.out.size);
  };

  /**
   * Drops current state
   */
  public readonly clear = (): void => {
    this.in = new Stack<T>();
    this.out = new Stack<T>();
  };

  /**
   * Returns iterator for the state
   */
  public *[Symbol.iterator](): Iterator<T> {
    const copy: T[] = [];

    for (let i = 0; i < this.size; i++) {
      copy.push(this.at(i) as T);
    }

    for (let i = 0; i < this.size; i++) {
      yield copy[i];
    }
  }

  /**
   * Number of items
   */
  public get size(): number {
    return this.in.size + this.out.size;
  }

  /**
   * Is the state empty
   */
  public get empty(): boolean {
    return !this.size;
  }
}

export default Queue;
