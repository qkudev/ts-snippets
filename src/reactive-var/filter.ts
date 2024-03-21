import reactiveVar from './reactive-var';
import { ReactiveVar } from './reactive-var.types';
import { seal, setToSealed } from './utils';

function filter<T>(
  $value: ReactiveVar<T>
): (predicate: (value: T) => boolean) => ReactiveVar<T>;

function filter<T>(
  $value: ReactiveVar<T>,
  predicate: (value: T) => boolean
): ReactiveVar<T>;

function filter<T>($value: ReactiveVar<T>, predicate?: (value: T) => boolean) {
  if (!predicate) {
    return (curriedPredicate: (value: T) => boolean) =>
      filter($value, curriedPredicate);
  }

  const filtered = reactiveVar(
    predicate($value()) ? $value() : (undefined as unknown as T)
  );
  seal(filtered);

  $value.onChange((next) => {
    if (predicate(next)) {
      setToSealed(filtered, next);
    }
  });

  return filtered;
}

export default filter;
