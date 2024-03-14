import TreeNode from './tree-node';

const postorderTraversal = <T, R>(
  head: TreeNode<T> | null,
  callback: (value: T) => R
) => {
  if (!head) {
    return;
  }

  head.children.forEach((child) => {
    postorderTraversal(child, callback);
  });

  callback(head.value);
};

export default postorderTraversal;
