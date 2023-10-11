class MinHeap {
  private minHeap: number[] = [];

  private realSize: number = 0;

  constructor() {
    this.minHeap = [0];
    this.minHeap[0] = 0;
  }

  public add = (element: number) => {
    this.minHeap.push(element);
    this.realSize++;

    let index = this.realSize;

    // Parent node of the newly added element
    // Note if we use an array to represent the complete binary tree
    // and store the root node at index 1
    // index of the parent node of any node is [index of the node / 2]
    // index of the left child node is [index of the node * 2]
    // index of the right child node is [index of the node * 2 + 1]
    let parentIndex = Math.floor(index / 2);

    // If the newly added element is smaller than its parent node,
    // its value will be exchanged with that of the parent node
    while (this.minHeap[index] < this.minHeap[parentIndex] && index > 1) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  public peek = (): number | undefined => this.minHeap[1];

  public pop = (): number | undefined => {
    if (this.realSize < 1) {
      return undefined;
    }
    if (this.realSize === 1) {
      this.realSize = 0;
      return this.minHeap.pop();
    }

    const removeElement = this.minHeap[1];
    this.minHeap[1] = this.minHeap.pop()!;
    this.realSize--;

    let index = 1;
    while (index <= this.realSize / 2) {
      const left = index * 2;
      const right = index * 2 + 1;
      if (
        this.minHeap[index] > this.minHeap[left]
        || this.minHeap[index] > this.minHeap[right]
      ) {
        if (
          this.minHeap[left] < this.minHeap[right]
          || this.minHeap[right] === undefined
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
    const temp = this.minHeap[i];
    this.minHeap[i] = this.minHeap[j];
    this.minHeap[j] = temp;
  };
}

export default MinHeap;
