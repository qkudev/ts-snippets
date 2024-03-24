import reactive from '../reactive';
import reduce from '../reduce';

describe('reduce', () => {
  const $action = reactive({
    type: '@@init',
  });

  const createReducer = reduce($action);

  const reducer = (counter: number, action: { type: string }) => {
    switch (action.type) {
      case 'inc':
        return counter + 1;
      default:
        return counter;
    }
  };

  it('should create reducer', () => {
    const $counter = createReducer(reducer, 0);
    $action({
      type: 'inc',
    });
    $action({
      type: 'inc',
    });

    expect($counter()).toBe(2);
  });

  it('should be curried 1', () => {
    const $counter = reduce($action, reducer)(0);
    $action({ type: 'inc' });

    expect($counter()).toBe(1);
  });

  it('should be curried 2', () => {
    const $counter = reduce($action)(reducer)(0);

    $action({ type: 'inc' });

    expect($counter()).toBe(1);
  });

  it('should be sealed', () => {
    const $counter = reduce($action, reducer, 0);

    $counter(10);

    expect($counter()).toBe(0);
  });
});
