import { reactiveVar } from '../reactive-var';

describe('reactive var', () => {
  it('should set initial state', () => {
    const reactive = reactiveVar({ a: 1 });

    expect(reactive()).toEqual({ a: 1 });
  });

  it('should set next value', () => {
    const reactive = reactiveVar({ a: 1 });

    expect(reactive({ a: 2 })).toEqual({ a: 2 });
  });

  it('should handle listeners', () => {
    const reactive = reactiveVar({ a: 1 });
    const listener = jest.fn();
    const unsubscribe = reactive.onChange(listener);

    reactive({ a: 2 });

    expect(listener).toHaveBeenCalledWith({ a: 2 });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    reactive({ a: 3 });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
