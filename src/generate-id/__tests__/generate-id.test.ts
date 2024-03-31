import generateId from '../generate-id';

describe('generateId', () => {
  it('should generate random unique id', () => {
    const ids = new Array(100).fill(21).map(generateId);

    const idsSet = new Set(ids);

    expect(idsSet.size).toBe(ids.length);
  });

  it('should have correct length', () => {
    const id = generateId(32);

    expect(id.length).toBe(32);
  });
});
