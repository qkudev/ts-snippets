type Head<T extends any[]> = T extends [...infer H, any] ? H : any[];

type PromisifiedFunction<T extends (...args: any[]) => any> = (
  ...args: Head<Parameters<T>>
) => Promise<ReturnType<T>>;

/**
 * Converts a function that uses callbacks into a function that returns a promise.
 * @param func - The function to promisify.
 * @returns A promisified version of the function.
 */
function promisify<F extends (...args: any[]) => any>(
  func: F
): PromisifiedFunction<F> {
  return (...args: Head<Parameters<F>>): Promise<ReturnType<F>> =>
    new Promise((resolve, reject) => {
      func(...args, (error: any, result: ReturnType<F>) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
}

export default promisify;
