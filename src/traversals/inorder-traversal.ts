import TreeNode from './tree-node';

const inorderTraversal = <T, R>(
  head: TreeNode<T> | null,
  callback: (value: T) => R
) => {
  if (!head) {
    return;
  }

  for (let i = 0; i < head.children.length - 1; i++) {
    inorderTraversal(head.children[i], callback);
  }

  callback(head.value);

  inorderTraversal(head.children[head.children.length - 1], callback);
};

export default inorderTraversal;
