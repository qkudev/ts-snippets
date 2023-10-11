type Nullable<T> = T | null;

export class ListNode<T = any> {
  constructor(
    public readonly val: T,
    public next: Nullable<ListNode<T>> = null,
  ) {}
}

export class LinkedList<T> {
  public head: Nullable<ListNode<T>> = null;

  constructor(...values: T[]) {
    this.add(...values);
  }

  public add = (...values: T[]) => {
    if (!values.length) {
      return;
    }

    const [val, ...rest] = values;
    const newNode = new ListNode(val);
    let curr = newNode;
    rest.forEach((v) => {
      curr.next = new ListNode(v);
      curr = curr.next;
    });

    if (!this.head) {
      this.head = newNode;
    } else {
      let node = this.head;
      while (node.next) {
        node = node.next;
      }

      node.next = newNode;
    }
  };

  public addToHead = (...values: T[]) => {
    for (const val of values) {
      const newHead = new ListNode(val);
      newHead.next = this.head;
      this.head = newHead;
    }
  };

  public shift = (): T | undefined => {
    const currHead = this.head;

    this.head = this.head?.next || null;

    return currHead?.val;
  };

  public at = (i: number): T | undefined => {
    let node = this.head;

    for (let j = 0; j < i; j++) {
      if (!node) {
        return undefined;
      }

      node = node.next;
    }

    return node?.val;
  };

  public remove = (index: number): void => {
    if (index === 0) {
      this.head = this.head?.next || null;

      return;
    }

    const j = 0;
    let prev = this.head;
    let curr = this.head;

    while (j < index) {
      if (!curr) {
        return;
      }

      prev = curr;
      curr = curr.next;
    }

    prev!.next = curr?.next || null;
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

  public concat(list: LinkedList<T>) {
    if (!this.head) {
      this.head = list.head;
      return this;
    }

    this.tail!.next = list.head;
    return this;
  }

  public get tail(): ListNode<T> | null {
    let curr: ListNode<T> | null = this.head;
    while (curr?.next) {
      curr = curr.next;
    }

    return curr;
  }

  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node.val;
      node = node.next;
    }
  }
}
