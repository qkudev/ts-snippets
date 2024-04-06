import LinkedList from '../linked-list';

describe('Linked list', () => {
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

    expect(list.at(0)).toBe(2);
    expect(list.at(1)).toBe(1);
    expect(list.size).toBe(2);
  });

  it('should insert into head', () => {
    list.insert(1);

    expect(list.size).toBe(1);
    expect(list.isEmpty).toBe(false);

    expect(list.peek()).toBe(1);
  });

  it('should insert many into head', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);

    expect(list.size).toBe(3);
    expect(list.isEmpty).toBe(false);

    expect(list.peek()).toBe(3);
  });

  it('should shift', () => {
    [1, 2, 3].forEach((value) => {
      list.insert(value);
    });

    expect(list.shift()).toBe(3);
    expect(list.size).toBe(2);
    expect(list.peek()).toBe(2);

    expect(list.shift()).toBe(2);
    expect(list.size).toBe(1);
    expect(list.peek()).toBe(1);

    expect(list.shift()).toBe(1);
    expect(list.size).toBe(0);
    expect(list.peek()).toBe(undefined);
  });

  it('should return value at the index (head insert)', () => {
    [1, 2, 3].forEach((value) => {
      list.insert(value);
    });

    for (let i = 0; i < 3; i++) {
      expect(list.at(i)).toBe(3 - i);
    }
  });

  it('should work with iterator', () => {
    [1, 2, 3].forEach((value) => {
      list.insert(value);
    });

    expect([...list]).toEqual([3, 2, 1]);
  });

  it('should clear state', () => {
    [1, 2, 3].forEach((value) => {
      list.insert(value);
    });

    list.clear();

    expect(list.size).toBe(0);
    expect(list.peek()).toBe(undefined);
  });
});
