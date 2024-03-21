import reactive from '../reactive';
import { seal, unseal } from '../utils';

describe('seal', () => {
  it('should freeze given reactive var', () => {
    const $x = reactive(1);

    seal($x);

    expect($x(10)).toBe(1);
  });
});

describe('unseal', () => {
  it('should unfreeze reactive var', () => {
    const $x = reactive(1);
    seal($x);

    unseal($x);

    expect($x(10)).toBe(10);
  });
});
