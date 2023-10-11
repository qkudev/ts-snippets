import BinaryTree from '../binary-tree';

describe('BinaryTree', () => {
  let binaryTree: BinaryTree<number>;

  beforeEach(() => {
    binaryTree = new BinaryTree<number>((a, b) => a - b);
  });

  describe('insert', () => {
    it('should insert a value into an empty tree', () => {
      binaryTree.insert(5);
      expect(binaryTree.find(5)).not.toBeNull();
    });

    it('should insert a value into a non-empty tree', () => {
      binaryTree.insert(5);
      binaryTree.insert(3);
      binaryTree.insert(7);
      expect(binaryTree.find(3)).not.toBeNull();
      expect(binaryTree.find(7)).not.toBeNull();
    });
  });

  describe('find', () => {
    it('should return null for an empty tree', () => {
      expect(binaryTree.find(5)).toBeNull();
    });

    it('should return null for a value not in the tree', () => {
      binaryTree.insert(5);
      expect(binaryTree.find(3)).toBeNull();
    });

    it('should return the node for a value in the tree', () => {
      binaryTree.insert(5);
      expect(binaryTree.find(5)).not.toBeNull();
    });
  });
});