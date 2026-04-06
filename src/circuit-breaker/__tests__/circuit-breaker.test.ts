import circuitBreaker from '../circuit-breaker';

describe('circuitBreaker', () => {
  let mockFn: jest.Mock;

  beforeEach(() => {
    mockFn = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call the original function and return its result', async () => {
    mockFn.mockResolvedValue('ok');
    const breaker = circuitBreaker(mockFn, { threshold: 3 });

    const result = await breaker('arg1');

    expect(mockFn).toHaveBeenCalledWith('arg1');
    expect(result).toBe('ok');
  });

  it('should stay CLOSED if failures are below threshold', async () => {
    mockFn
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');

    const breaker = circuitBreaker(mockFn, { threshold: 3 });

    await expect(breaker()).rejects.toThrow('fail');
    await expect(breaker()).rejects.toThrow('fail');
    await expect(breaker()).resolves.toBe('ok');
  });

  it('should open after threshold consecutive failures', async () => {
    mockFn.mockRejectedValue(new Error('service down'));
    const breaker = circuitBreaker(mockFn, { threshold: 3 });

    await expect(breaker()).rejects.toThrow('service down');
    await expect(breaker()).rejects.toThrow('service down');
    await expect(breaker()).rejects.toThrow('service down');

    // 4th call — breaker is OPEN, fn should NOT be called
    await expect(breaker()).rejects.toThrow('Circuit is open');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should reset failure count on success', async () => {
    mockFn
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('ok') // resets counter
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');

    const breaker = circuitBreaker(mockFn, { threshold: 3 });

    await expect(breaker()).rejects.toThrow('fail'); // 1
    await expect(breaker()).rejects.toThrow('fail'); // 2
    await expect(breaker()).resolves.toBe('ok');     // resets to 0
    await expect(breaker()).rejects.toThrow('fail'); // 1
    await expect(breaker()).rejects.toThrow('fail'); // 2
    await expect(breaker()).resolves.toBe('ok');     // still closed

    expect(mockFn).toHaveBeenCalledTimes(6);
  });

  it('should transition to HALF_OPEN after cooldown', async () => {
    mockFn.mockRejectedValue(new Error('service down'));
    const breaker = circuitBreaker(mockFn, { threshold: 2, cooldown: 5000 });

    await expect(breaker()).rejects.toThrow('service down');
    await expect(breaker()).rejects.toThrow('service down');
    // now OPEN
    await expect(breaker()).rejects.toThrow('Circuit is open');

    jest.advanceTimersByTime(5000);

    // now HALF_OPEN — should let one probe through
    mockFn.mockResolvedValueOnce('recovered');
    await expect(breaker()).resolves.toBe('recovered');
  });

  it('should go back to CLOSED if HALF_OPEN probe succeeds', async () => {
    mockFn.mockRejectedValue(new Error('fail'));
    const breaker = circuitBreaker(mockFn, { threshold: 2, cooldown: 5000 });

    await expect(breaker()).rejects.toThrow();
    await expect(breaker()).rejects.toThrow();
    // OPEN
    jest.advanceTimersByTime(5000);
    // HALF_OPEN — probe succeeds
    mockFn.mockResolvedValue('ok');
    await expect(breaker()).resolves.toBe('ok');

    // now CLOSED — subsequent calls go through normally
    await expect(breaker()).resolves.toBe('ok');
    await expect(breaker()).resolves.toBe('ok');
  });

  it('should go back to OPEN if HALF_OPEN probe fails', async () => {
    mockFn.mockRejectedValue(new Error('still down'));
    const breaker = circuitBreaker(mockFn, { threshold: 2, cooldown: 5000 });

    await expect(breaker()).rejects.toThrow('still down');
    await expect(breaker()).rejects.toThrow('still down');
    // OPEN
    jest.advanceTimersByTime(5000);
    // HALF_OPEN — probe fails → back to OPEN
    await expect(breaker()).rejects.toThrow('still down');
    await expect(breaker()).rejects.toThrow('Circuit is open');

    expect(mockFn).toHaveBeenCalledTimes(3); // 2 initial + 1 probe
  });
});
