import { bus } from './bus';
import { getId } from './id';
import type { Reactive } from './types';

export const REACTIVE = Symbol('reactive');
export const ID = Symbol('id');

/**
 * Type guard for checking iv given value is a reactive var
 */
export const isReactive = <T>(val: unknown): val is Reactive<T> =>
  Boolean(typeof val === 'function' && (val as Reactive<T>)[REACTIVE]);

/**
 * Freezes given reactive var so any set call will be ignored
 */
export const seal = <T>($var: Reactive<T>) => {
  if (!isReactive($var)) {
    throw new TypeError('Not reactive value given');
  }

  bus.emit('seal', getId($var));
};

/**
 * Removes `freeze` effect
 *
 * @see seal
 */
export const unseal = <T>($var: Reactive<T>) => {
  if (!isReactive($var)) {
    throw new TypeError('Not reactive value given');
  }

  bus.emit('unseal', getId($var));
};

/**
 * Sets value to frozen variable
 */
export const setToSealed = <T>($value: Reactive<T>, next: T) => {
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
