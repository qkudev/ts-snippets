class LLNode<T> {
  constructor(
    public readonly value: T,
    public next: LLNode<T> | null = null
  ) {}
}

/**
 * Stack-ordered container
 */
class Stack<T> {
  private head: LLNode<T> | null = null;

  private _size = 0;

  /**
   * Creates stack from given iterable
   */
  public static readonly from = <V>(iterable: Iterable<V>) =>
    new Stack<V>(iterable);

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
    for (const value of item) {
      this.insertToHead(value);
    }
  };

  /**
   * Removes item from top of the stacks and returns it
   */
  public readonly pop = (): T | undefined => {
    if (!this.head) {
      return undefined;
    }
    const { head } = this;
    this.head = this.head.next;
    this._size--;

    return head.value;
  };

  /**
   * Removes item from top of the stacks. Will not remove it from the state
   */
  public readonly peek = (): T | undefined => this.head?.value;

  /**
   * Returns element by given index
   */
  public readonly at = (index: number): T | undefined => {
    if (index < 0) {
      throw new Error('Index is lower than 0 ');
    }

    let node = this.head;
    let i = 0;
    while (node && i < index) {
      node = node.next;
      i++;
    }

    return node?.value;
  };

  /**
   * Drops current state
   */
  public readonly clear = (): void => {
    this.head = null;
    this._size = 0;
  };

  /**
   * Returns iterator for the state
   */
  public *[Symbol.iterator](): Iterator<T> {
    let node = this.head;

    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * Number of items
   */
  public get size(): number {
    return this._size;
  }

  /**
   * Is the state empty
   */
  public get empty(): boolean {
    return !this.size;
  }

  private insertToHead(value: T) {
    this.head = new LLNode(value, this.head);
    this._size++;
  }
}

export default Stack;
