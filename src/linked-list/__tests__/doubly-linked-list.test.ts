import LinkedList from '../doubly-linked-list';

describe('DoubleLinkedList', () => {
  let list = new LinkedList<number>();

  beforeEach(() => {
    list = new LinkedList();
  });

  it('should be defined', () => {
    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(LinkedList);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should accept initial values in constructor', () => {
    list = new LinkedList(1, 2);

    expect(list.peekHead()).toBe(1);
    expect(list.peekTail()).toBe(2);
    expect(list.size).toBe(2);
  });

  it('should insert a value into tail', () => {
    list.insertIntoTail(1);

    expect(list.size).toBe(1);
    expect(list.isEmpty).toBe(false);
    expect(list.peekHead()).toBe(1);
    expect(list.peekTail()).toBe(1);
  });

  it('should insert many into tail', () => {
    list.insertIntoTail(1);
    list.insertIntoTail(2);
    list.insertIntoTail(3);

    expect(list.size).toBe(3);
    expect(list.isEmpty).toBe(false);

    expect(list.peekHead()).toBe(1);
    expect(list.peekTail()).toBe(3);
  });

  it('should insert into head', () => {
    list.insertIntoHead(1);

    expect(list.size).toBe(1);
    expect(list.isEmpty).toBe(false);

    expect(list.peekHead()).toBe(1);
    expect(list.peekTail()).toBe(1);
  });

  it('should insert many into head', () => {
    list.insertIntoHead(1);
    list.insertIntoHead(2);
    list.insertIntoHead(3);

    expect(list.size).toBe(3);
    expect(list.isEmpty).toBe(false);

    expect(list.peekHead()).toBe(3);
    expect(list.peekTail()).toBe(1);
  });

  it('should shift', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoTail(value);
    });

    expect(list.shift()).toBe(1);
    expect(list.size).toBe(2);
    expect(list.peekHead()).toBe(2);

    expect(list.shift()).toBe(2);
    expect(list.size).toBe(1);
    expect(list.peekHead()).toBe(3);

    expect(list.shift()).toBe(3);
    expect(list.size).toBe(0);
    expect(list.peekTail()).toBe(undefined);
    expect(list.peekHead()).toBe(undefined);
    expect((list as any).head).toBe(null);
    expect((list as any).tail).toBe(null);
  });

  it('should pop', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoTail(value);
    });

    expect(list.pop()).toBe(3);
    expect(list.size).toBe(2);
    expect(list.peekTail()).toBe(2);

    expect(list.pop()).toBe(2);
    expect(list.size).toBe(1);
    expect(list.peekTail()).toBe(1);

    expect(list.pop()).toBe(1);
    expect(list.size).toBe(0);
    expect(list.peekTail()).toBe(undefined);
    expect(list.peekHead()).toBe(undefined);
    expect((list as any).head).toBe(null);
    expect((list as any).tail).toBe(null);
  });

  it('should return value at the index (head insert)', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoTail(value);
    });

    for (let i = 0; i < 3; i++) {
      expect(list.at(i)).toBe(i + 1);
    }
  });

  it('should return value at the index (head insert)', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoHead(value);
    });

    for (let i = 0; i < 3; i++) {
      expect(list.at(i)).toBe(3 - i);
    }
  });

  it('should work with iterator', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoTail(value);
    });

    expect([...list]).toEqual([1, 2, 3]);
  });

  it('should clear state', () => {
    [1, 2, 3].forEach((value) => {
      list.insertIntoHead(value);
    });

    list.clear();

    expect(list.size).toBe(0);
    expect(list.peekHead()).toBe(undefined);
    expect(list.peekTail()).toBe(undefined);
  });
});
