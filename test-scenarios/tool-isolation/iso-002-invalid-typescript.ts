/**
 * ISO-002: Ruff Ignores TypeScript
 * This file contains TypeScript-specific syntax that Ruff should ignore
 */

// TypeScript-specific type annotations
interface MyInterface {
  id: number;
  name: string;
  optional?: boolean;
}

// TypeScript generics
function identity<T>(arg: T): T {
  return arg;
}

// TypeScript enums
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// TypeScript type unions and intersections
type StringOrNumber = string | number;
type Combined = MyInterface & { extra: string };

// TypeScript decorators (experimental)
function classDecorator<T extends { new (...args: unknown[]): object }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
  };
}

// TypeScript namespace
namespace MyNamespace {
  export const value = "namespaced value";
}

// TypeScript assertion
const myValue = "test" as const;

export { MyInterface, identity, Color, StringOrNumber, Combined, MyNamespace, myValue };
