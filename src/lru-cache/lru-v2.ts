type Nullable<T> = T | null;
type Key = string | number | symbol;

class DLLNode<K, V> {
  constructor(
    public key: K,
    public val: V,
    public prev: Nullable<DLLNode<K, V>> = null,
    public next: Nullable<DLLNode<K, V>> = null,
  ) {}
}

const HEAD = Symbol('head');
const TAIL = Symbol('tail');

/**
 * LRU cache wit doubly-linked list
 */
class LRUCache<K extends Key, V> {
  private map = new Map<K, DLLNode<K, V>>();

  // Dummy node. real head is head.next
  public head = new DLLNode<K, V>(
    (HEAD as unknown) as K,
    (null as unknown) as V,
  );

  // Dummy node. real tail is tail.prev
  public tail = new DLLNode<K, V>(
    (TAIL as unknown) as K,
    (null as unknown) as V,
  );

  constructor(public readonly capacity: number) {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get = (key: K): V | undefined => {
    if (!this.map.has(key)) {
      return undefined;
    }

    const node = this.map.get(key)!;
    this.remove(node);
    this.add(node);

    return node.val;
  };

  public put = (key: K, val: V) => {
    if (this.map.has(key)) {
      const oldNode = this.map.get(key)!;
      this.remove(oldNode);
    }

    const node = new DLLNode<K, V>(key, val);
    this.map.set(key, node);
    this.add(node);

    if (this.map.size > this.capacity) {
      const nodeToRemove = this.head.next!;
      this.remove(nodeToRemove);
      this.map.delete(nodeToRemove.key);
    }
  };

  private add = (node: DLLNode<K, V>) => {
    const prevEnd = this.tail.prev!;
    prevEnd.next = node;
    node.prev = prevEnd;
    node.next = this.tail;
    this.tail.prev = node;
  };

  // eslint-disable-next-line class-methods-use-this
  private remove = (node: DLLNode<K, V>) => {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  };
}

export default LRUCache;