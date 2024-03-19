import reactiveVar from '../reactive-var';

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

  it('should not call listeners if state not truly changed', () => {
    const reactive = reactiveVar(1);
    const listener = jest.fn();
    reactive.onChange(listener);

    reactive(1);

    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('should use given equality fn', () => {
    const reactive = reactiveVar(
      { a: 1 },
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );
    const listener = jest.fn();
    reactive.onChange(listener);

    reactive({ a: 1 });

    expect(listener).toHaveBeenCalledTimes(0);
    expect(reactive()).toEqual({ a: 1 });
  });

  it('should map to other value', () => {
    const x = reactiveVar(1);
    const y = x.map((v) => v * 2);

    const listener = jest.fn();
    y.onChange(listener);

    x(2);

    expect(y()).toEqual(4);
    expect(listener).toHaveBeenCalledWith(4);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should not set to piped value', () => {
    const x = reactiveVar(1);
    const piped = x.map((v) => v * 2);

    piped(10);

    expect(piped()).toBe(2);
  });
});
