type Nullable<T> = T | null;

// eslint-disable-next-line import/prefer-default-export
export class ListNode {
  constructor(
    public readonly val: number,
    public next: Nullable<ListNode> = null,
  ) {}
}

const insertToSorted = (
  node: Nullable<ListNode>,
  sortedHead: Nullable<ListNode>,
) => {
  // If no node, just return head
  if (!node) {
    return sortedHead;
  }

  // prevent mutations of original list nodes
  const newNode = new ListNode(node.val);

  // if incoming sorted list is empty, return newly created node as a new list
  if (!sortedHead) {
    return newNode;
  }

  // if current val is less than head val, insert it as a new head
  if (node.val < sortedHead.val) {
    newNode.next = sortedHead;

    return newNode;
  }

  let curr = sortedHead;
  let { next } = curr;

  while (next && next.val < newNode.val) {
    curr = next;
    next = next.next;
  }

  // end of list
  if (!next) {
    curr.next = newNode;
    // found node with greater value, insert it before
  } else {
    curr.next = newNode;
    newNode.next = next;
  }

  return sortedHead;
};

function insertionSortList(head: ListNode | null): ListNode | null {
  let curr = head;
  let result: ListNode | null = null;

  // iterate through list nodes and create new sorted list
  while (curr) {
    result = insertToSorted(curr, result);
    curr = curr.next;
  }

  return result;
}

export default insertionSortList;

