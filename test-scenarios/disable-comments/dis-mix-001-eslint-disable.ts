/**
 * DIS-MIX-001: ESLint Disable in TypeScript
 * This file contains eslint-disable comments that should be detected
 */

// eslint-disable-next-line no-console
console.log("This console.log is allowed");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyValue: any = "test";

/* eslint-disable no-unused-vars */
const unusedVar1 = "unused";
const unusedVar2 = "also unused";
/* eslint-enable no-unused-vars */

export function testFunction() {
  // eslint-disable-next-line prefer-const
  let value = "should be const";
  return value + anyValue;
}
