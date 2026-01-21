# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-21
**Current Version:** check-my-toolkit v1.6.0

---

## Test Execution Summary - check-my-toolkit v1.6.0

### Bug Fixes Verified in v1.6.0

| Bug | Description | Status |
|-----|-------------|--------|
| BUG-011 | `forbidden_files` config dropped during merge | FIXED |
| BUG-009 | Duplicate extensions across rules accepted by validation | FIXED |
| BUG-001 | Duplicate extensions cause silent check failure | FIXED |
| BUG-002 | Vulture scans .venv directory | FIXED |
| BUG-005 | Coverage shows "exit code undefined" | FIXED |

### New Features in v1.6.0

| Feature | Status | Notes |
|---------|--------|-------|
| forbidden_files | Working | Full implementation with glob patterns, ignore patterns, custom messages |
| Naming dynamic routes | Working | `allow_dynamic_routes` option for Next.js/Remix: `[id]`, `[...slug]`, `(group)`, `@parallel` |
| Naming numeric files | Working | Allows `404`, `500` for framework error pages |
| Vulture exclusions | Working | Default excludes: .venv, venv, .git, node_modules, __pycache__, dist, build, .tox, .nox, .eggs |

---

## Historical Bug Fixes

### v1.6.0 Fixes

#### BUG-011: forbidden_files Feature Non-Functional (v1.4.0)

**Fixed in:** v1.6.0

The `forbidden_files` feature added in v1.4.0 was completely non-functional because the `mergeProcess` function was missing `forbidden_files` from the merge. Fixed by adding `mergeProcessForbiddenFiles` function to `loader.js`.

#### BUG-001: Duplicate Extension Rules Silent Failure

**Fixed in:** v1.6.0

When `check.toml` contained two naming rules with the same extension, checks silently failed. Fixed by schema validation now rejecting duplicate extensions across rules.

#### BUG-009: Duplicate Extensions Validation

**Fixed in:** v1.6.0

`cm validate config` accepted configurations with duplicate extensions across rules. Fixed with `superRefine` validation in schema.js.

#### BUG-002: Vulture Scans .venv Directory

**Fixed in:** v1.6.0

Vulture was scanning virtual environment directories. Fixed by adding default exclude patterns.

#### BUG-005: Coverage "exit code undefined"

**Fixed in:** v1.6.0

Error message showed "exit code undefined" for non-existent commands. Fixed with clearer error message.

### v1.3.1 Fixes

#### BUG-010: Duplicate Extensions in Same Rule Array

**Fixed in:** v1.3.1

Duplicate extensions in same array (e.g., `["ts", "ts"]`) passed validation. Fixed - schema now rejects duplicates.

---

## Test Files

**Configuration Edge Cases:** `bug-hunting-tests/test-configs/`
- `invalid-toml.toml`, `empty.toml`, `wrong-types.toml`
- `negative-threshold.toml`, `threshold-over-100.toml`
- `unknown-tool.toml`, `unknown-case.toml`
- `duplicate-extension.toml`, `original-with-duplicate.toml`
- `coverage-bad-command.toml`, `coverage-empty-command.toml`

**Unicode Tests:** `bug-hunting-tests/unicode-tests/`
- `café-module.ts`, `日本語ファイル.ts`, `emoji_🚀_test.py`

**Special Characters:** `bug-hunting-tests/special-chars/`
- `file with spaces.ts`, `file$with$dollars.ts`, `file[with]brackets.py`

**Disable Comments:** `bug-hunting-tests/disable-comments/`
- `multiline-disable.ts`, `false_positives.py`, `edge_cases.py`

**Secrets:** `bug-hunting-tests/secrets/`
- `base64_secret.ts`, `connection_strings.py`, `false_positive_secrets.ts`, `private_key.pem`

**Other:** `bug-hunting-tests/deep-nesting/`, `bug-hunting-tests/long-name/`, `bug-hunting-tests/monorepo-test/`
