import { bus, setEvent } from './bus';
import { getId } from './generate-id';
import { Listener, ReactiveVar } from './reactive-var.types';

function onChange<T>($var: ReactiveVar<T>): (listener: Listener<T>) => void;
function onChange<T>($var: ReactiveVar<T>, listener: Listener<T>): void;
function onChange<T>($var: ReactiveVar<T>, listener?: Listener<T>) {
  if (!listener) {
    return (curriedListener: Listener<T>) => onChange($var, curriedListener);
  }

  const eventName = setEvent(getId($var));
  bus.addListener(eventName, listener);

  return () => {
    bus.removeListener(eventName, listener);
  };
}

export default onChange;
