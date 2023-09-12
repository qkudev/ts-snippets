/**
 * @see https://leetcode.com/problems/lfu-cache/discuss/207673/Python-concise-solution-**detailed**-explanation%3A-Two-dict-%2B-Doubly-linked-list
 */

class LNode {
  public freq: number = 1;
  public next: LNode | null;
  public prev: LNode | null;

  constructor(public readonly key: number, public val: number) {
    this.next = null;
    this.prev = null;
  }
}

class DLL {
  public head: LNode = new LNode(-1, -1);
  public tail: LNode = new LNode(-1, -1);

  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}

export class LFUCache {
  private map: Map<number, LNode> = new Map();
  private freq: Map<number, DLL> = new Map([[1, new DLL()]]);
  private minFreq: number = 1;
  private curSize: number = 0;

  constructor(public readonly capacity: number) {}

  public readonly get = (key: number): number => {
    if (!this.map.has(key) || this.capacity === 0) {
      return -1;
    }

    const node = this.map.get(key)!;
    let dll = this.freq.get(node.freq)!;
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    // check if the dll is empty after removing the node
    if (dll.head.next == dll.tail && this.minFreq == node.freq) {
      this.minFreq = node.freq + 1;
    }

    node.freq += 1;

    if (!this.freq.has(node.freq)) {
      this.freq.set(node.freq, new DLL());
    }

    dll = this.freq.get(node.freq)!;
    node.next = dll.head.next;
    dll.head.next!.prev = node;
    dll.head.next = node;
    node.prev = dll.head;

    return node.val;
  };

  public readonly put = (key: number, value: number): void => {
    if (this.capacity === 0) {
      return;
    }

    // increase freq
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = value;
      this.get(key);
      return;
    }

    this.curSize += 1;

    if (this.curSize > this.capacity) {
      let dll = this.freq.get(this.minFreq)!;
      let dNode = dll.tail.prev!;
      dNode.prev!.next = dll.tail;
      dll.tail.prev = dNode!.prev;
      this.map.delete(dNode.key);
      this.curSize -= 1;
    }

    const node = new LNode(key, value);
    this.map.set(key, node);
    this.minFreq = 1;

    const dll = this.freq.get(this.minFreq)!;
    dll.head.next!.prev = node;
    node.next = dll.head.next;
    dll.head.next = node;
    node.prev = dll.head;
  };
}
