import Queue from '../queue';

describe('Queue', () => {
  it('enqueues value and has right order to pop values', () => {
    const q = new Queue<number>();

    q.enqueue(1);
    expect(q.peek()).toEqual(1);
    expect(q.empty).toEqual(false);

    q.enqueue(2);
    expect(q.peek()).toEqual(1);

    expect(q.dequeue()!).toEqual(1);
    expect(q.dequeue()!).toEqual(2);
    expect(q.empty).toEqual(true);
  });

  it('stores size state', () => {
    const q = new Queue<number>();
    expect(q.empty).toEqual(true);
    expect(q.size).toEqual(0);

    q.enqueue(1);
    expect(q.empty).toEqual(false);
    expect(q.size).toEqual(1);

    q.enqueue(2);
    expect(q.size).toEqual(2);

    q.dequeue();
    q.dequeue();

    expect(q.empty).toEqual(true);
    expect(q.size).toEqual(0);
  });

  it('gets values by index', () => {
    const q1 = new Queue([1, 2]);

    expect(q1.at(0)).toEqual(1);
    expect(q1.at(1)).toEqual(2);
    expect(q1.at(3)).toEqual(undefined);
    expect(() => q1.at(-1)).toThrow('Index is lower than 0');

    const q2 = new Queue([1, 2, 3, 4]);
    q2.dequeue();
    q2.enqueue(5);

    for (let i = 0; i < q2.size; i++) {
      expect(q2.at(i)).toEqual(i + 2);
    }
  });

  it('should be iterable and save correct order', () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    expect([...q]).toStrictEqual([1, 2, 3]);
  });

  it('should create stack by static method', () => {
    const q = Queue.from([1, 2, 3]);

    expect([...q]).toStrictEqual([1, 2, 3]);

    function* iterable() {
      let i = 0;
      while (i < 3) {
        yield i;
        i++;
      }
    }
    const q2 = Queue.from(iterable());

    expect([...q2]).toEqual([0, 1, 2]);
  });

  it('should push many items at one time', () => {
    const q = new Queue<number>();
    q.enqueue(1, 2, 3);

    expect([...q]).toStrictEqual([1, 2, 3]);
  });

  it('should create stack by given iterable', () => {
    const q = new Queue([1, 2, 3]);

    expect([...q]).toStrictEqual([1, 2, 3]);
  });

  it('works with "for" cycle', () => {
    const q = new Queue([1, 2, 3]);
    let i = 1;

    for (const el of q) {
      expect(el).toEqual(i);
      i++;
    }
  });

  it('clears', () => {
    const q = new Queue([1, 2, 3]);
    q.clear();

    expect([...q]).toStrictEqual([]);
  });
});
