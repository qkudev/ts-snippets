type Comparator<T> = (a: T, b: T) => number;

const nullOrUndefined = (val: unknown) => val === undefined || val === null;

export class TMinHeap<T> {
  private readonly heap: T[] = [null as any];

  private realSize = 0;

  constructor(private readonly _comparator: Comparator<T>) {}

  private comparator = (a?: T, b?: T) => {
    if (a === undefined) {
      return -1;
    }
    if (b === undefined) {
      return 1;
    }
    if (a === undefined && b === undefined) {
      return 0;
    }

    return this._comparator(a, b);
  };

  public add = (val: T) => {
    this.heap.push(val);
    this.realSize++;

    let index = this.realSize;
    let parentIndex = Math.floor(index / 2);

    while (
      !nullOrUndefined(this.heap[parentIndex]) &&
      this.comparator(this.heap[index], this.heap[parentIndex]) < 0 &&
      index > 1
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  public peek = (): T | undefined => {
    return this.heap[1];
  };

  public pop = (): T | undefined => {
    if (!this.realSize) {
      return undefined;
    }
    if (this.realSize === 1) {
      this.realSize = 0;
      return this.heap.pop();
    }

    const removeElement = this.heap[1];
    this.heap[1] = this.heap.pop()!;
    this.realSize--;

    let index = 1;
    while (index <= this.realSize / 2) {
      let left = index * 2;
      let right = index * 2 + 1;
      if (
        this.comparator(this.heap[left], this.heap[index]) < 0 ||
        (!nullOrUndefined(this.heap[right]) &&
          this.comparator(this.heap[right], this.heap[index]) < 0)
      ) {
        if (
          this.comparator(this.heap[left], this.heap[right]) >= 0 ||
          nullOrUndefined(this.heap[right])
        ) {
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

    return removeElement;
  };

  public get size() {
    return this.realSize;
  }

  private swap = (i: number, j: number) => {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  };
}
