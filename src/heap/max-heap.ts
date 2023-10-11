class MaxHeap {
  private readonly maxHeap: number[] = [0];

  private realSize = 0;

  public add = (val: number) => {
    this.maxHeap.push(val);
    this.realSize++;

    let index = this.maxHeap.length - 1;
    let parentIndex = Math.floor(index / 2);

    while (this.maxHeap[index] > this.maxHeap[parentIndex] && index > 1) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  public peek = (): number | undefined => this.maxHeap[1];

  public pop = (): number | undefined => {
    const removeElement = this.maxHeap[1];
    this.maxHeap[1] = this.maxHeap.pop()!;
    this.realSize--;

    let index = 1;
    while (index <= this.realSize / 2) {
      const left = index * 2;
      const right = index * 2 + 1;
      if (
        this.maxHeap[left] > this.maxHeap[index]
        || this.maxHeap[right] > this.maxHeap[index]
      ) {
        if (
          this.maxHeap[left] >= this.maxHeap[right]
          || this.maxHeap[right] === undefined
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

export default MaxHeap;
