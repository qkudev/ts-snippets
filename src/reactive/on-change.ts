import { bus, changeEvent } from './bus';
import { getId } from './id';
import { Listener, Reactive, Unsubscribe } from './types';

/**
 * Accepts `Reactive` and a callback.
 * Registers a listener function that will be called whenever the value changes.
 * Returns a function that can be called to remove the listener.
 * The listener won't be called in case value of the var was not really changed,
 * which you can control it with `equalityFn` argument for `reactive`
 *
 * @example
 * const $x = reactive(2)
 * const listener = (x: number) => console.log('x ', x)
 * const unsubscribe = onChange($x, listener)
 *
 * $x(4) // `listener` have been called with 4
 * $x(4) // `listener` have not been called
 *
 * unsubscribe()
 * $x(10) // `listener` have not been called
 */
function onChange<T>($var: Reactive<T>): (listener: Listener<T>) => Unsubscribe;

function onChange<T>($var: Reactive<T>, listener: Listener<T>): Unsubscribe;

function onChange<T>($var: Reactive<T>, listener?: Listener<T>) {
  if (!listener) {
    return (curried: Listener<T>) => onChange($var, curried);
  }

  const eventName = changeEvent(getId($var));
  bus.addListener(eventName, listener);

  return () => {
    bus.removeListener(eventName, listener);
  };
}

export default onChange;
