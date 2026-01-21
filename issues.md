# Issues Log

This file tracks issues discovered during test implementation and execution.

**Last Updated:** 2026-01-21
**Current Version:** check-my-toolkit v1.6.0

---

## Open Issues

### BUG-012: forbidden_files ignore Option Not Working

**Severity:** High
**Component:** Forbidden Files Runner
**Version:** 1.6.0

**Description:**
The `ignore` option in `[process.forbidden_files]` configuration does not work. Files in directories that should be ignored are still flagged as violations.

**Steps to Reproduce:**
1. Create a `check.toml` with:
```toml
[process.forbidden_files]
enabled = true
files = ["**/.env", "**/secrets.json"]
ignore = ["**/test-exceptions/**", "test-exceptions/**"]
message = "Test message"
```
2. Create test files:
```bash
mkdir -p test-exceptions
touch test-exceptions/.env test-exceptions/secrets.json
```
3. Run `cm process check`

**Expected Behavior:**
Files in `test-exceptions/` directory should NOT be flagged because the directory is in the ignore list.

**Actual Behavior:**
```json
{
  "file": "test-exceptions/.env",
  "message": "Forbidden file exists: test-exceptions/.env (matched pattern: **/.env). Test message"
}
{
  "file": "test-exceptions/secrets.json",
  "message": "Forbidden file exists: test-exceptions/secrets.json (matched pattern: **/secrets.json). Test message"
}
```

**Root Cause Analysis:**
The `ignore` option is passed to glob (line 45 of `forbidden-files.js`), but the ignore patterns may not be compatible with how the glob library expects them, or the glob library version has different behavior.

**Test Case:** `v1.4-v1.6-tests/forbidden-files/check.toml`, `v1.4-v1.6-tests/forbidden-files/check-alt-ignore.toml`

---

### BUG-013: forbidden_files Reports Duplicate Violations for Same File

**Severity:** Medium
**Component:** Forbidden Files Runner
**Version:** 1.6.0

**Description:**
When a file matches multiple forbidden patterns, it is reported as a separate violation for each pattern. This inflates violation counts and makes output harder to read.

**Steps to Reproduce:**
1. Create a `check.toml` with overlapping patterns:
```toml
[process.forbidden_files]
enabled = true
files = [".env", "**/.env"]
```
2. Create a `.env` file in the root directory
3. Run `cm process check`

**Expected Behavior:**
Each file should be reported only once, regardless of how many patterns it matches.

**Actual Behavior:**
The same file is reported multiple times:
```json
{
  "file": ".env",
  "message": "Forbidden file exists: .env (matched pattern: .env)"
},
{
  "file": ".env",
  "message": "Forbidden file exists: .env (matched pattern: **/.env)"
}
```

**Impact:** Violation counts become inflated and misleading. A project with 3 forbidden files could show 6+ violations if patterns overlap.

**Root Cause:**
The runner processes each pattern independently (line 27-30 of `forbidden-files.js`) and collects all violations without deduplicating by file path.

**Suggested Fix:**
Deduplicate violations by file path before returning, keeping only the first match or combining patterns in the message.

**Test Case:** `v1.4-v1.6-tests/forbidden-files/check.toml`

---

### BUG-014: Schema Validation Accepts Empty Extensions Array But Audit Rejects It

**Severity:** Low
**Component:** Configuration Validation / Naming Audit
**Version:** 1.6.0

**Description:**
`cm validate config` accepts a naming rule with an empty extensions array, but `cm audit` rejects the same configuration. This inconsistency is confusing.

**Steps to Reproduce:**
1. Create a `check.toml` with:
```toml
[code.naming]
enabled = true

[[code.naming.rules]]
extensions = []
file_case = "kebab-case"
folder_case = "kebab-case"
```
2. Run `cm validate config` - passes
3. Run `cm audit` - fails with "Naming rule must have at least one extension"

**Expected Behavior:**
Both commands should have consistent behavior - either both accept or both reject empty extensions.

**Actual Behavior:**
- `cm validate config`: `✓ Valid`
- `cm audit`:
```json
{
  "message": "Naming rule must have at least one extension",
  "severity": "error"
}
```

**Impact:** Low - Users may create configurations that pass validation but fail audit, leading to confusion.

**Test Case:** `v1.4-v1.6-tests/schema-validation/empty-extensions.toml`

---

## Test Results Summary

### Features Tested (v1.4.0 - v1.6.0)

| Feature | Status | Notes |
|---------|--------|-------|
| forbidden_files basic functionality | Working | Detects forbidden files correctly |
| forbidden_files custom message | Working | Custom messages are appended correctly |
| forbidden_files ignore option | **BROKEN** | BUG-012: Ignore patterns not applied |
| forbidden_files deduplication | **BROKEN** | BUG-013: Duplicate violations for same file |
| Naming dynamic routes | Working | `allow_dynamic_routes` works correctly for [id], [...slug], (group), @parallel |
| Naming numeric files | Working | 404, 500 etc. correctly allowed |
| Naming content validation | Working | Content inside dynamic routes is validated (e.g., [UPPERCASE-ID] flagged) |
| Vulture exclusions | Working | .venv, venv, node_modules correctly excluded |
| Schema duplicate extensions (across rules) | Working | Correctly rejects duplicate extensions |
| Schema duplicate extensions (same array) | Working | Correctly rejects ["ts", "ts"] |
| Schema empty extensions | **INCONSISTENT** | BUG-014: validate accepts, audit rejects |

### Test Files Created

**forbidden_files tests:** `v1.4-v1.6-tests/forbidden-files/`
- `check.toml` - Full test with ignore patterns (reproduces BUG-012, BUG-013)
- `check-alt-ignore.toml` - Alternative ignore pattern format
- `check-empty-files.toml` - Empty files array
- `check-invalid-pattern.toml` - Invalid glob pattern
- `check-brace-pattern.toml` - Empty string pattern
- `check-no-message.toml` - No custom message
- `check-special-chars.toml` - Special characters in patterns

**Naming dynamic routes tests:** `v1.4-v1.6-tests/naming-dynamic-routes/`
- `check.toml` - With allow_dynamic_routes=true
- `check-no-dynamic.toml` - With allow_dynamic_routes=false
- Test directories: `[id]`, `[...slug]`, `[[...path]]`, `(marketing)`, `(auth)`, `@sidebar`, `@modal`
- Edge cases: `[UPPERCASE-ID]`, `[invalid_snake]`, `[valid-kebab-id]`, `(InvalidGroup)`, `@InvalidParallel`

**Naming numeric tests:** `v1.4-v1.6-tests/naming-numeric/`
- `check.toml` - Basic config
- Test files: `404.tsx`, `500.tsx`, `200.ts`, `404error.tsx`, `error404.tsx`, `4O4.tsx` (O not 0)

**Vulture exclusions tests:** `v1.4-v1.6-tests/vulture-exclusions/`
- `check.toml` - Vulture enabled
- `.venv/` and `venv/` directories with Python files (should be excluded)
- `src/` directory with Python files (should be scanned)

**Schema validation tests:** `v1.4-v1.6-tests/schema-validation/`
- `duplicate-across-rules.toml` - Duplicate extensions across rules (should fail)
- `duplicate-same-array.toml` - Duplicate in same array (should fail)
- `three-rules-overlap.toml` - Three rules with overlapping extensions (should fail)
- `empty-extensions.toml` - Empty extensions array (inconsistent behavior)
