/**
 * A class that implements the Storage interface and provides namespacing for the keys.
 */
class StorageNS implements Storage {
  /**
   * Creates a new instance of the NSStorage class.
   * @param namespace - The namespace to use for the keys.
   * @param storage - The underlying storage to use. Defaults to localStorage.
   */
  constructor(
    public readonly namespace: string,
    private readonly storage: Storage = localStorage
  ) {}

  /**
   * Sets the value of the specified key in the storage.
   * @param key - The key to set.
   * @param value - The value to set for the key.
   */
  public setItem(key: string, value: string): void {
    const namespacedKey = this.getNamespacedKey(key);

    this.storage.setItem(namespacedKey, value);
  }

  /**
   * Gets the value of the specified key from the storage.
   * @param key - The key to get the value for.
   * @returns The value of the key, or null if the key does not exist.
   */
  public getItem(key: string): string | null {
    const namespacedKey = this.getNamespacedKey(key);

    return this.storage.getItem(namespacedKey);
  }

  /**
   * Removes the specified key from the storage.
   * @param key - The key to remove.
   */
  public removeItem(key: string): void {
    const namespacedKey = this.getNamespacedKey(key);

    this.storage.removeItem(namespacedKey);
  }

  /**
   * Gets an array of all the keys in the storage that belong to the namespace.
   * @returns An array of all the keys in the storage that belong to the namespace.
   */
  public keys(): string[] {
    const n = this.storage.length;
    const keys: string[] = [];
    for (let i = 0; i < n; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(this.namespace)) {
        keys.push(key);
      }
    }

    return keys;
  }

  /**
   * Gets the key at the specified index in the array of keys that belong to the namespace.
   * @param index - The index of the key to get.
   * @returns The key at the specified index, or null if the index is out of range.
   */
  public key(index: number): string | null {
    const keys = this.keys();

    return keys[index];
  }

  /**
   * Gets the number of keys in the storage that belong to the namespace.
   */
  public get length(): number {
    const keys = this.keys();

    return keys.length;
  }

  /**
   * Removes all the keys in the storage that belong to the namespace.
   */
  public clear(): void {
    const keys = this.keys();
    keys.forEach((key) => {
      this.storage.removeItem(key);
    });
  }

  /**
   * Gets the namespaced key for the specified key.
   * @param key - The key to get the namespaced key for.
   * @returns The namespaced key for the specified key.
   */
  private getNamespacedKey(key: string) {
    return `${this.namespace}:${key}`;
  }
}

export default StorageNS;
