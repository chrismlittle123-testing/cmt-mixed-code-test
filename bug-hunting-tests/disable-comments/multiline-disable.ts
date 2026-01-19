/* eslint-disable */
// This file tests multiline disable comment detection
/* eslint-enable */

export const test = "hello";

/*
eslint-disable-next-line
*/
const x = 1;

// @ts-nocheck
// File-level TypeScript disable

// @ts-expect-error - This is in a comment block
const y = 2;
