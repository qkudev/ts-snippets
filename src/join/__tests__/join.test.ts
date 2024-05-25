import join from '../join';

describe('join', () => {
  const createdAt = new Date().valueOf();

  const user1 = {
    id: 1,
    createdAt,
  };
  const profile1 = {
    id: 1,
    username: 'johny262',
  };

  const user2 = {
    id: 2,
    createdAt,
  };
  const profile2 = {
    id: 2,
    username: 'test',
  };

  it('should work with empty arrays', () => {
    const result = join('id', [], []);

    expect(result).toEqual([]);
  });

  it('should return new array even if result is equal to original', () => {
    const users = [user1, user2];

    const result = join('id', users, []);

    expect(result).not.toBe(users);
  });

  it('should join simple objects', () => {
    const result = join('id', [user1], [profile1]);

    expect(result).toEqual([
      {
        id: 1,
        username: profile1.username,
        createdAt,
      },
    ]);
  });

  it('should join right missing', () => {
    const result = join('id', [user1, user2], [profile1]);

    expect(result).toEqual([
      {
        ...user1,
        ...profile1,
      },
      user2,
    ]);
  });

  it('should join left missing', () => {
    const result = join('id', [user1], [profile1, profile2]);

    expect(result).toEqual([
      {
        ...user1,
        ...profile1,
      },
      profile2,
    ]);
  });
});
