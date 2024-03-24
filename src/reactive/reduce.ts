import reactive from './reactive';
import { Reactive, Reducer } from './types';
import { seal, unseal } from './utils';

/**
 * Accepts reactive var, reducer and initial state and creates new reactive var
 * that derives it's next state by given callback, next value of given reactive var
 * and it's own previous state.
 *
 * @example
 * const $action = reactive({ type: '@@init' });
 * const $counter = reduce($action, (counter, action) => {
 *   switch (action.type) {
 *    case 'increment': return counter + 1;
 *    default: return counter;
 *   }
 * }, 0);
 *
 * $counter()                 // 0
 * $action({ type: 'inc' });
 * $counter();                // 1
 */
function reduce<El>($element: Reactive<El>): {
  <S>(reducer: Reducer<S, El>): (initialState: S) => Reactive<S>;
  <S>(reducer: Reducer<S, El>, initialState: S): Reactive<S>;
};

function reduce<El, S>(
  $element: Reactive<El>,
  reducer: Reducer<S, El>
): (initialState: S) => Reactive<S>;

function reduce<El, S>(
  $element: Reactive<El>,
  reducer: Reducer<S, El>,
  initialState: S
): Reactive<S>;

function reduce<El, S>(
  ...args:
    | [Reactive<El>]
    | [Reactive<El>, Reducer<S, El>]
    | [Reactive<El>, Reducer<S, El>, S]
): any {
  const [$element] = args;
  if (args.length === 1) {
    return (
      ...curriedArgs: readonly [Reducer<S, El>] | readonly [Reducer<S, El>, S]
      // eslint-disable-next-line prefer-spread
    ) => reduce.apply(null, [$element, ...curriedArgs] as any);
  }
  if (args.length === 2) {
    const [, reducer] = args;

    return (initialState: S): Reactive<S> =>
      reduce($element, reducer, initialState);
  }

  const [, reducer, initialState] = args;
  const $reduced = reactive(initialState);
  seal($reduced);

  $element.onChange((el) => {
    unseal($reduced);
    $reduced((state) => reducer(state, el));
    seal($reduced);
  });

  return $reduced;
}

export default reduce;
