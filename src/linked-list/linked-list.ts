type Nullable<T> = T | null;

export class LNode<T = any> {
  constructor(
    public readonly val: T,
    public next: Nullable<LNode<T>> = null
  ) {}
}

/**
 * Linked list
 *
 * @example
 * const list = new LinkedList<nubmer>();
 * list.insert(1);
 * list.insert(2);
 * console.log(list.size);          // 2
 * console.log(list.peek());        // 2
 * console.oog(list.shift())        // 2
 */
class LinkedList<T> {
  private head: Nullable<LNode<T>> = null;

  private _size: number = 0;

  constructor(...values: T[]) {
    values.forEach((value) => this.insert(value));
  }

  /**
   * Inserts value into the start of the list.
   * `O(1)` time complexity.
   */
  public insert(value: T): void {
    this.head = new LNode(value, this.head);
    this._size++;
  }

  /**
   * Returns first value of the list without removal.
   * `O(1)` time complexity.
   */
  public peek(): T | undefined {
    return this.head?.val;
  }

  /**
   * Removes value from the start of the list.
   * `O(1)` time complexity.
   */
  public shift(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }

    const head = this.head!;
    this.head = this.head?.next || null;
    this._size--;

    return head.val;
  }

  /**
   * Returns n-th value by given index.
   * `O(n)` time complexity.
   */
  public at(index: number): T | undefined {
    let node = this.head;
    let i = 0;

    while (node && i < index) {
      node = node.next;
      i++;
    }

    return node?.val;
  }

  public clear() {
    this.head = null;
    this._size = 0;
  }

  /**
   * Returns number of values in the list.
   * `O(1)` time complexity.
   */
  public get size(): number {
    return this._size;
  }

  /*
   * Returns `true` if no values in list.
   * `O(1)` time complexity.
   */
  public get isEmpty(): boolean {
    return !this.head;
  }

  /**
   * Returns list iterator.
   */
  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node.val;
      node = node.next;
    }
  }
}

export default LinkedList;
