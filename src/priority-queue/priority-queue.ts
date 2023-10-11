import { Heap } from '../heap';

class QElement<T = unknown> {
  constructor(public readonly element: T, public readonly priority: number) {}
}

class PriorityQueue<T = unknown> {
  private heap = new Heap<QElement<T>>((a, b) => a.priority - b.priority);

  public push(element: T, priority: number) {
    const qElement = new QElement(element, priority);
    this.heap.push(qElement);
  }

  public pop(): T | undefined {
    return this.heap.pop()?.element;
  }

  public peek(): T | undefined {
    return this.heap.peek()?.element;
  }

  public get isEmpty(): boolean {
    return !this.heap.size;
  }

  public get size(): number {
    return this.heap.size;
  }
}

export default PriorityQueue;
