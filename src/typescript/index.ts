/**
 * Main TypeScript entry point
 * Used for testing cross-language tool behavior
 */

import { formatDate, calculateSum } from './utils';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export function createUser(name: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    createdAt: new Date(),
  };
}

export function getUserDisplayName(user: User): string {
  return `${user.name} <${user.email}>`;
}

export function processUsers(users: User[]): string[] {
  return users.map((user) => getUserDisplayName(user));
}

// Example usage
const testUser = createUser('John Doe', 'john@example.com');
console.log(`Created user: ${getUserDisplayName(testUser)}`);
console.log(`Formatted date: ${formatDate(testUser.createdAt)}`);
console.log(`Sum example: ${calculateSum([1, 2, 3, 4, 5])}`);
