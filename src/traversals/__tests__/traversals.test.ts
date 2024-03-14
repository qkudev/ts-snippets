import inorderTraversal from '../inorder-traversal';
import levelTraversal from '../level-traversal';
import postorderTraversal from '../postorder-traversal';
import preorderTraversal from '../preorder-traversal';
import TreeNode from '../tree-node';

/**
 *      1
 *   2    3
 * 4   5    6
 */
const head = new TreeNode(1, [
  new TreeNode(2, [new TreeNode(4), new TreeNode(5)]),
  new TreeNode(3, [null, new TreeNode(6)]),
]);
// head.children[0] = new TreeNode(2, [new TreeNode(4), new TreeNode(5)]);
// head.children[1] = new TreeNode(3, [null, new TreeNode(6)]);

describe('inorder traversal', () => {
  it('should call given fn with inorder', () => {
    const cb = jest.fn();

    inorderTraversal(head, cb);

    [4, 2, 5, 1, 3, 6].forEach((value, i) => {
      expect(cb).nthCalledWith(i + 1, value);
    });
  });
});

describe('postorder traversal', () => {
  it('should call given fn with postorder', () => {
    const cb = jest.fn();

    postorderTraversal(head, cb);

    [4, 5, 2, 6, 3, 1].forEach((value, i) => {
      expect(cb).nthCalledWith(i + 1, value);
    });
  });
});

describe('preorder traversal', () => {
  it('should call given fn with preorder', () => {
    const cb = jest.fn();

    preorderTraversal(head, cb);

    [1, 2, 4, 5, 3, 6].forEach((value, i) => {
      expect(cb).nthCalledWith(i + 1, value);
    });
  });
});

describe('level traversal', () => {
  it('should call given fn with level traverse', () => {
    const cb = jest.fn();

    levelTraversal(head, cb);

    [1, 2, 3, 4, 5, 6].forEach((value, i) => {
      expect(cb).nthCalledWith(i + 1, value);
    });
  });
});
