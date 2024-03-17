import type { ReactiveVar } from './reactive-var.types';

export const FROZEN = Symbol('frozen');
export const REACTIVE = Symbol('reactive');

export const isReactive = <T>(val: unknown): val is ReactiveVar<T> =>
  Boolean(typeof val === 'function' && (val as ReactiveVar<T>)[REACTIVE]);

/**
 * Freezes given reactive var so any set call will be ignored
 */
export const freeze = <T>($value: ReactiveVar<T>) => {
  if (!isReactive($value)) {
    throw new TypeError('Not reactive value given');
  }

  $value[FROZEN] = true;
};

/**
 * Removes `freeze` effect
 *
 * @see freeze
 */
export const unfreeze = <T>($value: ReactiveVar<T>) => {
  if (!isReactive($value)) {
    throw new TypeError('Not reactive value given');
  }

  $value[FROZEN] = false;
};

/**
 * Sets value to frozen variable
 */
export const setToFrozen = <T>($value: ReactiveVar<T>, next: T) => {
  unfreeze($value);
  $value(next);
  freeze($value);
};

/**
 * A predicate that receives two values of type T and returns their equality.
 */
export function defaultEqualityFn<T>(a: T, b: T) {
  return a === b;
}
