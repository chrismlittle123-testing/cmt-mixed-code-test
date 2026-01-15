/**
 * NAM-MIX-003: Correct kebab-case folder for TypeScript
 * This folder follows the kebab-case naming convention
 */

export interface UserProfile {
  id: string;
  username: string;
  email: string;
}

export function getUserProfile(id: string): UserProfile {
  return {
    id,
    username: `user_${id}`,
    email: `user_${id}@example.com`,
  };
}
