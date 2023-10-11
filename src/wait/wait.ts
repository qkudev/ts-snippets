/**
 * Returns `Promise<void>` that will be resolved in `ms` milliseconds
 */
const wait = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

export default wait;