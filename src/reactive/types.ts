import { REACTIVE, ID } from './utils';

/**
 * A function that receives a value of type T and returns void.
 */
export type Listener<Type> = (value: Type) => void;

export type Unsubscribe = () => void;

export type Predicate<Type> = (value: Type) => boolean;

/**
 * A function that used by `map` to transform original value to a new one
 */
export type Mapper<Type, Result> = (value: Type) => Result;

/**
 * A function that can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 */
/**
 * A function that returns and sets a reactive variable of type T.
 * @template Type The type of the reactive variable.
 * @param {Type} [next] The value to set the reactive variable to.
 * @returns {Type} The current value of the reactive variable.
 */
export type Reactive<Type> = ((
  next?: Type | ((current: Type) => Type)
) => Type) & {
  /**
   * Registers a listener function that will be called whenever the value changes.
   * Returns a function that can be called to remove the listener.
   * @param {Listener<Type>} listener The listener function to register.
   * @returns {() => void} A function that can be called to remove the listener.
   */
  onChange: (listener: Listener<Type>) => () => void;

  /**
   * Returns a new reactive variable of type R that is derived from the current reactive variable.
   * @template Result The type of the new reactive variable.
   * @param {(value: Type) => Result} mapper The function used to derive the new reactive variable.
   * @returns {Reactive<Result>} The new reactive variable.
   */
  map: <Result>(mapper: Mapper<Type, Result>) => Reactive<Result>;

  /**
   * Returns a new reactive variable of the same type that is updated only when original variable
   * is updated and given predicate returns true.
   */
  filter: (predicate: Predicate<Type>) => Reactive<Type>;

  [REACTIVE]: true;
  [ID]: number;
};

export type SetEventPayload<T> = {
  id: Id;
  value: T;
};

/**
 * An if-else-like type that resolves depending on whether the given type is `unknown`.
 * @see {@link https://github.com/sindresorhus/type-fest/blob/main/source/if-unknown.d.ts Source}
 *
 * @internal
 */
export type IfUnknown<T, TypeIfUnknown, TypeIfNotUnknown> = unknown extends T // `T` can be `unknown` or `any`
  ? [T] extends [null] // `any` can be `null`, but `unknown` can't be
    ? TypeIfNotUnknown
    : TypeIfUnknown
  : TypeIfNotUnknown;

export type FallbackIfUnknown<T, FallbackTo> = IfUnknown<T, FallbackTo, T>;

/**
 * Any function with any arguments.
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * Extracts the return type from all functions as a tuple.
 */
export type ExtractReturnType<FunctionsArray extends readonly Reactive<any>[]> =
  {
    [Index in keyof FunctionsArray]: FunctionsArray[Index] extends FunctionsArray[number]
      ? FallbackIfUnknown<ReturnType<FunctionsArray[Index]>, any>
      : never;
  };

export interface ReactiveVarState<T> {
  value: T;
  sealed: boolean;
  id: number;
  equalityFn: EqualityFn<T>;
}

export type Id = number;

export type EqualityFn<T = unknown> = (a: T, b: T) => boolean;
