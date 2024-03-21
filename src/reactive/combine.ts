import reactive from './reactive';
import { Reactive } from './types';
import { seal, setToSealed } from './utils';
import onChange from './on-change';

/**
 * Accepts object as map of string keys and values as reactive vars
 * Returns reactive var as object with same keys and values according to it's reactive vars.
 *
 * Seting to combined variable will be ignored
 */
const combine = <Config extends Record<string, Reactive<any>>>(
  config: Config
) => {
  const current = () =>
    Object.fromEntries(
      Object.entries(config).map(([key, $var]) => [key, $var()])
    );

  const $combined = reactive(current());
  seal($combined);

  const recalc = () => {
    setToSealed($combined, current());
  };

  Object.values(config).forEach(($var) => onChange($var, recalc));

  return $combined as Reactive<{
    [K in keyof Config]: ReturnType<Config[K]>;
  }>;
};

export default combine;
