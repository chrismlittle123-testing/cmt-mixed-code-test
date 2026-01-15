/**
 * NAM-MIX-001: Correct kebab-case TypeScript file
 * This file follows the kebab-case naming convention for TypeScript
 */

export interface MyComponent {
  id: string;
  name: string;
}

export function createMyComponent(name: string): MyComponent {
  return {
    id: Math.random().toString(36).substring(7),
    name,
  };
}
