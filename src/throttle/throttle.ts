/**
 * Returns a new function that can only be called once within a specified time interval.
 * If the function is called again within the interval, the call is ignored.
 * @param f The function to throttle.
 * @param ms The time interval in milliseconds.
 * @returns A new function that can only be called once within the specified time interval.
 */
const throttle = <F extends Function>(f: F, ms: number): F => {
  let canCall = true;
  let lastArgs: any[] | null = null;
  const call = (...args: any[]) => {
    if (canCall) {
      lastArgs = null;
      canCall = false;

      f(...args);
      setTimeout(() => {
        canCall = true;
        if (lastArgs) {
          call(...lastArgs);
        }
      }, ms);
    } else {
      lastArgs = args;
    }
  };

  return call as unknown as F;
};

export default throttle;
