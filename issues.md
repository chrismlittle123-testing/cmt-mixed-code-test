# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-15

---

## Open Issues

*No open issues. All 39 tests passing.*

---

## Test Execution Summary (2026-01-15)

`cm code check` execution completed successfully with expected violations from test fixtures.

| Tool | Violations | Status |
|------|------------|--------|
| ESLint | 3 | Working |
| Ruff | 43 | Working |
| Prettier | 9 | Working |
| TypeScript | 0 | Passed |
| ty | 43 | Working |
| Knip | 18 | Working |
| gitleaks | 5 | Working |
| npmaudit | 4 | Working |
| pipaudit | 0 | Passed |
| Naming | 10 | Working |
| Disable Comments | 32 | Working |

### Key Results

1. **Gitleaks** - Detected all 5 test secrets in TS, Python, and config files
2. **Disable Comments** - Found all 32 disable comments across both languages
3. **Tool Isolation** - Each tool correctly processes only its target language
4. **Naming Rules** - Correctly detecting case violations per language
5. **Monorepo** - Root-level check.toml works across packages

---

## Additional Test Results

### JSON Output (OUT-MIX-002)
Well-structured JSON output with version, configPath, domains, and detailed violations.

### Audit Tests (AUD-MIX-002 to AUD-MIX-004)
- Missing configs correctly reported
- Other tools continue running (graceful degradation)
- Ruff works with defaults when config missing
