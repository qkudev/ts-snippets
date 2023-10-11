export interface Action {
  type: string;
}

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type Listener<S> = (state: S) => void;

export type Unsubscribe = () => void;

export interface Store<S, A extends Action = Action> {
  dispatch: (action: A) => void;
  getState: () => S;
  subscribe: (listener: Listener<S>) => Unsubscribe;
}

export const createStore = <S, A extends Action = Action>(
  reducer: Reducer<S, A>,
  initialState: S,
): Store<S, A> => {
  let state = initialState;
  const listeners = new Set<Listener<S>>();

  const notifyListeners = () => {
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const setState = (next: S) => {
    if (state !== next) {
      state = next;

      notifyListeners();
    }
  };

  const dispatch = (action: A) => {
    const nextState = reducer(state, action);

    setState(nextState);
  };

  const getState = () => state;

  const subscribe = (listener: Listener<S>): Unsubscribe => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
};
