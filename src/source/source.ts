import Queue from '../queue/queue-v2';

type Release = () => void;

/**
 * A container with an internal buffer with `write` and `pull` methods.
 * The `write` method sends given value to the internal buffer and
 * the `pull` method return next value from the internal buffer or
 * waits for the next `write` and returns it.
 */
class Source<T> {
  private readonly buffer: Queue<T> = new Queue();

  private readonly pullQueue: Queue<Release> = new Queue();

  /**
   * Returns next data chunk from the buffer. Waits for the next
   * data chunk if the buffer is empty.
   */
  public async pull(): Promise<T> {
    if (this.buffer.isEmpty) {
      await new Promise<void>((resolve) => {
        this.pullQueue.enqueue(resolve);
      });
    }

    return this.buffer.dequeue() as T;
  }

  /**
   * Sends given data to the buffer.
   */
  public write(data: T): void {
    this.buffer.enqueue(data);

    if (!this.pullQueue.isEmpty) {
      const release = this.pullQueue.dequeue() as Release;
      release();
    }
  }

  /**
   * Returns current buffer size.
   */
  public get buffeSize(): number {
    return this.buffer.size;
  }

  /**
   * Returns number of `pull` calls that
   * wait for the next data chunk.
   */
  public get pullQeueSize(): number {
    return this.pullQueue.size;
  }
}

export default Source;
