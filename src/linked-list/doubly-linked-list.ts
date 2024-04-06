type Nullable<T> = T | null;

export class DLLNode<T = any> {
  constructor(
    public readonly val: T,
    public next: Nullable<DLLNode<T>> = null,
    public prev: Nullable<DLLNode<T>> = null
  ) {}
}

/**
 * Linked list as doubly linked list.
 *
 * @example
 * const list = new LinkedList<nubmer>();
 * list.insertIntoHead(1);
 * list.insertIntoTail(2);
 * console.log(list.size);          // 2
 * console.log(list.peekTail());    // 2
 * console.log(list.peekHead());    // 1
 * console.log(list.pop())          // 2
 * console.oog(list.shift())        // 1
 */
class LinkedList<T> {
  private head: Nullable<DLLNode<T>> = null;

  private tail: Nullable<DLLNode<T>> = null;

  private _size: number = 0;

  constructor(...values: T[]) {
    values.forEach((value) => this.insertIntoTail(value));
  }

  /**
   * Inserts value into the start of the list.
   * `O(1)` time complexity.
   */
  public insertIntoHead(value: T): void {
    this.head = new DLLNode(value, this.head);
    if (this.head.next) {
      this.head.next.prev = this.head;
    }
    if (!this.tail) {
      this.tail = this.head;
    }
    this._size++;
  }

  /**
   * Inserts value into the end of the list.
   * `O(1)` time compelexity.
   */
  public insertIntoTail(value: T): void {
    this.tail = new DLLNode(value, null, this.tail);
    if (this.tail.prev) {
      this.tail.prev.next = this.tail;
    }
    if (!this.head) {
      this.head = this.tail;
    }
    this._size++;
  }

  /**
   * Returns first value of the list without removal.
   * `O(1)` time complexity.
   */
  public peekHead(): T | undefined {
    return this.head?.val;
  }

  /**
   * Returns last value of the list without removal.
   * `O(1)` time complexity.
   */
  public peekTail(): T | undefined {
    return this.tail?.val;
  }

  /**
   * Removes value from the end of the list.
   * `O(1)` time complexity.
   */
  public pop(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }

    const node = this.tail!;
    this.tail = this.tail!.prev || null;
    this._size--;

    if (this._size === 0) {
      this.head = null;
    }
    if (this.tail) {
      this.tail.next = null;
    }

    return node.val;
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

    if (this._size === 0) {
      this.tail = null;
    }
    if (this.head) {
      this.head.prev = null;
    }

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
    this.tail = null;
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
