import { bus } from './bus';
import { generateId, getId } from './id';
import {
  SetEventPayload,
  Id,
  ReactiveVarState,
  EqualityFn,
  Reactive,
} from './types';
import { defaultEqualityFn, isReactive } from './utils';

export const root = new Map<Id, ReactiveVarState<unknown>>();

export const createVar = <T>(
  initialValue: T,
  equalityFn: EqualityFn = defaultEqualityFn
): Id => {
  const id = generateId();

  root.set(id, {
    id,
    value: initialValue,
    sealed: false,
    equalityFn,
  });

  return id;
};

/**
 * Get value of reactive var
 * @param {Id | Reactive<T>} idOrVar id of the var or var itself
 * @returns {T} current value
 */
export const getValue = <T>(idOrVar: Id | Reactive<T>): T => {
  const id: Id = isReactive(idOrVar) ? getId(idOrVar) : (idOrVar as Id);

  return root.get(id)?.value as T;
};

bus.addListener(`set`, (payload: SetEventPayload<unknown>) => {
  const { id, value: callbackOrValue } = payload;

  const state = root.get(id);
  if (!state || state.sealed) {
    return;
  }

  const { equalityFn, value: current } = state;
  const next =
    typeof callbackOrValue === 'function'
      ? callbackOrValue(current)
      : callbackOrValue;

  if (equalityFn(current, next)) {
    return;
  }

  root.set(id, {
    ...state,
    value: next,
  });

  bus.emit(`change/${id}`, next);
});

bus.addListener('seal', (id: Id) => {
  const state = root.get(id);
  if (!state) {
    return;
  }

  state.sealed = true;
});

bus.addListener('unseal', (id: Id) => {
  const state = root.get(id);
  if (!state) {
    return;
  }

  state.sealed = false;
});
