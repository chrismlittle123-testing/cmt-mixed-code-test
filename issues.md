# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-19

---

## Open Issues

### BUG-011: CRITICAL - forbidden_files Feature Completely Non-Functional (v1.4.0)

**Severity:** Critical
**Component:** Configuration Loader
**Version:** 1.4.0

**Description:**
The new `forbidden_files` feature added in v1.4.0 is completely non-functional. The configuration for `[process.forbidden_files]` is silently dropped during config loading, meaning the feature never runs regardless of how it's configured.

**Root Cause:**
The `mergeProcess` function in `dist/config/loader.js` (lines 278-292) returns an object that includes all process domain configurations EXCEPT `forbidden_files`. The function merges:
- hooks, ci, branches, commits, changesets, pr, tickets, coverage, repo, backups, codeowners, docs

But `forbidden_files` is completely missing from the merge, so it's always undefined regardless of what's in `check.toml`.

**Steps to Reproduce:**
1. Create a `check.toml` with:
```toml
[process.forbidden_files]
enabled = true
files = [".env", ".env.*", "**/secrets.json"]
message = "Use secrets management instead"
```
2. Create forbidden files: `touch .env secrets.json`
3. Run `cm process check`

**Expected Behavior:**
```
✗ PROCESS
  ✗ Forbidden Files: 2 violation(s)
      error  Forbidden file exists: .env (matched pattern: .env). Use secrets management instead
      error  Forbidden file exists: secrets.json (matched pattern: **/secrets.json). Use secrets management instead
```

**Actual Behavior:**
```
✓ PROCESS
✓ All checks passed
```

With JSON output:
```json
{
  "domains": {
    "process": {
      "status": "skip",
      "checks": [],
      "violationCount": 0
    }
  }
}
```

**Impact:** CRITICAL - The entire v1.4.0 feature release is broken. Users who upgrade expecting forbidden files enforcement will have no protection.

**Fix Required:**
Add the following to `mergeProcess` function in `loader.js`:
```typescript
function mergeProcessForbiddenFiles(cp, dcp) {
    const defaultForbiddenFiles = { enabled: false };
    return mergeProcessSection(defaultForbiddenFiles, dcp?.forbidden_files, cp?.forbidden_files);
}

function mergeProcess(c, dc) {
    return {
        // ... existing merges ...
        forbidden_files: mergeProcessForbiddenFiles(c.process, dc.process),
    };
}
```

---

### BUG-001: CRITICAL - Duplicate Extension Rules Silently Break Naming and Disable Comments Checks

**Severity:** Critical
**Component:** Configuration Parser / Naming / Disable Comments
**Version:** 1.3.0

**Description:**
When `check.toml` contains two naming rules with the same extension but different case requirements (e.g., one rule says `ts` should be `kebab-case`, another says `ts` should be `snake_case`), both the Naming check AND the Disable Comments check silently fail. They report "passed" even when there are files that should be flagged as violations.

**Steps to Reproduce:**
1. Create a `check.toml` with duplicate extension rules:
```toml
[code.naming]
enabled = true

[[code.naming.rules]]
extensions = ["ts", "tsx"]
file_case = "kebab-case"
folder_case = "kebab-case"

[[code.naming.rules]]
extensions = ["ts"]  # Duplicate with conflicting case
file_case = "snake_case"
folder_case = "snake_case"
```
2. Run `cm validate config` - it passes validation
3. Run `cm code check` - Naming shows "passed" even with files that violate naming rules
4. Disable Comments also shows "passed" even with disable comments in files

**Expected Behavior:**
- Configuration validation should reject duplicate extensions OR
- The tool should use a deterministic rule (first match, last match, etc.) and still find violations OR
- At minimum, the tool should not silently fail - it should either work or error

**Actual Behavior:**
- Configuration validation passes
- Naming and Disable Comments both silently report "passed"
- No violations are found even for files that clearly violate naming conventions

**Impact:** HIGH - This could allow naming violations and disable comments to slip through CI checks undetected.

**Test Case:** `bug-hunting-tests/test-configs/original-with-duplicate.toml`

---

### BUG-002: Vulture Scans .venv Directory

**Severity:** Medium
**Component:** Vulture Integration
**Version:** 1.3.0

**Description:**
Vulture is scanning the `.venv` virtual environment directory and reporting unused code in third-party packages from `site-packages`. This should be excluded by default.

**Steps to Reproduce:**
1. Create a Python project with a `.venv` virtual environment
2. Run `cm code check` with Vulture enabled

**Expected Behavior:**
Vulture should automatically exclude common virtual environment directories (`.venv`, `venv`, `.virtualenv`, `env`) from scanning.

**Actual Behavior:**
Vulture reports violations like:
```
.venv/lib/python3.14/site-packages/_pytest/fixtures.py:1283 warn [unused-variable] unused variable 'owner' (100% confidence)
.venv/lib/python3.14/site-packages/pip/_internal/... (many more)
```

**Impact:** Medium - Pollutes output with irrelevant violations from third-party code, making it harder to identify real issues.

---

### BUG-003: Symlinks with Mismatched Extensions Cause Python Tool Parse Failures

**Severity:** Medium
**Component:** File Discovery / Ruff / ty
**Version:** 1.3.0

**Description:**
When a symlink has a `.py` extension but points to a TypeScript file (or vice versa), Python tools (Ruff Format, ty) attempt to parse the file based on its extension rather than its content, causing syntax errors.

**Steps to Reproduce:**
1. Create a TypeScript file: `original.ts`
2. Create a symlink: `linked-from-typescript.py -> original.ts`
3. Run `cm code check`

**Expected Behavior:**
- Tool should follow symlinks and check actual content type, OR
- Tool should skip symlinks entirely, OR
- Tool should have configurable symlink behavior

**Actual Behavior:**
```
✗ Ruff Format: 1 violation(s)
    error  Ruff format error: error: Failed to parse test-scenarios/edge-cases/symlinks/linked-from-typescript.py:1:1: Expected a statement
✗ ty: ... violation(s)
    test-scenarios/edge-cases/symlinks/linked-from-typescript.py:1:1 error [invalid-syntax] Expected a statement
```

**Test Case:** `test-scenarios/edge-cases/symlinks/`

---

### BUG-004: Unicode Characters in Filenames Incorrectly Flagged as Naming Violations

**Severity:** Low
**Component:** Naming Check
**Version:** 1.3.0

**Description:**
Files with valid kebab-case names containing non-ASCII characters (like `café-module.ts`) are reported as naming violations. The naming check appears to only recognize ASCII letters as valid for kebab-case.

**Steps to Reproduce:**
1. Create a file named `café-module.ts` (valid kebab-case with accent)
2. Run `cm code check` with naming enabled for kebab-case

**Expected Behavior:**
`café-module.ts` should be recognized as valid kebab-case (it has lowercase letters and hyphens).

**Actual Behavior:**
```
café-module.ts error [file-case] File "café-module" should be kebab-case
```

**Impact:** Low - Affects internationalized codebases using non-ASCII characters in file names.

**Test Case:** `bug-hunting-tests/unicode-tests/café-module.ts`

---

### BUG-005: Coverage Command Shows "exit code undefined" for Non-existent Commands

**Severity:** Low
**Component:** Coverage Run
**Version:** 1.3.0

**Description:**
When the coverage command specified in `check.toml` doesn't exist, the error message shows "exit code undefined" instead of a proper exit code.

**Steps to Reproduce:**
1. Create a `check.toml` with:
```toml
[code.coverage_run]
enabled = true
min_threshold = 10
command = "nonexistent-command-that-doesnt-exist"
```
2. Run `cm code check`

**Expected Behavior:**
Error message should show a proper exit code (e.g., 127 for command not found):
```
error  Test command failed with exit code 127: command not found
```

**Actual Behavior:**
```
error  Test command failed with exit code undefined:
```

**Impact:** Low - Confusing error message that makes debugging configuration harder.

**Test Case:** `bug-hunting-tests/test-configs/coverage-bad-command.toml`

---

### BUG-006: Gitleaks Reports Duplicate Violations for Same Secret

**Severity:** Low
**Component:** Gitleaks Integration
**Version:** 1.3.0

**Description:**
Gitleaks reports the same API key twice as separate violations when it appears once in a file.

**Steps to Reproduce:**
1. Create a TypeScript file with an encoded API key
2. Run `cm code check`

**Actual Behavior (from JSON output):**
```json
{
  "file": "bug-hunting-tests/secrets/base64_secret.ts",
  "line": 4,
  "code": "generic-api-key"
},
{
  "file": "bug-hunting-tests/secrets/base64_secret.ts",
  "line": 4,
  "code": "generic-api-key"
}
```

**Expected Behavior:**
Each unique secret should only be reported once.

**Impact:** Low - Inflates violation counts and makes output harder to read.

**Test Case:** `bug-hunting-tests/secrets/base64_secret.ts`

---

### BUG-007: Monorepo Test Fixture Has Invalid Configuration

**Severity:** Info
**Component:** Test Fixtures
**Version:** 1.3.0

**Description:**
The monorepo test fixture at `test-scenarios/monorepo/check.toml` contains an invalid key `[code.tests]` that causes configuration validation to fail.

**Steps to Reproduce:**
1. `cd test-scenarios/monorepo`
2. Run `cm code check`

**Actual Behavior:**
```
Config error: Invalid check.toml configuration:
  - code: Unrecognized key(s) in object: 'tests'
```

**Expected Behavior:**
Test fixtures should have valid configurations to properly test tool behavior.

**Impact:** Info - Test fixture issue, not a tool bug.

---

### BUG-008: Emoji Characters in Filenames Incorrectly Flagged as Naming Violations

**Severity:** Low
**Component:** Naming Check
**Version:** 1.3.0

**Description:**
Files with valid snake_case names containing emoji characters (like `emoji_🚀_test.py`) are reported as naming violations.

**Steps to Reproduce:**
1. Create a file named `emoji_🚀_test.py` (valid snake_case with emoji)
2. Run `cm code check` with naming enabled for snake_case

**Expected Behavior:**
`emoji_🚀_test.py` should be recognized as valid snake_case (it uses underscores between words).

**Actual Behavior:**
```
emoji_🚀_test.py error [file-case] File "emoji_🚀_test" should be snake_case
```

**Test Case:** `bug-hunting-tests/unicode-tests/emoji_🚀_test.py`

---

### BUG-009: Configuration Validation Accepts Duplicate Extensions Across Rules

**Severity:** Medium
**Component:** Configuration Validation
**Version:** 1.3.0

**Description:**
`cm validate config` accepts configurations where the same file extension appears in multiple naming rules with different case requirements. This leads to BUG-001 where checks silently fail.

**Steps to Reproduce:**
1. Create config with duplicate extension in different rules (see BUG-001)
2. Run `cm validate config`

**Expected Behavior:**
Validation should either:
- Reject configurations with duplicate extensions across rules, OR
- Warn about the ambiguity

**Actual Behavior:**
```
✓ Valid
```

**Impact:** Medium - Invalid configurations pass validation, leading to silent failures at runtime.

---

### ~~BUG-010: Duplicate Extensions in Same Rule Array Accepted Without Warning~~ [FIXED in v1.3.1]

**Severity:** Low
**Component:** Configuration Validation
**Version:** 1.3.0
**Fixed in:** 1.3.1

**Description:**
A naming rule with duplicate extensions in the same array (e.g., `extensions = ["ts", "tsx", "ts"]`) passes validation without warning.

**Resolution:**
Fixed in v1.3.1 - Schema validation now rejects duplicate values in extension arrays with error:
```
✗ Invalid: Invalid check.toml configuration:
  - code.naming.rules.0.extensions: Duplicate values not allowed
```

---

## Potential Issues (Need Further Investigation)

### POTENTIAL-001: Gitleaks May Miss Some Secret Patterns

**Component:** Gitleaks Integration
**Version:** 1.3.0

**Description:**
Some credential patterns that might be expected to be detected were not flagged:
- AWS credentials in Python files (AKIAIOSFODNN7EXAMPLE pattern)
- Database connection strings with embedded passwords
- PEM private key files

This may be expected gitleaks behavior or a configuration issue rather than a bug.

**Test Case:** `bug-hunting-tests/secrets/connection_strings.py`, `bug-hunting-tests/secrets/private_key.pem`

---

## Test Execution Summary (2026-01-19) - check-my-toolkit v1.3.0

`cm code check` execution completed with violations from test fixtures.

| Tool | Violations | Status |
|------|------------|--------|
| ESLint | 3 | Working |
| Ruff | 43+ | Working |
| Ruff Format | 1+ | Working (but see BUG-003) |
| Prettier | 9-11 | Working |
| TypeScript | 0 | Passed |
| ty | 43+ | Working (but see BUG-003) |
| Knip | 20+ | Working |
| Vulture | 64+ | Working (but see BUG-002) |
| gitleaks | 5-8 | Working (but see BUG-006) |
| pnpmaudit | 0 | Passed |
| pipaudit | 0 | Passed |
| Coverage Run | 0 | Passed |
| Naming | 10+ | Partially Working (see BUG-001, BUG-004, BUG-008) |
| Disable Comments | 32+ | Partially Working (see BUG-001) |

### Test Files Created

**Configuration Edge Cases:** `bug-hunting-tests/test-configs/`
- `invalid-toml.toml` - Tests TOML parsing errors
- `empty.toml` - Tests empty configuration
- `wrong-types.toml` - Tests type validation
- `negative-threshold.toml` - Tests boundary validation
- `threshold-over-100.toml` - Tests boundary validation
- `unknown-tool.toml` - Tests unknown key rejection
- `unknown-case.toml` - Tests enum validation
- `duplicate-extension.toml` - **REPRODUCES BUG-001**
- `original-with-duplicate.toml` - **REPRODUCES BUG-001**
- `coverage-bad-command.toml` - **REPRODUCES BUG-005**
- `coverage-empty-command.toml` - Tests empty command handling

**Unicode Tests:** `bug-hunting-tests/unicode-tests/`
- `café-module.ts` - **REPRODUCES BUG-004**
- `日本語ファイル.ts` - Tests Japanese characters
- `emoji_🚀_test.py` - **REPRODUCES BUG-008**

**Special Characters:** `bug-hunting-tests/special-chars/`
- `file with spaces.ts` - Tests space handling
- `file$with$dollars.ts` - Tests special character handling
- `file[with]brackets.py` - Tests bracket handling

**Disable Comments:** `bug-hunting-tests/disable-comments/`
- `multiline-disable.ts` - Tests multiline disable comments
- `false_positives.py` - Tests false positive detection
- `edge_cases.py` - Tests edge cases (spacing, case variations)

**Secrets:** `bug-hunting-tests/secrets/`
- `base64_secret.ts` - **REPRODUCES BUG-006**
- `connection_strings.py` - Tests DB URL detection
- `false_positive_secrets.ts` - Tests false positive handling
- `private_key.pem` - Tests PEM detection

**Deep Nesting:** `bug-hunting-tests/deep-nesting/`
- 10 levels of nested directories with test file

**Long Filenames:** `bug-hunting-tests/long-name/`
- Very long filename test

**Monorepo Test:** `bug-hunting-tests/monorepo-test/`
- Complete monorepo structure for testing

---

## Test Execution Summary (2026-01-19) - check-my-toolkit v1.4.0

### v1.4.0 New Feature Testing

| Feature | Status | Notes |
|---------|--------|-------|
| forbidden_files | **BROKEN** | BUG-011: Config dropped during merge, feature completely non-functional |

### v1.3.1 Bug Fix Verification

| Bug | Fix Status | Verified |
|-----|------------|----------|
| Duplicate extension validation in schema | FIXED | Yes - now rejects `["ts", "ts"]` |
| undefined exitCode handling in coverage-run | FIXED | See v1.3.1 changelog |
| Virtual environment exclusion in vulture | FIXED | See v1.3.1 changelog |
| Deduplicated extensions in glob patterns | FIXED | See v1.3.1 changelog |
| Symlink detection in ruff and ty | FIXED | See v1.3.1 changelog |
| Comment-aware pattern detection | FIXED | See v1.3.1 changelog |
| Non-greedy scope regex in commits | FIXED | Verified working |
| Word boundary validation in issue reference | FIXED | See v1.3.1 changelog |
| Frontmatter delimiter error messages | FIXED | See v1.3.1 changelog |
| CODEOWNERS line reporting | FIXED | See v1.3.1 changelog |
| YAML parse error reporting in CI | FIXED | See v1.3.1 changelog |
| Dynamic branch examples from config | FIXED | See v1.3.1 changelog |

---

## Closed Issues

### BUG-010: Duplicate Extensions in Same Rule Array - FIXED in v1.3.1

See entry above in Open Issues (marked as fixed).
