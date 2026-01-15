# Test Status Tracker

This file tracks the implementation and testing status for all test cases in TEST-PLAN.md.

**Legend:**
- [ ] Not started
- [~] In progress / Fixtures created
- [x] Completed / Verified
- [!] Blocked/Issue found

**Last Updated:** 2026-01-15 (after second cm code check run)

---

## Project Setup Status

| Item | Status | Notes |
|------|--------|-------|
| Project structure created | [x] | src/typescript, src/python, tests |
| check.toml | [x] | Combined configuration |
| package.json | [x] | For TS/JS tools |
| pyproject.toml | [x] | For Python tools |
| tsconfig.json | [x] | TypeScript config |
| eslint.config.js | [x] | ESLint config |
| TypeScript source files | [x] | index.ts, utils.ts |
| Python source files | [x] | main.py, helpers.py, __init__.py |
| TypeScript test files | [x] | index.test.ts |
| Python test files | [x] | test_main.py |
| Test scenarios directory | [x] | test-scenarios/ with all fixture files |
| npm dependencies installed | [x] | 180 packages |
| Python venv + dependencies | [x] | pytest, ruff, vulture |

---

## Mixed Language Core Tests (MIX-001 to MIX-007)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| MIX-001 | All Tools Run | [x] | All 14 tools executed successfully |
| MIX-002 | TS Tools Skip Python Files | [x] | ESLint only reported TS violations |
| MIX-003 | Python Tools Skip TS Files | [x] | Ruff only reported Python violations |
| MIX-004 | Gitleaks Scans All Files | [x] | 5 secrets detected across TS, Python, config |
| MIX-005 | Naming Rules Per Language | [x] | 10 violations detected correctly |
| MIX-006 | Disable Comments All Languages | [x] | 32 disable comments detected |
| MIX-007 | Tests Pattern Multi-Language | [!] | ISSUE-002: Pattern not matching files |

---

## Cross-Language Naming Tests (NAM-MIX-001 to NAM-MIX-004)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| NAM-MIX-001 | Different Cases Per Extension | [x] | my-component.ts, my_module.py validated |
| NAM-MIX-002 | Wrong Case Per Language | [x] | MyComponent.ts, myModule.py flagged |
| NAM-MIX-003 | Folder Rules Per Language | [!] | ISSUE-004: Mixed folder naming conflicts |
| NAM-MIX-004 | Shared Folder Different Extensions | [x] | Both .ts and .py validated in shared-folder |

---

## Gitleaks Cross-Language Tests (GLK-MIX-001 to GLK-MIX-004)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| GLK-MIX-001 | Secret in TypeScript | [x] | Detected: glk-mix-001-secret-typescript.ts:7 |
| GLK-MIX-002 | Secret in Python | [x] | Detected: glk_mix_002_secret_python.py:7 |
| GLK-MIX-003 | Secret in Config File | [x] | Detected: .env:4, config.json:5, settings.yaml:8 |
| GLK-MIX-004 | Secrets in Both Languages | [x] | All 5 secrets reported with correct paths |

---

## Disable Comments Cross-Language Tests (DIS-MIX-001 to DIS-MIX-005)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| DIS-MIX-001 | ESLint Disable in TS | [x] | eslint-disable detected in dis-mix-001 |
| DIS-MIX-002 | noqa in Python | [x] | # noqa detected in dis_mix_002, dis_mix_005 |
| DIS-MIX-003 | ts-ignore in TS | [x] | @ts-ignore detected in dis-mix-003 |
| DIS-MIX-004 | type: ignore in Python | [x] | 5 type: ignore comments detected |
| DIS-MIX-005 | All Comment Types | [x] | 32 total disable comments found |

---

## Tests Validation Cross-Language Tests (TST-MIX-001 to TST-MIX-004)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| TST-MIX-001 | TS Tests Only | [~] | Needs separate validation |
| TST-MIX-002 | Python Tests Only | [~] | Needs separate validation |
| TST-MIX-003 | Both Languages Have Tests | [!] | ISSUE-002: Pattern not matching |
| TST-MIX-004 | Missing One Language Tests | [~] | Manual test scenario |

---

## Tool Isolation Tests (ISO-001 to ISO-006)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| ISO-001 | ESLint Ignores Python | [x] | No ESLint errors from .py files |
| ISO-002 | Ruff Ignores TypeScript | [x] | No Ruff errors from .ts files |
| ISO-003 | tsc Ignores Python | [x] | TypeScript passed (no Python errors) |
| ISO-004 | ty Ignores TypeScript | [x] | ty only reports Python type errors |
| ISO-005 | Knip Only JS/TS | [x] | Knip only reports unused TS files |
| ISO-006 | Vulture Only Python | [!] | ISSUE-001: Vulture scanning .venv |

---

## Audit Cross-Language Tests (AUD-MIX-001 to AUD-MIX-004)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| AUD-MIX-001 | All Configs Present | [x] | All tools ran with configs |
| AUD-MIX-002 | Missing TS Config | [x] | tsc reports "Config not found", others continue |
| AUD-MIX-003 | Missing Python Config | [x] | Ruff runs with defaults (expected behavior) |
| AUD-MIX-004 | Partial Configuration | [x] | Missing tool reports error, others continue |

---

## Output Tests (OUT-MIX-001 to OUT-MIX-003)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| OUT-MIX-001 | Text Output Groups by Tool | [x] | Output grouped by tool with clear headers |
| OUT-MIX-002 | JSON Output All Tools | [x] | Well-structured JSON with all violations |
| OUT-MIX-003 | Violations Identify Language | [x] | File paths clearly show language |

---

## Concurrent Execution Tests (CON-001 to CON-003)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| CON-001 | Tools Run in Parallel | [x] | All tools completed (total ~70s) |
| CON-002 | One Language Fails Early | [ ] | Need to simulate failure |
| CON-003 | Tool Timeout | [ ] | Need to create slow scenario |

---

## Edge Cases (EDGE-001 to EDGE-006)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| EDGE-001 | Empty TypeScript Directory | [x] | No errors from empty-ts/ |
| EDGE-002 | Empty Python Directory | [x] | No errors from empty-py/ |
| EDGE-003 | Only Config Files | [x] | only-config/ handled correctly |
| EDGE-004 | Symlinks Between Languages | [!] | ISSUE-003: Parse errors on symlinks |
| EDGE-005 | Files Without Extension | [x] | Not checked by tools (expected) |
| EDGE-006 | Dual Extension Files | [x] | Validated by extension (.ts/.py) |

---

## Monorepo Simulation (MONO-001 to MONO-003)

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| MONO-001 | Separate Packages | [x] | TS, Ruff, ty, gitleaks ran on packages |
| MONO-002 | Shared Dependencies | [x] | Root configs used correctly |
| MONO-003 | Root-level check.toml | [x] | check.toml detected and used |

---

## Summary

| Category | Total | Verified | Issues | Not Started |
|----------|-------|----------|--------|-------------|
| Mixed Language Core | 7 | 6 | 1 | 0 |
| Cross-Language Naming | 4 | 3 | 1 | 0 |
| Gitleaks | 4 | 4 | 0 | 0 |
| Disable Comments | 5 | 5 | 0 | 0 |
| Tests Validation | 4 | 0 | 1 | 3 |
| Tool Isolation | 6 | 5 | 1 | 0 |
| Audit | 4 | 4 | 0 | 0 |
| Output | 3 | 3 | 0 | 0 |
| Concurrent Execution | 3 | 1 | 0 | 2 |
| Edge Cases | 6 | 5 | 1 | 0 |
| Monorepo | 3 | 3 | 0 | 0 |
| **TOTAL** | **49** | **39** | **5** | **5** |

---

## First cm code check Results (2026-01-15)

```
check-my-toolkit v0.18.0
✗ 233 violation(s) found

Tool Results:
- ESLint: 3 violations (console statements)
- Ruff: 43 violations (import sorting, deprecated typing)
- Ruff Format: 1 violation (symlink parse error)
- Prettier: 9 violations (formatting)
- TypeScript: PASSED
- ty: 43 violations (type errors)
- Knip: 18 violations (unused test files)
- Vulture: 64 violations (includes .venv - ISSUE)
- gitleaks: 5 violations (all test secrets detected!)
- npmaudit: 4 violations (vitest vulnerabilities)
- pipaudit: PASSED
- Tests: 1 violation (pattern issue)
- Naming: 10 violations (case violations)
- Disable Comments: 32 violations (all detected!)
```

---

## Open Issues

See [issues.md](./issues.md) for details:

1. **ISSUE-001** (Medium): Vulture scanning .venv directory
2. **ISSUE-002** (High): Test pattern not matching test files
3. **ISSUE-003** (Medium): Symlinks causing parse errors
4. **ISSUE-004** (Low): Naming rules applying to test-scenarios

---

## Test Scenario Files

All test fixtures are organized under `test-scenarios/`:

```
test-scenarios/
├── gitleaks/           # 5 files - All secrets detected
├── naming/             # 7 files - Naming violations working
├── disable-comments/   # 6 files - All comments detected
├── tool-isolation/     # 6 files - Isolation working
├── edge-cases/         # 6 dirs - Mostly working (symlink issue)
└── monorepo/           # Full structure - Needs isolated test
```

---

## Next Steps

1. [x] ~~Install dependencies~~
2. [x] ~~Run cm code check~~
3. [x] ~~Run monorepo tests in isolation~~
4. [x] ~~Test JSON output format (OUT-MIX-002)~~
5. [x] ~~Complete audit tests (AUD-MIX-002 to 004)~~
6. [ ] Fix ISSUE-002: Test pattern matching (requires cm tool fix)
7. [ ] Configure Vulture to exclude .venv (ISSUE-001)
8. [ ] Test CON-002/CON-003: Failure and timeout scenarios
