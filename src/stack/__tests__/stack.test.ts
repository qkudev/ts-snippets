import Stack from '../stack';

describe('Stack', () => {
  it('adds value and has right order to pop values', () => {
    const s = new Stack<number>();

    s.push(1);
    expect(s.peek()).toEqual(1);
    expect(s.empty).toEqual(false);

    s.push(2);
    expect(s.peek()).toEqual(2);

    expect(s.pop()!).toEqual(2);
    expect(s.pop()!).toEqual(1);
    expect(s.empty).toEqual(true);
  });

  it('stores size state', () => {
    const s = new Stack<number>();
    expect(s.empty).toEqual(true);
    expect(s.size).toEqual(0);

    s.push(1);
    expect(s.empty).toEqual(false);
    expect(s.size).toEqual(1);

    s.push(2);
    expect(s.size).toEqual(2);

    s.pop();
    s.pop();

    expect(s.empty).toEqual(true);
    expect(s.size).toEqual(0);
  });

  it('gets values by index', () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);

    expect(s.at(0)).toEqual(1);
    expect(s.at(1)).toEqual(2);
    expect(s.at(3)).toEqual(undefined);

    expect(() => s.at(-1)).toThrow('Index is lower than 0');
  });

  it('should be iterable and save correct order', () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    s.push(3);

    expect([...s]).toStrictEqual([3, 2, 1]);
  });

  it('should create stack by static method', () => {
    const s = Stack.from([1, 2, 3]);

    expect([...s]).toStrictEqual([3, 2, 1]);

    function* iterable() {
      let i = 0;
      while (i < 3) {
        yield i;
        i++;
      }
    }
    const s2 = Stack.from(iterable());

    expect([...s2]).toEqual([2, 1, 0]);
  });

  it('should push many items at one time', () => {
    const s = new Stack<number>();
    s.push(1, 2, 3);

    expect([...s]).toStrictEqual([3, 2, 1]);
  });

  it('should create stack by given iterable', () => {
    const s = new Stack([1, 2, 3]);

    expect([...s]).toStrictEqual([3, 2, 1]);
  });

  it('works with "for" cycle', () => {
    const s = new Stack([1, 2, 3]);
    let i = 3;

    for (const el of s) {
      expect(el).toEqual(i);
      i--;
    }
  });

  it('clears', () => {
    const s = new Stack([1, 2, 3]);
    s.clear();

    expect([...s]).toStrictEqual([]);
  });
});
