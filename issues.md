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

---

## Version Upgrade: v1.0.1 → v1.3.0 (2026-01-19)

### Migration Steps Completed
1. Updated check-my-toolkit from v1.0.1 to v1.3.0 via `npm update -g`
2. Migrated from npm to pnpm (`pnpm import` + `pnpm install`)
3. Updated check.toml configuration for breaking changes

### Config Changes Required
| Old (v1.0.1) | New (v1.3.0) | Notes |
|--------------|--------------|-------|
| `[code.security.npmaudit]` | `[code.security.pnpmaudit]` | npm audit removed in v1.1.0 |
| `[code.tests]` | `[code.coverage_run]` | New coverage-based testing |
| - | `exclude_dev = true` | New option for pnpmaudit |
| - | `min_threshold = 10` | Coverage threshold config |
| - | `command = "pnpm test:coverage"` | Custom test command |

### New Features Verified
| Feature | Version | Status |
|---------|---------|--------|
| `cm dependencies` | v1.2.0 | ✓ Lists config files per tool |
| `cm validate tier` | v1.3.0 | ✓ Validates tier-ruleset alignment |
| `pnpmaudit` | v1.1.0 | ✓ Replaced npmaudit |
| `exclude_dev` option | v1.1.0 | ✓ Skips dev dependencies |
| `coverage_run` | v1.2.0 | ✓ Coverage threshold validation |

---

## Additional Test Results

### JSON Output (OUT-MIX-002)
Well-structured JSON output with version, configPath, domains, and detailed violations.

### Audit Tests (AUD-MIX-002 to AUD-MIX-004)
- Missing configs correctly reported
- Other tools continue running (graceful degradation)
- Ruff works with defaults when config missing

---

## Historical: Test Execution Summary (2026-01-15) - v0.18.0

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
