import extractParams from '../extract-params';

describe('pathParams', () => {
  it('should extract 1 param', () => {
    const path = '/user/1';
    const params = extractParams('/user/:userId', path);

    expect(params).toEqual({ userId: '1' });
  });

  it('should extract 2 params', () => {
    const pattern = '/user/:user_id/followers/:user_id_1';
    const path = '/user/1/followers/10';

    const params = extractParams(pattern, path);

    expect(params).toEqual({
      user_id: '1',
      user_id_1: '10',
    });
  });

  it('should handle param as path', () => {
    const pattern = ':userId';
    const path = '1';

    const params = extractParams(pattern, path);

    expect(params).toEqual({
      userId: '1',
    });
  });

  it('should handle pattern with param on start', () => {
    const pattern = '/:userId/products/:productId';
    const path = '/1/products/10';

    const params = extractParams(pattern, path);

    expect(params).toEqual({
      userId: '1',
      productId: '10',
    });
  });

  it('should not extract wrong pattern params', () => {
    const pattern = '/user/as:user/followers';
    const path = '/user/asown/followers';

    const params = extractParams(pattern, path);

    expect(params).toEqual({});
  });
});
