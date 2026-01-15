/**
 * GLK-MIX-001: Secret in TypeScript
 * This file contains a hardcoded secret that should be detected by Gitleaks
 */

// This should be detected by Gitleaks
const API_KEY = "sk-secret123456789abcdef";

// Another secret pattern
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

export function makeApiCall() {
  return fetch("https://api.example.com", {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
}

export function getAwsConfig() {
  return {
    accessKeyId: AWS_ACCESS_KEY,
    region: "us-east-1",
  };
}
