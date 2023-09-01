type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
  private state: T[] = [null as any];

  private realSize = 0;

  constructor(private readonly comparator: Comparator<T>) {}

  public push = (val: T) => {
    this.realSize++;
    this.state.push(val);

    let index = this.state.length - 1;
    let parentIndex = Math.floor(index / 2);

    while (index > 1 && parentIndex > 0 && this._comp(index, parentIndex) < 0) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

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
      let left = index * 2;
      let right = index * 2 + 1;
      if (this._comp(index, left) > 0 || this._comp(index, right) > 0) {
        if (this._comp(right, left) > 0) {
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

  public peek = (): T | undefined => {
    return this.state[1];
  };

  public get size(): number {
    return this.realSize;
  }

  private _comp = (i: number, j: number) => {
    if (this.state[j] === undefined) {
      if (this.state[i] === undefined) {
        return 0;
      }
      return -1;
    }
    if (this.state[i] === undefined) {
      return 1;
    }

    return this.comparator(this.state[i], this.state[j]);
  };

  private swap = (i: number, j: number) => {
    const temp = this.state[i];
    this.state[i] = this.state[j];
    this.state[j] = temp;
  };
}
