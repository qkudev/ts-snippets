/**
 * Trie node impl
 * Using `WeakMap` if arg is `object`, normal map otherwise
 */
class TrieNode {
  private map = new Map<any, unknown>();
  private weakMap = new WeakMap<any, unknown>();

  public has(key: any) {
    return this.getMap(key).has(key);
  }

  public get(key: any) {
    return this.getMap(key).get(key);
  }

  public set(key: any, val: unknown) {
    return this.getMap(key).set(key, val);
  }

  private getMap(key: any) {
    if (typeof key === 'object' && key !== null) {
      return this.weakMap;
    }

    return this.map;
  }
}

/**
 * Memoizes given fn effectively with `Trie` cache
 */
export const memoize = <F extends Function>(f: F): F => {
  const root = new TrieNode();
  const cache = new WeakMap<TrieNode, any>();

  return (((...args: any[]) => {
    let node = root;
    for (const arg of args) {
      if (!node.has(arg)) {
        node.set(arg, new TrieNode());
      }
      node = node.get(arg) as TrieNode;
    }

    if (!cache.has(node)) {
      cache.set(node, f(...args));
    }

    return cache.get(node);
  }) as unknown) as F;
};
