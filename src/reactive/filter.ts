import reactive from './reactive';
import onChange from './on-change';
import { Predicate, Reactive } from './types';
import { seal, setToSealed } from './utils';

/**
 * Returns new reactive var that will be updated only when original var
 * is updated and predicate returns `true`
 *
 * Initial value will be `undefined` in case initial value of the original var
 * is not accepted by given predicate
 *
 *
 * @example
 * const $x = reactive(2)
 * const $evenX = $x.filter(value => value % 2 === 0)
 * $evenX() // 2
 *
 * $x(4)
 * $evenX() // 4
 *
 * $x(5)
 * $evenX() // 4
 */
function filter<T>($var: Reactive<T>): (predicate: Predicate<T>) => Reactive<T>;

function filter<T>($var: Reactive<T>, predicate: Predicate<T>): Reactive<T>;

function filter<T>($var: Reactive<T>, predicate?: Predicate<T>) {
  if (!predicate) {
    return (curried: (value: T) => boolean) => filter($var, curried);
  }

  const filtered = reactive(
    predicate($var()) ? $var() : (undefined as unknown as T)
  );
  seal(filtered);

  onChange($var, (next) => {
    if (predicate(next)) {
      setToSealed(filtered, next);
    }
  });

  return filtered;
}

export default filter;
