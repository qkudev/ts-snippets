import TinyURL from '../tiny-url';

describe('TinyURL', () => {
  const len = 6;
  let tinyURL = new TinyURL(len);

  beforeEach(() => {
    tinyURL = new TinyURL(len);
  });

  it('should encode url', () => {
    const testUrl = 'https://google.com';

    const encoded = tinyURL.encode(testUrl);

    expect(encoded).toHaveLength(len);
  });

  it('should decode url', () => {
    const testUrl = 'https://google.com';

    const encoded = tinyURL.encode(testUrl);
    const decoded = tinyURL.decode(encoded);

    expect(decoded).toEqual(testUrl);
  });

  it('should generate different keys for the same url', () => {
    const testUrl = 'https://google.com';

    const encoded1 = tinyURL.encode(testUrl);
    const encoded2 = tinyURL.encode(testUrl);

    expect(encoded1).not.toEqual(encoded2);
  });
});
