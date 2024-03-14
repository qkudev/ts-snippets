import TreeNode from './tree-node';

const preorderTraversal = <T, R>(
  head: TreeNode<T> | null,
  callback: (value: T) => R
) => {
  if (!head) {
    return;
  }

  callback(head.value);

  head.children.forEach((child) => {
    preorderTraversal(child, callback);
  });
};

export default preorderTraversal;
