import { generateId, getId } from '../id';
import reactive from '../reactive';

describe('generateId', () => {
  it('should generate id', () => {
    const id = generateId();

    expect(id).toBeDefined();
  });

  it('should generate unique id', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toBe(id2);
  });
});

describe('getId', () => {
  it('should return ID of the var', () => {
    const $x = reactive(1);

    const id = getId($x);

    expect(id).toBeDefined();
  });
});
