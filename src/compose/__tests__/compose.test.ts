import compose from '../compose';

describe('compose', () => {
  it('should compose two functions', () => {
    const double = (x: number) => x * 2;
    const toString = (x: number) => x.toString();

    const composed = compose(toString, double);
    const result = composed(2);

    expect(result).toBe('4');
  });

  it('should combine three functions', () => {
    const double = (x: number) => x * 2;
    const add10 = (x: number) => x + 10;
    const toString = (x: number) => x.toString();

    const composed = compose(toString, double, add10);
    const result = composed(10);

    expect(result).toBe('40');
  });

  it('should throw', () => {
    const double = (x: number) => x * 2;
    const toThrow = () => {
      throw new Error('test');
    };

    const composed = compose(toThrow, double);

    expect(() => composed(2)).toThrow('test');
  });

  it('should compose one function', () => {
    const double = (x: number) => x * 2;

    const composed = compose(double);
    const result = composed(2);

    expect(result).toBe(4);
  });
});
