import { bus } from './bus';
import { getId } from './id';
import type { EqualityFn, Reactive } from './types';

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
 * Removes `seal` effect
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
export function setToSealed<T>($var: Reactive<T>): (next: T) => typeof $var;
export function setToSealed<T>($var: Reactive<T>, next: T): typeof $var;
export function setToSealed<T>(
  ...args: [$var: Reactive<T>] | [$var: Reactive<T>, next: T]
) {
  const [$var] = args;

  if (args.length === 1) {
    return (next: T) => setToSealed($var, next);
  }

  const next = args[1];
  unseal($var);
  $var(next);
  seal($var);

  return $var;
}

/**
 * A predicate that receives two values of type T and returns their equality.
 */
export const defaultEqualityFn: EqualityFn = (a, b) => a === b;
