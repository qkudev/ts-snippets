import filter from '../filter';
import reactive from '../reactive';

describe('filter', () => {
  const isEven = (value: number) => value % 2 === 0;

  it('should create filtered variable', () => {
    const $x = reactive(2);

    const $evenX = filter($x, isEven);

    expect($evenX()).toBe(2);
  });

  it('should update filtered variable', () => {
    const $x = reactive(2);
    const $evenX = filter($x, isEven);

    $x(4);

    expect($evenX()).toBe(4);
  });

  it('should filter updates', () => {
    const $x = reactive(2);
    const $evenX = filter($x, isEven);

    $x(3);

    expect($evenX()).toBe(2);
  });

  it('returns undefined if initial value is not accepted by predicate', () => {
    const $x = reactive(1);

    const $evenX = filter($x, isEven);

    expect($evenX()).toBe(undefined);
  });

  it('should call listener on update', () => {
    const $x = reactive(2);
    const $evenX = filter($x, isEven);
    const listener = jest.fn();
    $evenX.onChange(listener);

    $x(4);

    expect(listener).toHaveBeenCalledWith(4);
  });

  it('should be carried', () => {
    const $x = reactive(2);
    const filterX = filter($x);
    const $evenX = filterX(isEven);

    $x(4);

    expect($evenX()).toBe(4);
  });
});
