/**
 * @module store-data
 * @see https://www.frontendinterviewhandbook.com/companies/airbnb-front-end-interview-questions/
 */

/**
 * A function that will be called when the state of a key changes.
 * @typeparam T The type of the value that the listener will receive.
 */
type Listener<T = unknown> = (next: T) => void;

/**
 * A function that unsubscribes a listener from a key.
 */
type Unsubscribe = () => void;

/**
 * A string key that maps to a value in the store.
 */
type Key = string;

/**
 * A class that stores data in a Map and notifies listeners when the data changes.
 */
class StoreData {
  private state = new Map<Key, unknown>();

  private listeners = new Map<Key, Set<Listener<any>>>();

  /**
   * Subscribes a listener to a key.
   * @typeparam T The type of the value that the listener will receive.
   * @param key The key to subscribe to.
   * @param listener The listener function to call when the key's value changes.
   * @returns A function that unsubscribes the listener from the key.
   */
  public subscribe<T = unknown>(key: Key, listener: Listener<T>): Unsubscribe {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key)!.add(listener);

    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  /**
   * Sets the value of a key in the store.
   * @typeparam T The type of the value to set.
   * @param key The key to set the value of.
   * @param value The value to set.
   */
  public set<T = any>(key: Key, value: T) {
    if (this.state.has(key) && this.state.get(key) === value) {
      return;
    }

    this.state.set(key, value);
    this.notifyListeners(key, value);
  }

  /**
   * Gets the value of a key in the store.
   * @typeparam T The type of the value to get.
   * @param key The key to get the value of.
   * @returns The value of the key.
   */
  public get<T = any>(key: Key) {
    return this.state.get(key) as T;
  }

  /**
   * Deletes a key from the store.
   * @param key The key to delete.
   */
  public delete(key: Key) {
    this.state.delete(key);
  }

  /**
   * Notifies all listeners of a key that its value has changed.
   * @typeparam T The type of the value that the listeners will receive.
   * @param key The key whose value has changed.
   * @param value The new value of the key.
   */
  private notifyListeners<T>(key: Key, value: T) {
    const keyListeners = this.listeners.get(key);
    keyListeners?.forEach((listener) => {
      listener(value);
    });
  }
}

export default StoreData;
