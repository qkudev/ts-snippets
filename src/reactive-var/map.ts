import reactiveVar from './reactive-var';
import { ReactiveVar } from './reactive-var.types';
import { seal, setToSealed } from './utils';

function map<T>(
  $value: ReactiveVar<T>
): <R>(callback: (value: T) => R) => ReactiveVar<R>;

function map<T, R>(
  $value: ReactiveVar<T>,
  callback: (value: T) => R
): ReactiveVar<T>;

function map<T, R>($value: ReactiveVar<T>, callback?: (value: T) => R) {
  if (!callback) {
    return (curriedCallback: (value: T) => boolean) =>
      map($value, curriedCallback);
  }

  const mapped = reactiveVar(callback($value()));
  seal(mapped);

  $value.onChange((next) => {
    setToSealed(mapped, callback(next));
  });

  return mapped;
}

export default map;
