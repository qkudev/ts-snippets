import zip from '../zip';

describe('zip', () => {
  it('should zip 3 arrays', () => {
    const result = zip(
      // arrays
      ['a', 'b', 'c'],
      [1, 2, 3],
      [true, false, true]
    );

    expect(result).toEqual([
      ['a', 1, true],
      ['b', 2, false],
      ['c', 3, true],
    ]);
  });

  it('should validate args', () => {
    expect(() =>
      zip(
        [1, 2, 3],
        // @ts-expect-error for test
        false
      )
    ).toThrow(`Argument 2 is not an array. Received: boolean`);
  });
});
