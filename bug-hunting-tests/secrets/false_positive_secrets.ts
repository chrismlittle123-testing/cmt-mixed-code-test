// Tests for secret detection false positives

// These should NOT be flagged as secrets:
const EXAMPLE_API_KEY = "your-api-key-here";  // Placeholder
const TEST_PASSWORD = "password123";  // Obviously test
const SAMPLE_KEY = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";  // UUID placeholder

// Documentation comment mentioning API_KEY
/**
 * Set your API_KEY environment variable
 * Example: API_KEY=abc123...
 */
const config = {};

export default config;
