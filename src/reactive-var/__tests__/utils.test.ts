import reactiveVar from '../reactive-var';
import { freeze, unfreeze } from '../utils';

describe('freeze', () => {
  it('should freeze given reactive var', () => {
    const x = reactiveVar(1);

    freeze(x);

    expect(x(10)).toBe(1);
  });
});

describe('unfreeze', () => {
  it('should unfreeze reactive var', () => {
    const x = reactiveVar(1);
    freeze(x);

    unfreeze(x);

    expect(x(10)).toBe(10);
  });
});
