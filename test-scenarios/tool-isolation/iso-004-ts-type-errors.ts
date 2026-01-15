/**
 * ISO-004: ty Ignores TypeScript
 * This file contains TypeScript type errors that ty (Python type checker) should ignore
 */

interface User {
  id: number;
  name: string;
  email: string;
}

// Type error: wrong property type
const user: User = {
  id: "not-a-number" as unknown as number, // Forcing type error
  name: "John",
  email: "john@example.com",
};

// Type error: missing required property
const partialUser: User = {
  id: 1,
  name: "Jane",
  // email is missing - would be caught by tsc with strict mode
} as User;

// Type error: wrong return type
function getNumber(): number {
  return "string" as unknown as number;
}

// Type error: wrong argument type
function expectString(value: string): void {
  console.log(value);
}

expectString(123 as unknown as string);

// Type error: incompatible types in assignment
let numberVar: number = 42;
numberVar = "not a number" as unknown as number;

export { user, partialUser, getNumber, expectString, numberVar };
