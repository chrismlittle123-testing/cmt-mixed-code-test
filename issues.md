# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-19

---

## Open Issues

*No open issues. All 39 tests passing.*

---

## Test Execution Summary (2026-01-19) - check-my-toolkit v1.3.0

`cm code check` execution completed successfully with expected violations from test fixtures.

| Tool | Violations | Status |
|------|------------|--------|
| ESLint | 3 | Working |
| Ruff | 43 | Working |
| Ruff Format | 1 | Working |
| Prettier | 11 | Working |
| TypeScript | 0 | Passed |
| ty | 43 | Working |
| Knip | 20 | Working |
| Vulture | 64 | Working |
| gitleaks | 5 | Working |
| pnpmaudit | 0 | Passed |
| pipaudit | 0 | Passed |
| Coverage Run | 0 | Passed (16.5% > 10% threshold) |
| Naming | 10 | Working |
| Disable Comments | 32 | Working |

### Key Results

1. **Gitleaks** - Detected all 5 test secrets in TS, Python, and config files
2. **Disable Comments** - Found all 32 disable comments across both languages
3. **Tool Isolation** - Each tool correctly processes only its target language
4. **Naming Rules** - Correctly detecting case violations per language
5. **Monorepo** - Root-level check.toml works across packages
