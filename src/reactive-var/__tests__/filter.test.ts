import filter from '../filter';
import reactiveVar from '../reactive-var';

describe('filter', () => {
  it('should create filtered variable', () => {
    const x = reactiveVar(2);

    const even = filter(x, (value) => value % 2 === 0);

    expect(even()).toBe(2);
  });

  it('should update filtered variable', () => {
    const x = reactiveVar(2);
    const even = filter(x, (value) => value % 2 === 0);

    x(4);

    expect(even()).toBe(4);
  });

  it('should filter updates', () => {
    const x = reactiveVar(2);
    const even = filter(x, (value) => value % 2 === 0);

    x(3);

    expect(even()).toBe(2);
  });

  it('returns undefined if initial value is not accepted by predicate', () => {
    const x = reactiveVar(1);

    const even = filter(x, (value) => value % 2 === 0);

    expect(even()).toBe(undefined);
  });

  it('should call listener on update', () => {
    const x = reactiveVar(2);
    const even = filter(x, (value) => value % 2 === 0);
    const listener = jest.fn();
    even.onChange(listener);

    x(4);

    expect(listener).toHaveBeenCalledWith(4);
  });

  it('should be carried', () => {
    const x = reactiveVar(2);
    const filterX = filter(x);
    const even = filterX((value) => value % 2 === 0);

    x(4);

    expect(even()).toBe(4);
  });
});
