import { MinHeap } from '../min-heap';

describe('MinHeap', () => {
  let heap: MinHeap;

  beforeEach(() => {
    heap = new MinHeap();
  });

  it('should be defined', () => {
    expect(heap).toBeDefined();
    expect(heap).toBeInstanceOf(MinHeap);
  });

  it('should add value and peek it ', () => {
    heap.add(8);
    expect(heap.peek()).toEqual(8);
  });

  it('should add many values and always return min value from peek', () => {
    heap.add(8);
    heap.add(10);
    expect(heap.peek()).toEqual(8);

    heap.add(6);
    expect(heap.peek()).toEqual(6);

    heap.add(9);
    expect(heap.peek()).toEqual(6);

    heap.add(5);
    expect(heap.peek()).toEqual(5);
  });

  it('should remove values in min order', () => {
    heap.add(5);
    heap.add(3);
    heap.add(4);
    heap.add(2);
    heap.add(1);

    for (let i = 1; i <= 5; i++) {
      const min = heap.pop();
      expect(min).toEqual(i);
    }

    expect.assertions(5);
  });

  it('should return size correctly', () => {
    const values = new Array(10).fill(0).map((_, i) => i + 1);

    values.forEach((val, i) => {
      heap.add(val);
      expect(heap.size).toEqual(i + 1);
    });

    values.forEach((_, i) => {
      const min = heap.pop();
      expect(min).toEqual(i + 1);
      expect(heap.size).toEqual(values.length - i - 1);
    });

    expect.assertions(values.length * 3);
  });
});
