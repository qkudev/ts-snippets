import StoreData from '../store-data';

describe('store-data', () => {
  let store = new StoreData();

  beforeEach(() => {
    store = new StoreData();
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
    expect(store).toBeInstanceOf(StoreData);
  });

  it('should set and get value', () => {
    store.set('test', 'value');

    expect(store.get('test')).toEqual('value');
  });

  it('should call listener on change', () => {
    const listener = jest.fn();

    const unsubscribe = store.subscribe('test', listener);
    store.set('test', 'value');

    expect(listener).toHaveBeenCalledWith('value');
    expect(listener).toHaveBeenCalledTimes(1);

    // should not call listener if value did not really changed
    store.set('test', 'value');
    expect(listener).toHaveBeenCalledWith('value');
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    store.set('test', 'other-value');
    expect(listener).toHaveBeenCalledWith('value');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should delete value', () => {
    store.set('test', 'value');
    store.delete('test');

    expect(store.get('test')).toEqual(undefined);
  });
});
