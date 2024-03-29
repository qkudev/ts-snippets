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
});
