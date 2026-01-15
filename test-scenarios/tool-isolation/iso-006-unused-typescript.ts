/**
 * ISO-006: Vulture Only Python
 * This file contains unused TypeScript exports that Vulture should ignore
 */

// Unused function - Knip should detect, Vulture should ignore
export function unusedFunction(): string {
  return "unused";
}

// Unused class - Knip should detect, Vulture should ignore
export class UnusedClass {
  unusedMethod(): string {
    return "unused method";
  }
}

// Unused constant - Knip should detect, Vulture should ignore
export const UNUSED_CONSTANT = "this constant is never used";

// Unused interface - Knip should detect, Vulture should ignore
export interface UnusedInterface {
  id: number;
  name: string;
}

// Unused type - Knip should detect, Vulture should ignore
export type UnusedType = string | number;

// This function is used
export function usedFunction(): string {
  return "used";
}

// Use the used function
const result = usedFunction();
console.log(result);
