type Nullable<T> = T | null;

export class ListNode<T = any> {
  constructor(
    public readonly val: T,
    public next: Nullable<ListNode<T>> = null,
    public prev: Nullable<ListNode<T>> = null
  ) {}
}

export type DoubleLinkedListNode<T> = ListNode<T>

export class DoubleLinkedList<T> {
  private head: Nullable<ListNode<T>> = null;

  constructor(...values: T[]) {
    values.forEach(this.add);
  }

  public add = (val: T) => {
    const newNode = new ListNode(val);

    if (!this.head) {
      this.head = newNode;

      return;
    }

    let node = this.head;

    while (node.next) {
      node = node.next;
    }

    node.next = newNode;
    newNode.prev = node;
  };

  public addToHead = (val: T) => {
    const newHead = new ListNode(val);

    newHead.next = this.head;
    if (this.head) {
      this.head.prev = newHead;
    }
    this.head = newHead;
  };

  public shift = (): T | undefined => {
    const currHead = this.head;

    this.head = this.head?.next || null;
    if (this.head) {
      this.head.prev = null;
    }

    return currHead?.val;
  };

  public at = (i: number): T | undefined => {
    let node = this.head;

    for (let j = 0; j <= i; j++) {
      if (!node) {
        return undefined;
      }

      node = node.next;
    }

    return node?.val;
  };

  public remove = (i: number): void => {
    if (i === 0) {
      this.shift();

      return;
    }

    let j = 0;
    let prev = this.head;
    let curr = this.head;

    while (j < i) {
      if (!curr) {
        return;
      }

      prev = curr;
      curr = curr.next;
    }

    prev!.next = curr?.next || null;

    if (curr) {
      curr.prev = prev;
    }
  };

  public get size(): number {
    let i = 0;
    let node = this.head;

    while (node) {
      node = node.next;
      i++;
    }

    return i;
  }

  public get empty(): boolean {
    return !this.head;
  }

  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node.val;
    }
  }
}
