import reactiveVar from './reactive-var';
import { ReactiveVar } from './reactive-var.types';
import { seal, setToSealed } from './utils';

/**
 * Accepts object as map of string keys and values as reactive vars
 * Returns reactive var as object with same keys and values according to it's reactive vars.
 *
 * Seting to combined variable will be ignored
 */
const combine = <Config extends Record<string, ReactiveVar<any>>>(
  config: Config
) => {
  const initial = Object.fromEntries(
    Object.entries(config).map(([key, $value]) => [key, $value()])
  );
  const $combined = reactiveVar(initial);

  Object.entries(config).forEach(([key, $value]) => {
    $value.onChange((nextValue) => {
      setToSealed($combined, {
        ...$combined(),
        [key]: nextValue,
      });
    });
  });

  seal($combined);

  return $combined as ReactiveVar<{
    [K in keyof Config]: ReturnType<Config[K]>;
  }>;
};

export default combine;
