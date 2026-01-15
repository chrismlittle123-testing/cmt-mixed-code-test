# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-15

---

## Open Issues

### ISSUE-001: Vulture scanning .venv directory

**Test ID:** ISO-005, ISO-006
**Severity:** Medium
**Status:** Open
**Date Found:** 2026-01-15

**Description:**
Vulture is scanning the Python virtual environment directory (.venv), resulting in false positives from third-party packages like pytest and pip internals.

**Expected Behavior:**
Vulture should only scan project source files (src/python/ and test-scenarios/), not virtual environment directories.

**Actual Behavior:**
Vulture reports 64 violations, most from .venv/lib/python3.14/site-packages/

**Steps to Reproduce:**
1. Run `cm code check`
2. Observe Vulture violations from .venv directory

**Possible Solution:**
Add .venv to Vulture's exclude paths in check.toml or vulture configuration.

**Notes:**
This affects the accuracy of unused code detection metrics.

---

### ISSUE-002: Test pattern not matching test files

**Test ID:** TST-MIX-003, MIX-007
**Severity:** High
**Status:** Open
**Date Found:** 2026-01-15

**Description:**
The test file pattern `**/*.{test,spec}.ts,**/test_*.py` is not matching the existing test files.

**Expected Behavior:**
Pattern should match:
- tests/ts/index.test.ts
- tests/py/test_main.py

**Actual Behavior:**
```
error [min-test-files] No test files found matching pattern "**/*.{test,spec}.ts,**/test_*.py". Expected at least 1.
```

**Steps to Reproduce:**
1. Run `cm code check`
2. Observe "Tests" section showing 1 violation

**Possible Solution:**
May need to adjust the pattern syntax or glob implementation for combined patterns.

**Notes:**
This blocks TST-MIX tests from passing.

---

### ISSUE-003: Symlinks causing parse errors

**Test ID:** EDGE-004
**Severity:** Medium
**Status:** Open
**Date Found:** 2026-01-15

**Description:**
The symlink `linked-from-typescript.py` (which points to `original.ts`) causes parse errors in Python tools because they try to parse TypeScript syntax as Python.

**Expected Behavior:**
Tools should either:
1. Follow symlinks and detect the actual file type
2. Skip symlinks gracefully
3. Detect content type regardless of extension

**Actual Behavior:**
Multiple errors reported:
- Ruff Format: `Failed to parse test-scenarios/edge-cases/symlinks/linked-from-typescript.py`
- ty: Multiple `invalid-syntax` errors

**Steps to Reproduce:**
1. Run `cm code check`
2. Observe errors from `linked-from-typescript.py`

**Possible Solution:**
This may be expected behavior - symlinks with mismatched extensions are an edge case. Consider documenting this behavior.

**Notes:**
This confirms EDGE-004 test scenario but highlights a potential tool limitation.

---

### ISSUE-004: Naming rules applying to test-scenarios directory

**Test ID:** NAM-MIX-001 to NAM-MIX-004
**Severity:** Low
**Status:** Open
**Date Found:** 2026-01-15

**Description:**
The naming rules are applying to the test-scenarios directory structure, flagging kebab-case folders as violations because they contain .py files.

**Expected Behavior:**
Test scenario directories should potentially be excluded from naming rules, OR naming rules should only apply to file extensions within matching folders.

**Actual Behavior:**
```
test-scenarios error [folder-case] Folder "test-scenarios" should be snake_case
test-scenarios/tool-isolation error [folder-case] Folder "tool-isolation" should be snake_case
```

**Steps to Reproduce:**
1. Run `cm code check`
2. Observe Naming violations for folders

**Possible Solution:**
Add test-scenarios to naming exclusion list, or reconsider how folder naming rules work with mixed language directories.

**Notes:**
The naming convention rules need to handle mixed-language directories better.

---

## Resolved Issues

*No resolved issues yet.*

---

## Issue Statistics

| Severity | Open | In Progress | Resolved | Won't Fix |
|----------|------|-------------|----------|-----------|
| Critical | 0 | 0 | 0 | 0 |
| High | 1 | 0 | 0 | 0 |
| Medium | 2 | 0 | 0 | 0 |
| Low | 1 | 0 | 0 | 0 |
| **Total** | **4** | **0** | **0** | **0** |

---

## Test Execution Summary (2026-01-15)

First full `cm code check` execution completed with the following results:

| Tool | Violations | Status | Notes |
|------|------------|--------|-------|
| ESLint | 3 | Working | Console statements in index.ts |
| Ruff | 43 | Working | Import sorting, deprecated typing |
| Ruff Format | 1 | Issue | Symlink parse error |
| Prettier | 9 | Working | Formatting violations |
| TypeScript | 0 | Passed | No type errors |
| ty | 43 | Working | Type errors + symlink issue |
| Knip | 18 | Working | Unused test fixture files |
| Vulture | 64 | Issue | Scanning .venv directory |
| gitleaks | 5 | Working | Detected all test secrets |
| npmaudit | 4 | Working | Vitest vulnerabilities |
| pipaudit | 0 | Passed | No Python vulnerabilities |
| Tests | 1 | Issue | Pattern not matching |
| Naming | 10 | Working | Detecting naming violations |
| Disable Comments | 32 | Working | Detecting all comment types |
| **TOTAL** | **233** | - | - |

### Key Observations

1. **Gitleaks is working correctly** - Detected all 5 test secrets in TS, Python, and config files
2. **Disable Comments detection is working** - Found all 32 disable comments across both languages
3. **Naming rules are working** - Detecting case violations but needs exclusion config
4. **Tool isolation partially working** - Most tools ignore wrong language files, but symlinks cause issues
5. **Vulture needs configuration** - Should exclude .venv from scanning

---

## Additional Test Results (2026-01-15 - Second Run)

### OUT-MIX-002: JSON Output Test
**Status:** PASSED

JSON output (`cm code check -f json`) produces well-structured output:
- Includes version, configPath, domains
- Each check has: name, rule, passed, violations[], skipped, duration
- Violations include: rule, tool, file, line, column, message, code, severity

### MONO-001 to MONO-003: Monorepo Tests
**Status:** PASSED (with notes)

Running `cm code check` in test-scenarios/monorepo/:
- MONO-001: Separate packages work - TypeScript, Ruff, ty, gitleaks all ran correctly
- MONO-002: Root-level package.json and pyproject.toml are used
- MONO-003: Root-level check.toml is correctly detected and used

**Note:** ESLint requires TypeScript parser to be installed (`npm install`) for full functionality.

### AUD-MIX-002: Missing TypeScript Config
**Status:** PASSED

When tsconfig.json is removed:
```
✗ TypeScript: 1 violation(s)
    error  Config not found. Expected one of: tsconfig.json
```
All other tools continue to run normally.

### AUD-MIX-003: Missing Python Config
**Status:** PASSED (Expected Behavior)

When pyproject.toml is removed:
- Ruff still runs with default settings
- Violations reduced from 43 to 24 (stricter rules from config not applied)
- This is expected - Ruff works without configuration

### AUD-MIX-004: Partial Configuration
**Status:** PASSED

When eslint.config.js is removed:
- ESLint reports config not found
- All other tools (Ruff, Prettier, TypeScript, ty, etc.) continue running
- Graceful degradation confirmed
