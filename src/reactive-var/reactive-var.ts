type Listener<T> = (value: T) => void;

type ReactiveVar<T> = ((next?: T) => T) & {
  onChange: (listener: Listener<T>) => () => void;
};

function defaultEqualityFn<T>(a: T, b:T) {
  return a === b;
}

function reactiveVar<T>(initialState: T, equalityFn = defaultEqualityFn<T>): ReactiveVar<T> {
  const listeners = new Set<Listener<T>>();
  let state = initialState;

  function notifyListeners() {
    listeners.forEach((listener) => {
      listener(state);
    });
  }

  function setState(next: T) {
    if (!equalityFn(state, next)) {
      state = next;

      notifyListeners();
    }
  }

  function call(...args: [] | [T]) {
    if (args.length) {
      const [nextState] = args;

      setState(nextState);
    }

    return state;
  }

  call.onChange = function onChange(listener: Listener<T>) {
    if (!listeners.has(listener)) {
      listeners.add(listener);
    }

    return () => {
      listeners.delete(listener);
    };
  };

  return call as ReactiveVar<T>;
}

export default reactiveVar;
