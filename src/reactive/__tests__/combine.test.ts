import combine from '../combine';
import reactive from '../reactive';

describe('combine', () => {
  it('should combine reactive variables', () => {
    const $combined = combine({
      x: reactive(1),
      y: reactive(2),
    });

    expect($combined()).toEqual({
      x: 1,
      y: 2,
    });
  });

  it('should update combined variable whenever child is updated', () => {
    const $x = reactive(1);
    const $y = reactive(2);

    const $combined = combine({
      x: $x,
      y: $y,
    });

    $x(4);

    expect($combined()).toEqual({
      x: 4,
      y: 2,
    });
  });

  it('should call listener on change of any child', () => {
    const $x = reactive(1);
    const $y = reactive(2);
    const $combined = combine({
      x: $x,
      y: $y,
    });

    const listener = jest.fn();
    $combined.onChange(listener);

    $x(4);

    expect(listener).toHaveBeenCalledWith({
      x: 4,
      y: 2,
    });
  });

  it('should ignore set calls', () => {
    const $combined = combine({
      x: reactive(1),
      y: reactive(2),
    });

    $combined({
      x: 10,
      y: -1,
    });

    expect($combined()).toEqual({
      x: 1,
      y: 2,
    });
  });
});
