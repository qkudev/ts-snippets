import reactiveVar from './reactive-var';
import { ExtractReturnType, ReactiveVar } from './reactive-var.types';
import { seal, setToSealed } from './utils';

export type VarsArray = readonly ReactiveVar<any>[];

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
  const getCurrentValue = () => {
    const values = $vars.map(($var) =>
      $var()
    ) as unknown as ExtractReturnType<Vars>;

    return combiner(...values);
  };

  const joined = reactiveVar(getCurrentValue());
  seal(joined);

  const recalc = () => {
    setToSealed(joined, getCurrentValue());
  };
  $vars.forEach(($var) => $var.onChange(recalc));

  return joined;
}

export default join;
