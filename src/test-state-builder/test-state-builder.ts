type TestStatePrimitive<Type, Parent> = (value: Type) => Parent;

type TestStateObject<State extends object, Parent> = TestStatePrimitive<
  State,
  Parent
> & {
  [Key in keyof State]: State[Key] extends object
    ? TestStateObject<State[Key], Parent>
    : TestStatePrimitive<State[Key], Parent>;
};

type TestStateRoot<State extends object> = {
  (value: State): TestStateRoot<State>;
  build: () => State;
  clone: () => TestStateRoot<State>;
  reset: () => TestStateRoot<State>;
} & {
  [Key in keyof State]: State[Key] extends object
    ? TestStateObject<State[Key], TestStateRoot<State>>
    : TestStatePrimitive<State[Key], TestStateRoot<State>>;
};

// @todo: re-do
const set = (obj: object, path: string[], value: unknown) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const result = JSON.parse(JSON.stringify(obj));
  let current = result;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (
      !(key in current) ||
      typeof current[key] !== 'object' ||
      !current[key]
    ) {
      current[key] = {};
    }

    if (i === path.length - 1) {
      current[key] = value;
    } else {
      current = current[key];
    }
  }

  return result;
};

const createTestState = <State extends object>(initialState: State) => {
  const clone = <Type>(obj: Type) => JSON.parse(JSON.stringify(obj));

  const getInitialState = () => clone(initialState);

  let state = getInitialState();
  let cursor: string[] = [];

  const resetCursor = () => {
    cursor = [];
  };

  let proxy: TSFixMe;

  function builder(nextValue: TSFixMe) {
    state = set(state, cursor, nextValue);
    resetCursor();

    return proxy;
  }

  builder.clone = () => createTestState<State>(clone(state));

  builder.reset = () => {
    cursor = [];
    state = getInitialState();

    return proxy;
  };

  builder.build = () => {
    resetCursor();

    return clone(state);
  };

  proxy = new Proxy(builder, {
    get: (target, prop) => {
      if (prop in target || typeof prop === 'symbol') {
        return (target as TSFixMe)[prop];
      }

      cursor.push(prop);

      return proxy;
    },
    set: (target, prop, nextValue) => builder(nextValue),
  });

  return proxy as TestStateRoot<State>;
};

export default createTestState;
