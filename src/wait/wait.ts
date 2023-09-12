/**
 * Returns `Promise<void>` that will be resolved in `ms` milliseconds
 */
export const wait = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
