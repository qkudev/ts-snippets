import BrowserHistory from '../browser-history';

describe('BrowserHistory', () => {
  let history: BrowserHistory;
  const homepage = 'https://google.com';

  beforeEach(() => {
    history = new BrowserHistory(homepage);
  });

  it('should be defined', () => {
    expect(history).toBeInstanceOf(BrowserHistory);
  });

  it('should have home page as current', () => {
    expect(history.current).toEqual(homepage);
  });

  it('should visit page', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);

    expect(history.current).toEqual(nextPage);
  });

  it('should back to home page', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);

    history.back(1);
    expect(history.current).toEqual(homepage);
  });

  it('should always back to home page for any number of back steps', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);

    history.back(5);
    expect(history.current).toEqual(homepage);
  });

  it('should go forward for one step', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);

    history.back(1);
    history.forward(1);
    expect(history.current).toEqual(nextPage);
  });

  it('should forward to the latest page for steps more than history has', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);

    history.back(1);
    history.forward(10);
    expect(history.current).toEqual(nextPage);
  });

  it('should clear forward stack in case of visit call', () => {
    const nextPage = 'https://fb.com';
    history.visit(nextPage);
    expect(history.current).toEqual(nextPage);

    history.forward(10);
    expect(history.current).toEqual(nextPage);
  });
});
