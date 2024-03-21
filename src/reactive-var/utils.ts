import type { ReactiveVar } from './reactive-var.types';

export const SEALED = Symbol('sealed');
export const REACTIVE = Symbol('reactive');
export const ID = Symbol('id');

export const isReactive = <T>(val: unknown): val is ReactiveVar<T> =>
  Boolean(typeof val === 'function' && (val as ReactiveVar<T>)[REACTIVE]);

/**
 * Freezes given reactive var so any set call will be ignored
 */
export const seal = <T>($value: ReactiveVar<T>) => {
  if (!isReactive($value)) {
    throw new TypeError('Not reactive value given');
  }

  $value[SEALED] = true;
};

/**
 * Removes `freeze` effect
 *
 * @see seal
 */
export const unseal = <T>($value: ReactiveVar<T>) => {
  if (!isReactive($value)) {
    throw new TypeError('Not reactive value given');
  }

  $value[SEALED] = false;
};

/**
 * Sets value to frozen variable
 */
export const setToSealed = <T>($value: ReactiveVar<T>, next: T) => {
  unseal($value);
  $value(next);
  seal($value);
};

/**
 * A predicate that receives two values of type T and returns their equality.
 */
export function defaultEqualityFn<T>(a: T, b: T) {
  return a === b;
}
