/**
 * NAM-MIX-002: WRONG - PascalCase TypeScript file (should be kebab-case)
 * This file violates the kebab-case naming convention for TypeScript
 */

export interface WrongComponent {
  id: string;
  name: string;
}

export function createWrongComponent(name: string): WrongComponent {
  return {
    id: Math.random().toString(36).substring(7),
    name,
  };
}
