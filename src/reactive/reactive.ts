import { REACTIVE, defaultEqualityFn, ID, SEALED } from './utils';
import { EqualityFn, Reactive } from './types';
import map from './map';
import filter from './filter';
import { bus } from './bus';
import onChange from './on-change';
import reduce from './reduce';
import { generateId } from './id';

/**
 * Creates a new reactive variable with the given initial state and optional equality function.
 * The returned function can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 *
 * @example
 * const $x = reactive(2);
 * $x();   // 2
 * $x(4);  // 4
 * $x();   // 4
 */
function reactive<T>(
  initialState: T,
  equalityFn: EqualityFn = defaultEqualityFn
): Reactive<T> {
  const id = generateId();
  let state = initialState;

  function notifyListeners() {
    bus.emit(`change/${id}`, state);
  }

  function setState(next: T) {
    if (equalityFn(next, state)) {
      return;
    }

    state = next;
    notifyListeners();
  }

  function self(...args: [] | [T]) {
    if (args.length && !(self as any)[SEALED]) {
      const [nextStateOrSetter] = args;
      const nextState =
        typeof nextStateOrSetter === 'function'
          ? nextStateOrSetter(state)
          : nextStateOrSetter;

      setState(nextState);
    }

    return state;
  }

  Object.assign(self, {
    [ID]: id,
    [REACTIVE]: true,
    [SEALED]: false,
    onChange: onChange(self as Reactive<T>),
    map: map(self as Reactive<T>),
    filter: filter(self as Reactive<T>),
    reduce: reduce(self as Reactive<T>),
  });

  return self as Reactive<T>;
}

export default reactive;
