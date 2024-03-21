import reactive from './reactive';
import onChange from './on-change';
import { Mapper, Reactive } from './types';
import { seal, setToSealed } from './utils';

/**
 * Accepts a reactive variable and a `mapper` function and creates a new reactive variable.
 * Value of the new reactive var will be result of the `mapper` function applied to
 * the original var.
 *
 * And every update of the original var will be populated to the mapped var.
 *
 * Newly created reactive var is sealed, e.g. any set calls will be ignored.
 *
 * @example
 * const $x = reactive(2);
 * const $squaredX = map($x, (x) => x * x);
 *
 * $squaredX(); // 4
 *
 * $x(4);
 * $squared(); // 16
 *
 * $squared(25); // set will be ignored, returns 16
 */
function map<T>($var: Reactive<T>): <R>(mapper: Mapper<T, R>) => Reactive<R>;

function map<T, R>($var: Reactive<T>, mapper: Mapper<T, R>): Reactive<T>;

function map<T, R>($var: Reactive<T>, mapper?: Mapper<T, R>) {
  if (!mapper) {
    return (curried: Mapper<T, R>) => map($var, curried);
  }

  const mapped = reactive(mapper($var()));
  seal(mapped);

  const set = setToSealed(mapped);
  onChange($var, (next) => {
    set(mapper(next));
  });

  return mapped;
}

export default map;
