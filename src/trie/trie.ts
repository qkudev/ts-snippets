type Nullable<T> = T | null;

class TNode {
  public children: Map<string, TNode> = new Map();

  public end: boolean = false;

  constructor(
    public readonly key: Nullable<string>,
    public parent: Nullable<TNode> = null,
  ) {}

  public get hasChildren(): boolean {
    return !!this.children.size;
  }
}

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type KeysByType<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

class Trie<TData> {
  private readonly root = new TNode(null);

  private readonly dataMap = new WeakMap<TNode, TData>();

  constructor(private readonly idx: KeysByType<TData, string>, data?: TData[]) {
    if (data) {
      this.add(...data);
    }
  }

  /**
   * Insert word into the trie
   */
  public readonly add = (...items: TData[]) => {
    for (const item of items) {
      const word = item[this.idx] as string;
      let node = this.root;

      for (const c of word) {
        if (!node.children.get(c)) {
          node.children.set(c, new TNode(c, node));
        }

        node = node.children.get(c)!;
      }

      node.end = true;
      this.dataMap.set(node, item);
    }
  };

  /**
   * Check if the trie has given word
   */
  public readonly has = (item: TData): boolean => {
    const word = item[this.idx] as string;

    let result = true;
    let node: Nullable<TNode> | undefined = this.root;

    for (const c of word) {
      if (!node || !node.children.has(c)) {
        result = false;
        break;
      }

      node = node.children.get(c);
    }

    return Boolean(result && node?.end);
  };

  /**
   * Search for words with prefix
   */
  public readonly find = (prefix: string): TData[] => {
    let node: Nullable<TNode> | undefined = this.root;

    for (const c of prefix) {
      if (!node || !node.children.has(c)) {
        return [];
      }

      node = node.children.get(c);
    }

    if (!node) {
      return [];
    }

    return this.getAllWords(node);
  };

  /**
   * Delete word from the trie
   */
  public remove = (item: TData): void => {
    const word = item[this.idx] as string;
    let node: Nullable<TNode> | undefined = this.root;

    for (const c of word) {
      node = node?.children.get(c);

      if (!node) {
        return;
      }
    }

    node.end = false;
    this.dataMap.delete(node);

    while (node && !node.hasChildren && !node.end) {
      node.parent?.children.delete(node.key!);
      node = node.parent;
    }
  };

  public get items(): TData[] {
    return this.getAllWords(this.root);
  }

  private getAllWords = (node: TNode, result: TData[] = []): TData[] => {
    if (!node) {
      return result;
    }

    if (node.end) {
      result.push(this.dataMap.get(node)!);
    }

    for (const child of node.children.values()) {
      this.getAllWords(child, result);
    }

    return result;
  };
}

export default Trie;
