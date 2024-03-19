import reactiveVar from './reactive-var';
import { ReactiveVar } from './reactive-var.types';
import { freeze, setToFrozen } from './utils';

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
  freeze(mapped);

  $value.onChange((next) => {
    setToFrozen(mapped, callback(next));
  });

  return mapped;
}

export default map;
