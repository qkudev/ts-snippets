type Comparator<T> = (a: T, b: T) => number;

/**
 * A class representing a heap data structure.
 * @template T The type of elements stored in the heap.
 */
class Heap<T> {
  /**
   * The internal state of the heap.
   * @private
   */
  private state: T[] = [null as any];

  /**
   * The real size of the heap.
   * @private
   */
  private realSize = 0;

  /**
   * Creates a new instance of the Heap class.
   * @param compareFn A function used to compare elements in the heap.
   */
  constructor(private readonly compareFn: Comparator<T>) {}

  /**
   * Adds an element to the heap.
   * @param val The element to add to the heap.
   */
  public push = (val: T) => {
    this.realSize++;
    this.state.push(val);

    let index = this.state.length - 1;
    let parentIndex = Math.floor(index / 2);

    while (
      index > 1 &&
      parentIndex > 0 &&
      this.compare(index, parentIndex) < 0
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  /**
   * Removes and returns the smallest element from the heap.
   * @returns The smallest element in the heap, or undefined if the heap is empty.
   */
  public pop = (): T | undefined => {
    if (this.realSize === 0) {
      return undefined;
    }
    if (this.realSize === 1) {
      this.realSize = 0;
      return this.state.pop()!;
    }

    const returnValue = this.state[1];
    this.realSize--;
    this.state[1] = this.state.pop()!;

    let index = 1;
    while (index <= this.realSize / 2) {
      const left = index * 2;
      const right = index * 2 + 1;
      if (this.compare(index, left) > 0 || this.compare(index, right) > 0) {
        if (this.compare(right, left) > 0) {
          this.swap(index, left);
          index = left;
        } else {
          this.swap(index, right);
          index = right;
        }
      } else {
        break;
      }
    }

    return returnValue;
  };

  /**
   * Returns the smallest element in the heap without removing it.
   * @returns The smallest element in the heap, or undefined if the heap is empty.
   */
  public peek = (): T | undefined => this.state[1];

  /**
   * Returns the number of elements in the heap.
   */
  public get size(): number {
    return this.realSize;
  }

  /**
   * Compares two elements in the heap.
   * @param i The index of the first element to compare.
   * @param j The index of the second element to compare.
   * @returns A negative number if the first element is smaller, a positive number if the second element is smaller, or zero if they are equal.
   * @private
   */
  private compare = (i: number, j: number) => {
    if (this.state[j] === undefined) {
      if (this.state[i] === undefined) {
        return 0;
      }
      return -1;
    }
    if (this.state[i] === undefined) {
      return 1;
    }

    return this.compareFn(this.state[i], this.state[j]);
  };

  /**
   * Swaps two elements in the heap.
   * @param i The index of the first element to swap.
   * @param j The index of the second element to swap.
   * @private
   */
  private swap = (i: number, j: number) => {
    const temp = this.state[i];
    this.state[i] = this.state[j];
    this.state[j] = temp;
  };
}

export default Heap;
