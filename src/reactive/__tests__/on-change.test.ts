import reactive from '../reactive';
import onChange from '../on-change';

describe('onChange', () => {
  it('should call listener on change', () => {
    const $x = reactive(1);
    const listener = jest.fn();
    onChange($x, listener);

    $x(2);

    expect(listener).toHaveBeenCalledWith(2);
  });

  it('should not call listener if next value is equal', () => {
    const $x = reactive(1);
    const listener = jest.fn();
    onChange($x, listener);

    $x(1);

    expect(listener).not.toHaveBeenCalled();
  });

  it('should be curried', () => {
    const $x = reactive(1);
    const onChangeX = onChange($x);
    const listener = jest.fn();

    onChangeX(listener);
    $x(2);

    expect(listener).toHaveBeenCalledWith(2);
  });

  it('should unsubscribe', () => {
    const $x = reactive(1);
    const listener = jest.fn();
    const unsubscribe = onChange($x, listener);

    unsubscribe();
    $x(2);

    expect(listener).not.toHaveBeenCalled();
  });
});
