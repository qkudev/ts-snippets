import map from '../map';
import reactiveVar from '../reactive-var';

describe('filter', () => {
  it('should create doubled variable', () => {
    const x = reactiveVar(2);

    const doubled = map(x, (value) => value * 2);

    expect(doubled()).toBe(4);
  });

  it('should update mapped variable', () => {
    const x = reactiveVar(2);
    const doubled = map(x, (value) => value * 2);

    x(4);

    expect(doubled()).toBe(8);
  });

  it('should call listener on update', () => {
    const x = reactiveVar(2);
    const doubled = map(x, (value) => value * 2);
    const listener = jest.fn();
    doubled.onChange(listener);

    x(4);

    expect(listener).toHaveBeenCalledWith(8);
  });

  it('should be carried', () => {
    const x = reactiveVar(2);
    const mapX = map(x);
    const doubled = mapX((value) => value * 2);

    x(4);

    expect(doubled()).toBe(8);
  });
});
