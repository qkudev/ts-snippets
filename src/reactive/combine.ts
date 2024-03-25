import { Reactive } from './types';
import join from './join';

/**
 * Accepts object as map of string keys and values as reactive vars
 * Returns reactive var as object with same keys and values according to it's reactive vars.
 *
 * Combined reactive var is sealed, so seting to combined variable will be ignored.
 *
 * @example
 * const $x = reactive(4);
 * const $y = reactive(true);
 * const $combined = combine({
 *  x: $x,
 *  y: $y,
 * });
 *
 * $combined(); // { x: 4, y: true }
 */
const combine = <Config extends Record<string, Reactive<any>>>(
  config: Config
) => {
  const keys = Object.keys(config) as (keyof typeof config)[];
  const $vars = Object.values(config);

  return join(...$vars, (...values: any[]) =>
    values.reduce((map, value, i) => {
      map[keys[i]] = value;

      return map;
    }, {})
  ) as Reactive<{
    [Key in keyof Config]: ReturnType<Config[Key]>;
  }>;
};

export default combine;
