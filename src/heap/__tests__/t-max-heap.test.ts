import TMaxHeap from '../t-max-heap';

type Item = {
  val: number;
};

describe('TMaxHeap', () => {
  it('should return two most freq values', () => {
    const heap = new TMaxHeap<Item>((a, b) => a.val - b.val);
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
    expect(res).toEqual([{ val: 3 }, { val: 2 }]);
  });

  it('should 1', () => {

  });
});
