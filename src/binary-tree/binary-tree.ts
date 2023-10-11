/**
 * Represents a node in a binary tree.
 * @template T The type of the value stored in the node.
 */
class TNode<T> {
  /**
   * Creates a new instance of TNode.
   * @param val The value to be stored in the node.
   * @param left The left child node of the current node.
   * @param right The right child node of the current node.
   */
  constructor(
    public readonly val: T,
    public left: TNode<T> | null = null,
    public right: TNode<T> | null = null,
  ) {}
}

/**
 * Represents a binary tree.
 * @template T The type of the value stored in the tree.
 */
class BinaryTree<T> {
  private head: TNode<T> | null = null;

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  /**
   * Inserts a new value into the binary tree.
   * @param val The value to be inserted.
   */
  public readonly insert = (val: T) => {
    if (!this.head) {
      this.head = new TNode(val);
      return;
    }

    this.insertRecursively(val, this.head);
  };

  /**
   * Finds a node with the specified value in the binary tree.
   * @param val The value to be searched for.
   * @returns The node with the specified value, or null if not found.
   */
  public readonly find = (val: T) => {
    if (!this.head) {
      return null;
    }

    return this.findRecursively(val, this.head);
  }

  private insertRecursively = (val: T, parent: TNode<T>) => {
    if (this.comparator(val, parent.val) < 0) {
      if (!parent.left) {
        parent.left = new TNode(val);
      } else {
        this.insertRecursively(val, parent.left);
      }
    } else if (!parent.right) {
      parent.right = new TNode(val);
    } else {
      this.insertRecursively(val, parent.right);
    }
  };

  private findRecursively = (val: T, parent: TNode<T>): TNode<T> | null => {
    if (val === parent.val) {
      return parent;
    }

    if (this.comparator(val, parent.val) < 0) {
      return parent.left ? this.findRecursively(val, parent.left) : null;
    }

    return parent.right ? this.findRecursively(val, parent.right) : null;
  }
}

export default BinaryTree;
