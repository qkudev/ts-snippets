import wait from '../wait';

describe('wait', () => {
  it('should wait for 100ms', async () => {
    const t0 = performance.now();

    await wait(100);

    const t1 = performance.now();

    expect(t1 - t0).toBeGreaterThanOrEqual(100);
  });
});
