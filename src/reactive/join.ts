import reactive from './reactive';
import { ExtractReturnType, VarsArray, Combiner } from './types';
import { seal, setToSealed } from './utils';
import onChange from './on-change';
import { getValue } from './root';

/**
 * Accepts N reactive vars and `Combiner` as the last arg.
 * The `Combiner` is a N-ary function of values of reactive vars.
 * Updates on dependent variables will result in joined variable update.
 *
 * Joined variable is sealed, so any set calls will be ignored.
 *
 * @example
 * const $price = reactive(2)
 * const $currency = reactive('USD')
 * const $priceString = join($price, $currency, (price, currency) => `${price} ${currency}`)
 *
 * $priceString() // "2 USD"
 *
 * $price(4)
 * $priceString() // "4 USD"
 * $priceString("123") // "4 USD"
 */
function join<Vars extends VarsArray, Result>(
  ...joinArgs: [...vars: Vars, combiner: Combiner<Vars, Result>]
) {
  const combiner = joinArgs.pop() as Combiner<Vars, Result>;
  const $vars = joinArgs as VarsArray;
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
