/**
 * A function that receives a value of type T and returns void.
 */
type Listener<T> = (value: T) => void;

/**
 * A function that can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 */
/**
 * A function that returns and sets a reactive variable of type T.
 * @template T The type of the reactive variable.
 * @param {T} [next] The value to set the reactive variable to.
 * @returns {T} The current value of the reactive variable.
 */
type ReactiveVar<T> = ((next?: T) => T) & {
  /**
   * Registers a listener function that will be called whenever the value changes.
   * Returns a function that can be called to remove the listener.
   * @param {Listener<T>} listener The listener function to register.
   * @returns {() => void} A function that can be called to remove the listener.
   */
  onChange: (listener: Listener<T>) => () => void;

  /**
   * Returns a new reactive variable of type R that is derived from the current reactive variable.
   * @template R The type of the new reactive variable.
   * @param {(value: T) => R} fn The function used to derive the new reactive variable.
   * @returns {ReactiveVar<R>} The new reactive variable.
   */
  pipe: <R>(fn: (value: T) => R) => ReactiveVar<R>;
};

/**
 * A predicate that receives two values of type T and returns their equality.
 */
function defaultEqualityFn<T>(a: T, b:T) {
  return a === b;
}

/**
 * Creates a new reactive variable with the given initial state and optional equality function.
 * The returned function can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 */
function reactiveVar<T>(initialState: T, equalityFn = defaultEqualityFn<T>): ReactiveVar<T> {
  const listeners = new Set<Listener<T>>();
  let state = initialState;

  function notifyListeners() {
    listeners.forEach((listener) => {
      listener(state);
    });
  }

  function setState(next: T) {
    if (!equalityFn(state, next)) {
      state = next;

      notifyListeners();
    }
  }

  function self(...args: [] | [T]) {
    if (args.length) {
      const [nextState] = args;

      setState(nextState);
    }

    return state;
  }

  self.onChange = function onChange(listener: Listener<T>) {
    if (!listeners.has(listener)) {
      listeners.add(listener);
    }

    return () => {
      listeners.delete(listener);
    };
  };

  self.pipe = function pipe<R>(fn: (value: T) => R) {
    const pipedValue = reactiveVar(fn(state));

    self.onChange((value) => {
      pipedValue(fn(value));
    });

    return pipedValue;
  }

  return self as ReactiveVar<T>;
}

export default reactiveVar;
