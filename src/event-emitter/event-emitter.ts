type EventName = string | Symbol;

/**
 * A class that implements the EventEmitter pattern.
 * @class
 */
class EventEmitter<Ev extends EventName = EventName> {
  /**
   * A map of event names to a set of listeners.
   * @private
   */
  private readonly listeners: Map<EventName, Set<Function>> = new Map();

  /**
   * Emits an event with the given name and arguments. Returns a promise
   * that will be resolved when all the listeners are settled.
   *
   * @param {Ev} event - The name of the event to emit.
   * @param {...any} args - The arguments to pass to the event listeners.
   */
  public emit = async (event: Ev, ...args: any[]): Promise<void> => {
    const eventListeners = this.listeners.get(event) || new Set();

    await Promise.allSettled(
      [...eventListeners].map((listener) => listener(...args))
    );
  };

  /**
   * Adds a listener for the given event.
   * @param {Ev} event - The name of the event to listen for.
   * @param {Function} listener - The listener function to add.
   */
  public addListener = (event: Ev, listener: Function) => {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(listener);

    return () => this.removeListener(event, listener);
  };

  /**
   * Removes a listener for the given event.
   * @param {EventName} event - The name of the event to remove the listener from.
   * @param {Function} listener - The listener function to remove.
   */
  public removeListener = (event: EventName, listener: Function) => {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)!.delete(listener);
  };

  /**
   * Adds a one-time listener for the given event.
   * @param {EventName} event - The name of the event to listen for.
   * @param {Function} listener - The listener function to add.
   */
  public once = (event: Ev, listener: Function) => {
    const onceListener = (...args: any[]) => {
      listener(...args);
      this.removeListener(event, onceListener);
    };

    this.addListener(event, onceListener);

    return () => this.removeListener(event, onceListener);
  };

  /**
   * Removes all listeners for all events.
   */
  public removeAllListeners = () => {
    this.listeners.forEach((eventListeners) => {
      eventListeners.clear();
    });
  };

  /**
   * Returns an array of all the event names that have listeners.
   * @type {EventName[]}
   */
  public get eventNames(): EventName[] {
    return [...this.listeners.keys()];
  }
}

export default EventEmitter;
