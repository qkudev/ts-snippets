import reactive from './reactive';
import { ExtractReturnType, Reactive } from './types';
import { seal, setToSealed } from './utils';
import onChange from './on-change';
import { getValue } from './root';

export type VarsArray = readonly Reactive<any>[];

type VarsValuesArray<Vars extends VarsArray> = ExtractReturnType<Vars>;

/**
 * Distributes over a type. It is used mostly to expand a function type
 * in hover previews while preserving their original JSDoc information.
 *
 * If preserving JSDoc information is not a concern, you can use {@linkcode ExpandFunction ExpandFunction}.
 *
 * @template T The type to be distributed.
 *
 * @internal
 */
export type Distribute<T> = T extends T ? T : never;

export type Combiner<InputVars extends VarsArray, Result> = Distribute<
  /**
   * A function that takes input selectors' return values as arguments and returns a result. Otherwise known as `resultFunc`.
   *
   * @param resultFuncArgs - Return values of input selectors.
   * @returns The return value of {@linkcode OutputSelectorFields.resultFunc resultFunc}.
   */
  (...resultFuncArgs: VarsValuesArray<InputVars>) => Result
>;

function join<Vars extends VarsArray, R>(
  $vars: Readonly<Vars>,
  combiner: Combiner<Vars, R>
) {
  const current = () =>
    combiner(...($vars.map(getValue) as ExtractReturnType<Vars>));

  const joined = reactive(current());
  seal(joined);

  const recalc = () => {
    setToSealed(joined, current());
  };
  $vars.forEach(($var) => onChange($var, recalc));

  return joined;
}

export default join;
