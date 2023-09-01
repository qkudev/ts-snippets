import { LinkedList } from '../linked-list';

describe('Linked list', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it('should add item to list', () => {
    list.add(1);
    list.add(2);

    expect(list.at(0)).toEqual(1);
    expect(list.at(1)).toEqual(2);
  });

  it('removes item from list', () => {
    list.add(1);
    list.add(2);

    list.remove(0);
    expect(list.head?.val).toEqual(2);

    list.remove(0);
    expect(list.size).toEqual(0);
    expect(list.empty).toBe(true);
  });

  it('should iterate', () => {
    list.add(1);
    list.add(2);

    expect([...list]).toEqual([1, 2]);

    list = new LinkedList<number>(...[1, 2, 3]);
    for (let i = 0; i < 3; i++) {
      expect(list.at(i)).toEqual(i + 1);
    }
  });

  it('should add to head', () => {
    list.addToHead(3);
    list.addToHead(2);
    list.addToHead(1);

    expect([...list]).toEqual([1, 2, 3]);

    list = new LinkedList();
    list.addToHead(...[3, 2, 1]);
    expect([...list]).toEqual([1, 2, 3]);
  });

  it('should concat', () => {
    list.add(1);
    list.add(2);
    const l2 = new LinkedList<number>(3, 4);

    expect([...list.concat(l2)]).toEqual([1, 2, 3, 4]);
  });
});
