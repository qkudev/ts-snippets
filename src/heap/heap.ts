type Comparator<T> = (a: T, b: T) => number;

class Heap<T> {
  private state: T[] = [null as any];

  private realSize = 0;

  constructor(private readonly compareFn: Comparator<T>) {}

  public push = (val: T) => {
    this.realSize++;
    this.state.push(val);

    let index = this.state.length - 1;
    let parentIndex = Math.floor(index / 2);

    while (index > 1 && parentIndex > 0 && this.compare(index, parentIndex) < 0) {
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

  public peek = (): T | undefined => this.state[1];

  public get size(): number {
    return this.realSize;
  }

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

  private swap = (i: number, j: number) => {
    const temp = this.state[i];
    this.state[i] = this.state[j];
    this.state[j] = temp;
  };
}

export default Heap;
