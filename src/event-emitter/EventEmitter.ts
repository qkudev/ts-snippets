type EventName = string | Symbol;

/**
 * Naive EventEmitter implementation
 */
export class EventEmitter {
  private readonly listeners: Map<EventName, Set<Function>> = new Map();

  public emit = (event: EventName, ...args: any[]) => {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    eventListeners.forEach(listener => listener(...args));
  };

  public addListener = (event: EventName, listener: Function) => {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(listener);

    return () => this.removeListener(event, listener);
  };

  public removeListener = (event: EventName, listener: Function) => {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)!.delete(listener);
  };

  public once = (event: EventName, listener: Function) => {
    const onceListener = (...args: any[]) => {
      listener(...args);
      this.removeListener(event, onceListener);
    };

    this.addListener(event, onceListener);

    return () => this.removeListener(event, onceListener);
  };

  public removeAllListeners = () => {
    this.listeners.forEach(eventListeners => {
      eventListeners.clear();
    });
  };

  public get eventNames(): EventName[] {
    return [...this.listeners.keys()];
  }
}
