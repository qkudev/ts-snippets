import Queue from '../queue';
import TreeNode from './tree-node';

const levelTraversal = <T, R>(
  head: TreeNode<T> | null,
  callback: (value: T) => R
) => {
  if (!head) {
    return;
  }

  const queue = new Queue<TreeNode<T>>();
  queue.push(head);
  while (!queue.empty) {
    const lvlSize = queue.size;

    for (let i = 0; i < lvlSize; i++) {
      const node = queue.pop()!;
      callback(node.value);

      for (const child of node.children) {
        if (child) {
          queue.push(child);
        }
      }
    }
  }
};

export default levelTraversal;
