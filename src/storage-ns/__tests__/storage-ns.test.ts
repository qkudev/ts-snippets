import StorageNS from '../storage-ns';

describe('StorageNS', () => {
  const namespace = 'test';
  let storage: StorageNS;

  beforeEach(() => {
    storage = new StorageNS(namespace);
    storage.clear();
  });

  afterEach(() => {
    storage.clear();
  });

  it('should set and get an item', () => {
    const key = 'key';
    const value = 'value';

    storage.setItem(key, value);

    expect(storage.getItem(key)).toBe(value);
  });

  it('should remove an item', () => {
    const key = 'key';
    const value = 'value';

    storage.setItem(key, value);
    storage.removeItem(key);

    expect(storage.getItem(key)).toBeNull();
  });

  it('should get an array of keys', () => {
    const keys = ['key1', 'key2', 'key3'];
    keys.forEach((key) => {
      storage.setItem(key, 'value');
    });

    expect(storage.keys()).toEqual(keys.map((key) => `${namespace}:${key}`));
  });

  it('should get the key at the specified index', () => {
    const keys = ['key1', 'key2', 'key3'];
    keys.forEach((key) => {
      storage.setItem(key, 'value');
    });

    expect(storage.key(1)).toBe(`${namespace}:${keys[1]}`);
  });

  it('should get the number of keys', () => {
    const keys = ['key1', 'key2', 'key3'];
    keys.forEach((key) => {
      storage.setItem(key, 'value');
    });

    expect(storage.length).toBe(keys.length);
  });

  it('should clear all items', () => {
    const keys = ['key1', 'key2', 'key3'];
    keys.forEach((key) => {
      storage.setItem(key, 'value');
    });

    storage.clear();

    expect(storage.length).toBe(0);
  });

  it('should have the same key for two different instances', () => {
    const s1 = new StorageNS('test1');
    const s2 = new StorageNS('test2');

    s1.setItem('test', '1');
    s2.setItem('test', '2');

    expect(s1.getItem('test')).not.toEqual(s2.getItem('test'));
    expect(s1.getItem('test')).toEqual('1');
    expect(s2.getItem('test')).toEqual('2');
  });
});
