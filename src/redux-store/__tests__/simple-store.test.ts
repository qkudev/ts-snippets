import { createStore, Store } from '../simple-store';

describe('redux store', () => {
  type State = number;
  const counter = (state: State, action: { type: string }) => {
    switch (action.type) {
      case 'inc':
        return state + 1;

      default:
        return state;
    }
  };

  let store: Store<State>;

  beforeEach(() => {
    store = createStore(counter, 0);
  });

  it('should create store', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeInstanceOf(Function);
    expect(store.getState).toBeInstanceOf(Function);
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.getState()).toEqual(0);
  });

  it('should dispatch action', () => {
    store.dispatch({
      type: 'inc',
    });

    const nextState = store.getState();

    expect(nextState).toEqual(1);
  });

  it('should handle subscriptions', () => {
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener);

    store.dispatch({
      type: 'inc',
    });

    expect(listener).toHaveBeenCalledWith(1);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    store.dispatch({
      type: 'inc',
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
