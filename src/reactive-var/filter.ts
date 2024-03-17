import reactiveVar from './reactive-var';
import { ReactiveVar } from './reactive-var.types';
import { freeze, setToFrozen } from './utils';

const filter = <T>(
  $value: ReactiveVar<T>,
  predicate: (value: T) => boolean
) => {
  const filtered = reactiveVar(
    predicate($value()) ? $value() : (undefined as unknown as T)
  );
  freeze(filtered);

  $value.onChange((next) => {
    if (predicate(next)) {
      setToFrozen(filtered, next);
    }
  });

  return filtered;
};

export default filter;
