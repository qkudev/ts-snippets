export const throttle = <F extends Function>(f: F, ms: number): F => {
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
