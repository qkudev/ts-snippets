class TreeNode<T> {
  constructor(
    public readonly value: T,
    public children: Array<TreeNode<T> | null> = []
  ) {}
}

export default TreeNode;
