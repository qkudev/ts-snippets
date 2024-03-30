import PriorityQueue from '../priority-queue';

type Element = {
  value: string;
};

describe('PriorityQueue', () => {
  it('should push elements to queue', () => {
    const pq = new PriorityQueue<Element>();
    pq.push({ value: 'Zeon' }, 1);

    expect(pq.peek()?.value).toEqual('Zeon');
    expect(pq.size).toEqual(1);

    pq.push({ value: 'Xerox' }, 0);
    expect(pq.peek()?.value).toEqual('Xerox');

    pq.push({ value: 'Zeus' }, 2);
    expect(pq.peek()?.value).toEqual('Xerox');
  });

  it('should work with same priority', () => {
    const pq = new PriorityQueue<Element>();
    pq.push({ value: 'Zeon' }, 0);

    expect(pq.peek()?.value).toEqual('Zeon');
    expect(pq.size).toEqual(1);

    pq.push({ value: 'Xerox' }, 0);
    expect(pq.peek()?.value).toEqual('Zeon');

    pq.push({ value: 'Zeus' }, 0);
    expect(pq.peek()?.value).toEqual('Zeon');

    const result: Element[] = [];
    while (pq.size) {
      result.push(pq.pop()!);
    }
    expect(result).toEqual([
      {
        value: 'Zeon',
      },
      {
        value: 'Xerox',
      },
      {
        value: 'Zeus',
      },
    ]);
  });
});
