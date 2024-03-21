import reactiveVar from '../reactive-var';
import { seal, unseal } from '../utils';

describe('freeze', () => {
  it('should freeze given reactive var', () => {
    const x = reactiveVar(1);

    seal(x);

    expect(x(10)).toBe(1);
  });
});

describe('unfreeze', () => {
  it('should unfreeze reactive var', () => {
    const x = reactiveVar(1);
    seal(x);

    unseal(x);

    expect(x(10)).toBe(10);
  });
});
