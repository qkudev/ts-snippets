enum CircuitBreakerState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half_open',
}

interface CircuitBreakerConfig {
  /**
   * Number of consecutive failures before the circuit opens.
   * @default 3
   */
  threshold: number;

  /**
   * Time in milliseconds to wait before transitioning from OPEN to HALF_OPEN.
   * @default 30000
   */
  cooldown: number;
}

/**
 * Wraps an async function with a circuit breaker that tracks consecutive failures
 * and short-circuits calls when the failure threshold is reached.
 *
 * States:
 * - **CLOSED** — calls pass through normally. Consecutive failures are counted.
 * - **OPEN** — after `threshold` consecutive failures, calls are rejected immediately
 *   without invoking the function. After `cooldown` ms, transitions to HALF_OPEN.
 * - **HALF_OPEN** — one probe call is allowed through. On success → CLOSED.
 *   On failure → back to OPEN.
 *
 * @param fn The async function to protect.
 * @param config Optional configuration.
 * @returns A wrapped function with the same signature as `fn`.
 *
 * @example
 * const fetchUser = async (id: string) => { ... };
 *
 * const breaker = circuitBreaker(fetchUser, { threshold: 3, cooldown: 10000 });
 *
 * await breaker('123');   // calls fetchUser normally
 * // after 3 consecutive failures:
 * await breaker('123');   // throws 'Circuit is open' immediately
 */
function circuitBreaker<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
  { threshold = 3, cooldown = 30000 }: Partial<CircuitBreakerConfig> = {}
) {
  let state = CircuitBreakerState.CLOSED;
  let retries = threshold;

  return async function wrappedWithCircuitBreaker(
    ...args: Parameters<typeof fn>
  ) {
    if (state === CircuitBreakerState.OPEN) {
      throw new Error('Circuit is open');
    }
    if (state === CircuitBreakerState.HALF_OPEN) {
      state = CircuitBreakerState.OPEN;
    }

    try {
      const result = await fn(...args);
      state = CircuitBreakerState.CLOSED;
      retries = threshold;

      return result;
    } catch (error) {
      retries--;

      if (!retries) {
        state = CircuitBreakerState.OPEN;

        setTimeout(() => {
          state = CircuitBreakerState.HALF_OPEN;
          retries = threshold;
        }, cooldown);
      }

      throw error;
    }
  };
}

export default circuitBreaker;
