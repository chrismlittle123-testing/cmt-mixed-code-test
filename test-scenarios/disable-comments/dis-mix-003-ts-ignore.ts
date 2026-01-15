/**
 * DIS-MIX-003: @ts-ignore in TypeScript
 * This file contains @ts-ignore comments that should be detected
 */

interface User {
  id: number;
  name: string;
}

// @ts-ignore
const user: User = { id: "not-a-number", name: 123 };

// @ts-ignore - Intentionally ignoring type error
const wrongType: string = 42;

function processUser(user: User) {
  // @ts-ignore
  return user.nonExistentProperty;
}

// @ts-expect-error - This is also a type suppression
const anotherWrongType: number = "string";

export { user, wrongType, processUser, anotherWrongType };
