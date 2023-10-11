import MaxHeap from '../max-heap';

describe('MaxHeap', () => {
  let heap: MaxHeap;

  beforeEach(() => {
    heap = new MaxHeap();
  });

  it('should be defined', () => {
    expect(heap).toBeDefined();
    expect(heap).toBeInstanceOf(MaxHeap);
  });

  it('should add value and peek it', () => {
    heap.add(5);
    expect(heap.peek()).toEqual(5);
  });

  it('should add many values and always peek max one', () => {
    heap.add(5);
    expect(heap.peek()).toEqual(5);

    heap.add(2);
    expect(heap.peek()).toEqual(5);

    heap.add(10);
    expect(heap.peek()).toEqual(10);
  });

  it('should remove values in max order', () => {
    heap.add(3);
    heap.add(2);
    heap.add(4);
    heap.add(1);
    heap.add(5);

    for (let i = 5; i > 0; i--) {
      const max = heap.pop();
      expect(max).toEqual(i);
    }
  });

  it('should return size correctly', () => {
    const values = new Array(10).fill(0).map((_, i) => i + 1);

    values.forEach((val, i) => {
      heap.add(val);
      expect(heap.size).toEqual(i + 1);
    });

    values.forEach((_, i) => {
      const max = heap.pop();
      expect(max).toEqual(values.length - i);
      expect(heap.size).toEqual(values.length - i - 1);
    });

    expect.assertions(values.length * 3);
  });
});
