import LinkedList from '../linked-list/doubly-linked-list';

/**
 * Stack-ordered container
 */
class Stack<T> {
  private list = new LinkedList<T>();

  /**
   * Creates stack from given iterable
   */
  public static from<V>(iterable: Iterable<V>) {
    return new Stack<V>(iterable);
  }

  /**
   * Creates stack. Optional "iterable" arg will be used for initial state
   */
  public constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const el of iterable) {
        this.push(el);
      }
    }
  }

  /**
   * Adds given item to the top of stack
   */
  public push(...item: T[]): void {
    for (const value of item) {
      this.list.insertIntoHead(value);
    }
  }

  /**
   * Removes item from top of the stacks and returns it
   */
  public pop(): T | undefined {
    return this.list.shift();
  }

  /**
   * Removes item from top of the stacks. Will not remove it from the state
   */
  public peek(): T | undefined {
    return this.list.peekHead();
  }

  /**
   * Returns element by given index
   */
  public at(index: number): T | undefined {
    if (index < 0) {
      throw new Error('Index is lower than 0 ');
    }

    return this.list.at(index);
  }

  /**
   * Drops current state
   */
  public clear(): void {
    this.list.clear();
  }

  /**
   * Returns iterator for the state
   */
  public [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }

  /**
   * Number of items
   */
  public get size(): number {
    return this.list.size;
  }

  /**
   * Is the state empty
   */
  public get empty(): boolean {
    return !this.size;
  }
}

export default Stack;
