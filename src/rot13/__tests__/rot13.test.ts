import rot13 from '../rot13';

describe('rot13', () => {
  it('should throw error if rotation is less than 0', () => {
    expect(() => rot13(-1)).toThrowError();
  });

  it('should rotate 3', () => {
    const rot3 = rot13(3);
    expect(rot3('abc')).toEqual('def');
  });

  it('should rotate 1', () => {
    const rot1 = rot13(1);

    expect(rot1('a')).toEqual('b');
  });

  it('should handle rotation bigger than alphabet size', () => {
    const rot25 = rot13(25);

    expect(rot25('a')).toEqual('a');
  });

  it('should work with upper cased letters', () => {
    const rot1 = rot13(1);

    expect(rot1('Ab')).toEqual('Bc');
  });
});
