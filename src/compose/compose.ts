// Types from https://github.com/ramda/types/blob/develop/types/compose.d.ts

/**
 * Accepts N functions and returns one function
 * that will take one argument and pass it to the last function.
 * Then it's result will be passed to the N-1 function and so on.
 * RTL execution.
 *
 * @example
 * const double = (x: number) => x * 2;
 * const add10 = (x: number) => x + 10;
 * const composed = compose(double, add10);
 *
 * console.log(composed(2))    // 24
 */
function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...func: [
    fnLast: (a: any) => TResult,
    ...func: Array<(a: any) => any>,
    f7: (a: R6) => R7,
    f6: (a: R5) => R6,
    f5: (a: R4) => R5,
    f4: (a: R3) => R4,
    f3: (a: R2) => R3,
    f2: (a: R1) => R2,
    f1: (...args: TArgs) => R1,
  ]
): (...args: TArgs) => TResult;
// fallback overload if number of composed functions greater than 7
function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7;
function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7;
function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R6;
function compose<TArgs extends any[], R1, R2, R3, R4, R5>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R5;
function compose<TArgs extends any[], R1, R2, R3, R4>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R4;
function compose<TArgs extends any[], R1, R2, R3>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R3;
function compose<TArgs extends any[], R1, R2>(
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R2;
function compose<TArgs extends any[], R1>(
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R1;

function compose<Functions extends ((arg: any) => any)[]>(
  ...functions: Functions
) {
  return (arg: any) => functions.reduceRight((result, f) => f(result), arg);
}

export default compose;
