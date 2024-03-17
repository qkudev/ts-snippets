import combine from '../combine';
import reactiveVar from '../reactive-var';

describe('combine', () => {
  it('should combine reactive variables', () => {
    const combined = combine({
      x: reactiveVar(1),
      y: reactiveVar(2),
    });

    expect(combined()).toEqual({
      x: 1,
      y: 2,
    });
  });

  it('should update combined variable whenever child is updated', () => {
    const x = reactiveVar(1);
    const y = reactiveVar(2);

    const combined = combine({
      x,
      y,
    });

    x(4);

    expect(combined()).toEqual({
      x: 4,
      y: 2,
    });
  });

  it('should ignore set calls', () => {
    const combined = combine({
      x: reactiveVar(1),
      y: reactiveVar(2),
    });

    combined({
      x: 10,
      y: -1,
    });

    expect(combined()).toEqual({
      x: 1,
      y: 2,
    });
  });
});
