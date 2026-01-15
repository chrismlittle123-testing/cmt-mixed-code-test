/**
 * DIS-MIX-005: All Comment Types in TypeScript
 * This file contains various disable comments that should all be detected
 */

// eslint-disable-next-line
const eslintDisabled = "eslint disabled";

// @ts-ignore
const tsIgnored: number = "not a number";

// @ts-expect-error
const tsExpectError: string = 123;

/* eslint-disable */
const multiLineEslintDisabled = "multi-line disabled";
/* eslint-enable */

// @ts-nocheck would be at file level, simulating with comment
// Note: @ts-nocheck disables all type checking for the file

export { eslintDisabled, tsIgnored, tsExpectError, multiLineEslintDisabled };
