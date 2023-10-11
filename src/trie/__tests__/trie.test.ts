import Trie from '../trie';

type Item = {
  id: number;
  title: string;
};

const data: Item[] = [
  {
    id: 0,
    title: 'asap',
  },
  {
    id: 1,
    title: 'as',
  },
  {
    id: 2,
    title: 'peter',
  },
];

describe('Trie', () => {
  it('should add value', () => {
    const trie = new Trie<Item>('title');
    const [toAdd] = data;

    trie.add(toAdd);
    expect(trie.has(toAdd)).toBe(true);
  });

  it('should remove value', () => {
    const trie = new Trie<Item>('title', data);
    const [toRemove, ...rest] = data;

    trie.remove(toRemove);
    expect(trie.has(toRemove)).toBe(false);

    const hasRest = rest.every((item) => trie.has(item));
    expect(hasRest).toBe(true);
  });

  it('should find all words by prefix', () => {
    const trie = new Trie<Item>('title', data);

    const prefix = 'as';
    const result = trie.find(prefix);
    const resultByFilter = data
      .filter((item) => item.title.startsWith(prefix))
      .reverse();
    expect(result).toStrictEqual(resultByFilter);

    const empty = trie.find('qwe');
    expect(empty.length).toBe(0);
  });

  it('should return all items', () => {
    const trie = new Trie<Item>('title', data);

    expect(new Set(trie.items)).toEqual(new Set(data));
    expect(trie.items.length).toEqual(data.length);
  });
});
