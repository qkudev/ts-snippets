import { REACTIVE, ID, SEALED } from './utils';

/**
 * A function that receives a value of type T and returns void.
 */
export type Listener<Type> = (value: Type) => void;

export type Unsubscribe = () => void;

export type Predicate<Type> = (value: Type) => boolean;

/**
 * Unique reactive var identified
 */
export type Id = number;

export type EqualityFn = (a: unknown, b: unknown) => boolean;

/**
 * A function that used by `map` to transform original value to a new one
 */
export type Mapper<Type, Result> = (value: Type) => Result;

/**
 * A function that can be called with or without an argument of type T.
 * When called without an argument, it returns the current value of type T.
 * When called with an argument, it sets the current value to the argument and returns it.
 * It also has an `onChange` method that allows registering listeners for changes to the value.
 *
 * @example
 * const $x = reactive(2)
 * $x()   // 2
 * $x(4)  // 4
 * $x()   // 4
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

  /**
   * Accepts reducer and initial state and creates new reactive var
   * that derives it's next state by given callback, next value of original reactive var
   * and it's own previous state.
   *
   * @example
   * const $action = reactive({ type: '@@init' });
   * const $counter = $action.reduce((counter, action) => {
   *   switch (action.type) {
   *    case 'increment': return counter + 1;
   *    default: return counter;
   *   }
   * }, 0);
   *
   * $counter()                 // 0
   * $action({ type: 'inc' });
   * $counter();                // 1
   */
  reduce: {
    <S>(reducer: Reducer<S, Type>): (initialState: S) => Reactive<S>;
    <S>(reducer: Reducer<S, Type>, initialState: S): Reactive<S>;
  };

  [REACTIVE]: true;
  [ID]: number;
  [SEALED]: boolean;
};

export interface ReactiveVarState<T> {
  value: T;
  sealed: boolean;
  id: number;
  equalityFn: EqualityFn;
}

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
 * Extracts the return type from all functions as a tuple.
 */
export type ExtractReturnType<FunctionsArray extends readonly Reactive<any>[]> =
  {
    [Index in keyof FunctionsArray]: FunctionsArray[Index] extends FunctionsArray[number]
      ? FallbackIfUnknown<ReturnType<FunctionsArray[Index]>, any>
      : never;
  };

export type VarsArray = readonly Reactive<any>[];

export type VarsArrayValues<Vars extends VarsArray> = ExtractReturnType<Vars>;

/**
 * A function that takes input vars return values as arguments and returns a result. Otherwise known as `resultFunc`.
 */
export type Combiner<InputVars extends VarsArray, Result> = (
  ...resultFuncArgs: VarsArrayValues<InputVars>
) => Result;

export type Reducer<Acc, Element> = (accumulator: Acc, element: Element) => Acc;
