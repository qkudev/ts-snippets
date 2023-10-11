/**
 * Stack-ordered container
 */
class Stack<T> {
  private state: T[] = [];

  /**
   * Creates stack from given iterable
   */
  public static readonly from = <V>(iterable: Iterable<V>) => new Stack<V>(iterable);

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
  public readonly push = (...item: T[]): void => {
    this.state.push(...item);
  };

  /**
   * Removes item from top of the stacks and returns it
   */
  public readonly pop = (): T | undefined => this.state.pop();

  /**
   * Removes item from top of the stacks. Will not remove it from the state
   */
  public readonly peek = (): T | undefined => this.state[this.state.length - 1];

  /**
   * Returns element by given index
   */
  public readonly at = (index: number): T | undefined => {
    if (index < 0) {
      throw new Error('Index is lower than 0 ');
    }

    return this.state[index];
  };

  /**
   * Drops current state
   */
  public readonly clear = (): void => {
    this.state = [];
  };

  /**
   * Returns iterator for the state
   */
  public* [Symbol.iterator](): Iterator<T> {
    const copy: T[] = [...this.state];

    while (copy.length) {
      yield copy.pop() as T;
    }
  }

  /**
   * Number of items
   */
  public get size(): number {
    return this.state.length;
  }

  /**
   * Is the state empty
   */
  public get empty(): boolean {
    return !this.state.length;
  }
}

export default Stack;
