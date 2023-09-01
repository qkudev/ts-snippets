/**
 * Debounce wrapper. Returns wrapped function with "clear" method to cancel delayed call
 */
export const debounce = <F extends Function>(f: F, ms: number) => {
  let timeout: NodeJS.Timeout | null = null;

  const clear = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const call = (...args: any[]) => {
    clear();

    timeout = setTimeout(() => {
      f(...args);
    }, ms);
  };
  call.clear = clear;

  return call as unknown as F & { clear: () => void };
};
