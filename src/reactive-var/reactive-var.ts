type Listener<T> = (value: T) => void;

type ReactiveVar<T> = ((next?: T) => T) & {
  onChange: (listener: Listener<T>) => () => void;
};

export function reactiveVar<T>(initialState: T): ReactiveVar<T> {
  const listeners = new Set<Listener<T>>();
  let state = initialState;

  function call(...args: [] | [T]) {
    if (!args.length) {
      return state;
    }

    const [nextState] = args;
    state = nextState;

    return state;
  }

  call.onChange = (listener: Listener<T>) => {
    if (!listeners.has(listener)) {
      listeners.add(listener);
    }

    return () => {
      listeners.delete(listener);
    };
  };

  return call as ReactiveVar<T>;
}
