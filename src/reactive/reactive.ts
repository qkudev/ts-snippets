import { REACTIVE, defaultEqualityFn, ID } from './utils';
import { EqualityFn, Reactive } from './types';
import map from './map';
import filter from './filter';
import { bus } from './bus';
import onChange from './on-change';
import { createVar, getValue } from './root';

/**
 * Creates a new reactive variable with the given initial state and optional equality function.
 * The returned function can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 */
function reactiveVar<T>(
  initialState: T,
  equalityFn: EqualityFn<T> = defaultEqualityFn<T>
): Reactive<T> {
  const id = createVar(initialState, equalityFn);

  function setState(next: T) {
    bus.emit('set', {
      id,
      value: next,
    });
  }

  function self(...args: [] | [T]) {
    if (args.length) {
      const [nextState] = args;

      setState(nextState);
    }

    return getValue(id);
  }

  self[REACTIVE] = true;
  self[ID] = id;
  self.onChange = onChange(self as Reactive<T>);
  self.map = map(self as Reactive<T>);
  self.filter = filter(self as Reactive<T>);

  return self as Reactive<T>;
}

export default reactiveVar;
