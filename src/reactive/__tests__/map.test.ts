import map from '../map';
import reactive from '../reactive';

describe('filter', () => {
  const double = (value: number) => value * 2;

  it('should create doubled variable', () => {
    const $x = reactive(2);

    const $doubledX = map($x, double);

    expect($doubledX()).toBe(4);
  });

  it('should update mapped variable', () => {
    const $x = reactive(2);
    const $doubledX = map($x, double);

    $x(4);

    expect($doubledX()).toBe(8);
  });

  it('should call listener on update', () => {
    const $x = reactive(2);
    const $doubled = map($x, double);
    const listener = jest.fn();
    $doubled.onChange(listener);

    $x(4);

    expect(listener).toHaveBeenCalledWith(8);
  });

  it('should be carried', () => {
    const $x = reactive(2);
    const mapX = map($x);
    const $doubledX = mapX(double);

    $x(4);

    expect($doubledX()).toBe(8);
  });
});
