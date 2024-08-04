import createTestState from '../test-state-builder';

enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

describe('createTestState', () => {
  const initialState = {
    input: 'test',
    user: {
      id: 1,
      username: 'john',
      role: {
        id: 1,
        type: ROLE.ADMIN,
        banned: false as boolean,
      },
    },
    toggle: true as boolean,
  };

  let builder = createTestState(initialState);

  beforeEach(() => {
    builder = createTestState(initialState);
  });

  it('should build state', () => {
    const state = builder.build();

    expect(state).toEqual(initialState);
  });

  it('should set primitive property', () => {
    const state = builder.input('1234').build();

    expect(state.input).toEqual('1234');
  });

  it('should set boolean property', () => {
    // @ts-expext-error fix ts here
    const state = builder.toggle(false).build();

    expect(state.toggle).toEqual(false);
  });

  it('should set object as prop', () => {
    const state = builder
      .user({
        id: 2,
        username: 'Gregory',
        role: initialState.user.role,
      })
      .build();

    expect(state.user).toEqual({
      id: 2,
      username: 'Gregory',
      role: initialState.user.role,
    });
  });

  it('should set nested prop', () => {
    const state = builder.user.id(2).build();

    expect(state).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        id: 2,
      },
    });
  });

  it('should create clone', () => {
    const state = builder.input('1234').clone().build();

    expect(state).toEqual({
      ...initialState,
      input: '1234',
    });
  });

  it('should not affect previously built states on next modifications', () => {
    const state1 = builder
      .input('1234')
      .user.username('Gregory')
      .toggle(false)
      .build();
    const state2 = builder.input('4321').user.id(2).build();
    builder.user({
      id: 2,
      username: 'qwe',
      role: initialState.user.role,
    });

    expect(state1).toEqual({
      ...initialState,
      input: '1234',
      user: {
        id: 1,
        username: 'Gregory',
        role: initialState.user.role,
      },
      toggle: false,
    });

    expect(state2).toEqual({
      ...initialState,
      input: '4321',
      user: {
        id: 2,
        username: 'Gregory',
        role: initialState.user.role,
      },
      toggle: false,
    });
  });

  it('should reset internal state', () => {
    const state = builder.input('1234').toggle(false).reset().build();

    expect(state).toEqual(initialState);
  });

  it('should work with enums', () => {
    const state = builder.user.role.type(ROLE.ADMIN).build();

    expect(state.user.role.type).toBe(ROLE.ADMIN);
  });
});
