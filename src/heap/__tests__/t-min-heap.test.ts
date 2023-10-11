import TMinHeap from '../t-min-heap';

type Item = {
  val: number;
};

describe('TMinHeap', () => {
  it('should return two most freq values', () => {
    const heap = new TMinHeap<Item>((a, b) => a.val - b.val);
    heap.add({
      val: 1,
    });
    heap.add({
      val: 2,
    });
    heap.add({
      val: 3,
    });

    const res: Item[] = [1, 1].map(() => heap.pop()!);
    expect(res).toEqual([{ val: 1 }, { val: 2 }]);
  });
});
