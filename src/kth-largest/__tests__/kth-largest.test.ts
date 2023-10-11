import KthLargest from '../kth-largest';

describe('KthLargest', () => {
  it('should return the kth largest element', () => {
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    expect(kthLargest.add(3)).toBe(4);
    expect(kthLargest.add(5)).toBe(5);
    expect(kthLargest.add(10)).toBe(5);
    expect(kthLargest.add(9)).toBe(8);
    expect(kthLargest.add(4)).toBe(8);
  });

  it('should return the kth largest element when k is 1', () => {
    const kthLargest = new KthLargest(1, []);
    expect(kthLargest.add(-3)).toBe(-3);
    expect(kthLargest.add(-2)).toBe(-2);
    expect(kthLargest.add(-4)).toBe(-2);
    expect(kthLargest.add(0)).toBe(0);
    expect(kthLargest.add(4)).toBe(4);
  });

  it('should return the kth largest element when k is equal to the length of the array', () => {
    const kthLargest = new KthLargest(4, [1, 2, 3, 4, 5]);
    expect(kthLargest.add(6)).toBe(3);
    expect(kthLargest.add(7)).toBe(4);
    expect(kthLargest.add(8)).toBe(5);
    expect(kthLargest.add(9)).toBe(6);
    expect(kthLargest.add(10)).toBe(7);
  });
});