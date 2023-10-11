/**
 * Trie node implementation that uses `WeakMap` if the key is an object, and a normal map otherwise.
 */
class TrieNode {
  /**
   * Map to store keys that are not objects.
   */
  private map = new Map<any, unknown>();

  /**
   * WeakMap to store keys that are objects.
   */
  private weakMap = new WeakMap<any, unknown>();

  /**
   * Checks if the given key exists in the map.
   * @param key - The key to check.
   * @returns `true` if the key exists, `false` otherwise.
   */
  public has(key: any): boolean {
    return this.getMap(key).has(key);
  }

  /**
   * Gets the value associated with the given key.
   * @param key - The key to get the value for.
   * @returns The value associated with the key.
   */
  public get(key: any): unknown {
    return this.getMap(key).get(key);
  }

  /**
   * Sets the value for the given key.
   * @param key - The key to set the value for.
   * @param val - The value to set.
   * @returns The `TrieNode` instance.
   */
  public set(key: any, val: unknown) {
    return this.getMap(key).set(key, val);
  }

  /**
   * Gets the map to use for the given key.
   * @param key - The key to get the map for.
   * @returns The map to use for the given key.
   */
  private getMap(key: any): Map<any, unknown> | WeakMap<any, unknown> {
    if (typeof key === 'object' && key !== null) {
      return this.weakMap;
    }

    return this.map;
  }
}

type MemoizedFunction<F extends Function> = F & { reset: () => void };

/**
 * Memoizes the given function using a trie data structure.
 * @param f - The function to memoize.
 * @returns The memoized function.
 */
const memoize = <F extends Function>(f: F): MemoizedFunction<F> => {
  let root = new TrieNode();
  const cache = new WeakMap<TrieNode, any>();

  const memoized = ((...args: any[]) => {
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
  }) as unknown as F;

  /**
   * Resets the memoization cache.
   */
  const reset = () => {
    root = new TrieNode();
  };

  return Object.assign(memoized, { reset });
};

export default memoize;
