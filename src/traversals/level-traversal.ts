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
  queue.enqueue(head);
  while (!queue.isEmpty) {
    const lvlSize = queue.size;

    for (let i = 0; i < lvlSize; i++) {
      const node = queue.dequeue()!;
      callback(node.value);

      for (const child of node.children) {
        if (child) {
          queue.enqueue(child);
        }
      }
    }
  }
};

export default levelTraversal;
