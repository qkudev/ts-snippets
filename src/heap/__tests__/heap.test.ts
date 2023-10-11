import Heap from '../heap';

describe('Heap', () => {
  it('should push it well', () => {
    const maxHeap = new Heap<number>((a, b) => b - a);
    maxHeap.push(1);
    expect(maxHeap.peek()).toEqual(1);
    maxHeap.push(8);
    expect(maxHeap.peek()).toEqual(8);
    maxHeap.push(5);
    expect(maxHeap.peek()).toEqual(8);
    maxHeap.push(3);
    expect(maxHeap.peek()).toEqual(8);

    const minHeap = new Heap<number>((a, b) => a - b);
    minHeap.push(1);
    expect(minHeap.peek()).toEqual(1);
    minHeap.push(8);
    expect(minHeap.peek()).toEqual(1);
    minHeap.push(5);
    expect(minHeap.peek()).toEqual(1);
    minHeap.push(3);
    expect(minHeap.peek()).toEqual(1);
  });

  it('should pop', () => {
    const maxHeap = new Heap<number>((a, b) => b - a);
    maxHeap.push(1);
    maxHeap.push(8);
    maxHeap.push(5);
    maxHeap.push(3);

    let top = maxHeap.pop();
    expect(top).toEqual(8);
    top = maxHeap.pop();
    expect(top).toEqual(5);
    top = maxHeap.pop();
    expect(top).toEqual(3);
    top = maxHeap.pop();
    expect(top).toEqual(1);

    const minHeap = new Heap<number>((a, b) => a - b);
    minHeap.push(1);
    minHeap.push(8);
    minHeap.push(5);
    minHeap.push(3);

    top = minHeap.pop();
    expect(top).toEqual(1);
    top = minHeap.pop();
    expect(top).toEqual(3);
    top = minHeap.pop();
    expect(top).toEqual(5);
    top = minHeap.pop();
    expect(top).toEqual(8);
  });
});
