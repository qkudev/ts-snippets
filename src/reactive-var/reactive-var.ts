import { FROZEN, REACTIVE, defaultEqualityFn } from './utils';
import { Listener, ReactiveVar } from './reactive-var.types';
import map from './map';
import filter from './filter';

/**
 * Creates a new reactive variable with the given initial state and optional equality function.
 * The returned function can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 */
function reactiveVar<T>(
  initialState: T,
  equalityFn = defaultEqualityFn<T>
): ReactiveVar<T> {
  const listeners = new Set<Listener<T>>();
  let state = initialState;

  function notifyListeners() {
    listeners.forEach((listener) => {
      listener(state);
    });
  }

  function setState(next: T) {
    if (equalityFn(state, next)) {
      return;
    }

    state = next;
    notifyListeners();
  }

  function self(...args: [] | [T]) {
    if (args.length && !self[FROZEN]) {
      const [nextState] = args;

      setState(nextState);
    }

    return state;
  }

  self[FROZEN] = false;
  self[REACTIVE] = true;

  self.onChange = function onChange(listener: Listener<T>) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  self.map = map(self as ReactiveVar<T>);
  self.filter = filter(self as ReactiveVar<T>);

  return self as ReactiveVar<T>;
}

export default reactiveVar;
