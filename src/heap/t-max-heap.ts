type Comparator<T> = (a: T, b: T) => number;

const nullOrUndefined = (val: unknown) => val === undefined || val === null;

export class TMaxHeap<T> {
  private readonly maxHeap: T[] = [null as any];

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
    this.maxHeap.push(val);
    this.realSize++;

    let index = this.realSize;
    let parentIndex = Math.floor(index / 2);

    while (
      !nullOrUndefined(this.maxHeap[parentIndex]) &&
      this.comparator(this.maxHeap[index], this.maxHeap[parentIndex]) > 0 &&
      index > 1
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  public peek = (): T | undefined => {
    return this.maxHeap[1];
  };

  public pop = (): T | undefined => {
    if (!this.realSize) {
      return undefined;
    }
    if (this.realSize === 1) {
      this.realSize = 0;
      return this.maxHeap.pop();
    }

    const removeElement = this.maxHeap[1];
    this.maxHeap[1] = this.maxHeap.pop()!;
    this.realSize--;

    let index = 1;
    while (index <= this.realSize / 2) {
      let left = index * 2;
      let right = index * 2 + 1;
      if (
        this.maxHeap[right] !== undefined &&
        (this.comparator(this.maxHeap[left], this.maxHeap[index]) > 0 ||
          this.comparator(this.maxHeap[right], this.maxHeap[index]) > 0)
      ) {
        if (
          this.comparator(this.maxHeap[left], this.maxHeap[right]) >= 0 ||
          this.maxHeap[right] === undefined
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
    const temp = this.maxHeap[i];
    this.maxHeap[i] = this.maxHeap[j];
    this.maxHeap[j] = temp;
  };
}
