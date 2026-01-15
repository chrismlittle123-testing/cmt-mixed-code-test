/**
 * Tests for TypeScript modules
 */

import { describe, it, expect } from 'vitest';
import { createUser, getUserDisplayName, processUsers, User } from '../../src/typescript/index';
import { formatDate, calculateSum, capitalize, isValidEmail, generateId } from '../../src/typescript/utils';

describe('User functions', () => {
  describe('createUser', () => {
    it('should create a user with the given name and email', () => {
      const user = createUser('Test User', 'test@example.com');

      expect(user.name).toBe('Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.id).toBeTypeOf('number');
      expect(user.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('getUserDisplayName', () => {
    it('should return formatted display name', () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
      };

      expect(getUserDisplayName(user)).toBe('John Doe <john@example.com>');
    });
  });

  describe('processUsers', () => {
    it('should process multiple users', () => {
      const users: User[] = [
        { id: 1, name: 'User 1', email: 'user1@example.com', createdAt: new Date() },
        { id: 2, name: 'User 2', email: 'user2@example.com', createdAt: new Date() },
      ];

      const result = processUsers(users);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe('User 1 <user1@example.com>');
      expect(result[1]).toBe('User 2 <user2@example.com>');
    });
  });
});

describe('Utility functions', () => {
  describe('formatDate', () => {
    it('should format date to ISO string', () => {
      const date = new Date('2024-06-15T12:00:00Z');
      expect(formatDate(date)).toBe('2024-06-15');
    });
  });

  describe('calculateSum', () => {
    it('should calculate sum of numbers', () => {
      expect(calculateSum([1, 2, 3, 4, 5])).toBe(15);
      expect(calculateSum([])).toBe(0);
      expect(calculateSum([10])).toBe(10);
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('')).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeTypeOf('string');
      expect(id1.length).toBeGreaterThan(0);
      expect(id1).not.toBe(id2);
    });
  });
});
