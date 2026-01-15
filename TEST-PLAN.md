# Mixed Language CODE Domain Test Plan

Complete test coverage for check-my-toolkit CODE domain features in mixed TypeScript + Python projects.

This repo tests scenarios where both TypeScript and Python code exist in the same project.

## Purpose

This test plan covers:
1. **Cross-language tool behavior** - How tools handle mixed codebases
2. **Combined configuration** - Single check.toml for multiple languages
3. **Tool interaction** - Multiple tools running together
4. **Edge cases** - Language-agnostic features across both languages

---

## Project Structure

```
mixed-code-test/
├── check.toml
├── package.json           # For TS/JS tools
├── pyproject.toml         # For Python tools
├── tsconfig.json
├── eslint.config.js
├── src/
│   ├── typescript/
│   │   ├── index.ts
│   │   └── utils.ts
│   └── python/
│       ├── __init__.py
│       ├── main.py
│       └── helpers.py
└── tests/
    ├── ts/
    │   └── index.test.ts
    └── py/
        └── test_main.py
```

---

## Combined Configuration

```toml
# TypeScript tools
[code.linting.eslint]
enabled = true
files = ["src/typescript/**/*.ts"]

[code.formatting.prettier]
enabled = true

[code.types.tsc]
enabled = true

[code.unused.knip]
enabled = true

[code.security.npmaudit]
enabled = true

# Python tools
[code.linting.ruff]
enabled = true
format = true

[code.types.ty]
enabled = true

[code.unused.vulture]
enabled = true

[code.security.pipaudit]
enabled = true

# Language-agnostic
[code.security.secrets]
enabled = true

[code.tests]
enabled = true
pattern = "**/*.{test,spec}.ts,**/test_*.py"

[code.naming]
enabled = true

[[code.naming.rules]]
extensions = ["ts", "tsx"]
file_case = "kebab-case"
folder_case = "kebab-case"

[[code.naming.rules]]
extensions = ["py"]
file_case = "snake_case"
folder_case = "snake_case"

[code.quality.disable-comments]
enabled = true
extensions = ["ts", "tsx", "js", "jsx", "py"]
```

---

# Mixed Language Tests

## MIX-001: All Tools Run
**Setup:** Both TS and Python code present
**Expected:** All enabled tools run, results aggregated

## MIX-002: TS Tools Skip Python Files
**Setup:** Python violations, TS tools enabled
**Expected:** ESLint/tsc/Knip don't report Python issues

## MIX-003: Python Tools Skip TS Files
**Setup:** TypeScript violations, Python tools enabled
**Expected:** Ruff/ty/Vulture don't report TS issues

## MIX-004: Gitleaks Scans All Files
**Setup:** Secrets in both TS and Python files
**Expected:** Both detected

## MIX-005: Naming Rules Per Language
**Setup:** `kebab-case.ts` and `snake_case.py`
**Config:** Different rules per extension
**Expected:** Each validated by appropriate rule

## MIX-006: Disable Comments All Languages
**Setup:** `// eslint-disable` in TS, `# noqa` in Python
**Config:** `extensions = ["ts", "tsx", "py"]`
**Expected:** Both detected

## MIX-007: Tests Pattern Multi-Language
**Setup:** `*.test.ts` and `test_*.py` files
**Config:** `pattern = "**/*.{test,spec}.ts,**/test_*.py"`
**Expected:** Both patterns matched

---

# Cross-Language Naming Tests

## NAM-MIX-001: Different Cases Per Extension
**Setup:**
- `src/typescript/my-component.ts` (kebab-case)
- `src/python/my_module.py` (snake_case)
**Expected:** Both pass

## NAM-MIX-002: Wrong Case Per Language
**Setup:**
- `src/typescript/MyComponent.ts` (should be kebab-case)
- `src/python/myModule.py` (should be snake_case)
**Expected:** Both violations reported

## NAM-MIX-003: Folder Rules Per Language
**Setup:**
- `src/user-profile/index.ts` in kebab-case folder
- `src/user_utils/helpers.py` in snake_case folder
**Expected:** Each validated by own rule

## NAM-MIX-004: Shared Folder Different Extensions
**Setup:** Same folder has both `.ts` and `.py` files
**Expected:** Each file validated by its extension's rule

---

# Gitleaks Cross-Language Tests

## GLK-MIX-001: Secret in TypeScript
**Setup:** `const API_KEY = "sk-secret123";`
**Expected:** Detected

## GLK-MIX-002: Secret in Python
**Setup:** `API_KEY = "sk-secret123"`
**Expected:** Detected

## GLK-MIX-003: Secret in Config File
**Setup:** Secret in `.env`, `config.json`, `settings.yaml`
**Expected:** All detected (not language-specific)

## GLK-MIX-004: Secrets in Both Languages
**Setup:** Secrets in TS and Python files
**Expected:** Both reported with correct file paths

---

# Disable Comments Cross-Language Tests

## DIS-MIX-001: ESLint Disable in TS
**Setup:** `// eslint-disable-next-line`
**Expected:** Detected

## DIS-MIX-002: noqa in Python
**Setup:** `# noqa`
**Expected:** Detected

## DIS-MIX-003: ts-ignore in TS
**Setup:** `// @ts-ignore`
**Expected:** Detected

## DIS-MIX-004: type: ignore in Python
**Setup:** `# type: ignore`
**Expected:** Detected

## DIS-MIX-005: All Comment Types
**Setup:** Various disable comments in both languages
**Expected:** All detected, grouped by file

---

# Tests Validation Cross-Language Tests

## TST-MIX-001: TS Tests Only
**Setup:** Only `*.test.ts` files exist
**Config:** Pattern matches TS tests
**Expected:** Pass

## TST-MIX-002: Python Tests Only
**Setup:** Only `test_*.py` files exist
**Config:** Pattern matches Python tests
**Expected:** Pass

## TST-MIX-003: Both Languages Have Tests
**Setup:** Both TS and Python test files
**Expected:** All counted toward min_test_files

## TST-MIX-004: Missing One Language Tests
**Setup:** TS tests exist, no Python tests
**Config:** Pattern expects both
**Expected:** Depends on pattern - may pass if optional

---

# Tool Isolation Tests

## ISO-001: ESLint Ignores Python
**Setup:** Invalid Python syntax in `.py` file
**Expected:** ESLint doesn't error

## ISO-002: Ruff Ignores TypeScript
**Setup:** Invalid TS syntax in `.ts` file
**Expected:** Ruff doesn't error

## ISO-003: tsc Ignores Python
**Setup:** Type errors in Python
**Expected:** tsc doesn't report Python issues

## ISO-004: ty Ignores TypeScript
**Setup:** Type errors in TypeScript
**Expected:** ty doesn't report TS issues

## ISO-005: Knip Only JS/TS
**Setup:** Unused Python exports
**Expected:** Knip only reports JS/TS issues

## ISO-006: Vulture Only Python
**Setup:** Unused TS exports
**Expected:** Vulture only reports Python issues

---

# Audit Cross-Language Tests

## AUD-MIX-001: All Configs Present
**Setup:** eslint.config.js, tsconfig.json, ruff.toml, ty.toml
**Expected:** `cm code audit` passes

## AUD-MIX-002: Missing TS Config
**Setup:** No tsconfig.json
**Expected:** tsc audit fails, Python audits pass

## AUD-MIX-003: Missing Python Config
**Setup:** No ruff.toml or [tool.ruff]
**Expected:** Ruff audit fails, TS audits pass

## AUD-MIX-004: Partial Configuration
**Setup:** Some tools configured, others not
**Expected:** Missing configs reported, others pass

---

# Output Tests

## OUT-MIX-001: Text Output Groups by Tool
**Command:** `cm code check`
**Expected:** Results grouped by tool, clear language separation

## OUT-MIX-002: JSON Output All Tools
**Command:** `cm code check -f json`
**Expected:** Single JSON with all violations

## OUT-MIX-003: Violations Identify Language
**Expected:** File paths show which language affected

---

# Concurrent Execution Tests

## CON-001: Tools Run in Parallel
**Setup:** Both TS and Python violations
**Expected:** Results from all tools, fast execution

## CON-002: One Language Fails Early
**Setup:** Critical error in Python tooling
**Expected:** TS tools still complete

## CON-003: Tool Timeout
**Setup:** Slow project, some tools timeout
**Expected:** Completed tools report results

---

# Edge Cases

## EDGE-001: Empty TypeScript Directory
**Setup:** `src/typescript/` exists but empty
**Expected:** TS tools skip or pass

## EDGE-002: Empty Python Directory
**Setup:** `src/python/` exists but empty
**Expected:** Python tools skip or pass

## EDGE-003: Only Config Files
**Setup:** Just check.toml, no source code
**Expected:** All tools skip or pass

## EDGE-004: Symlinks Between Languages
**Setup:** Python file symlinked in TS directory
**Expected:** Handled gracefully

## EDGE-005: Files Without Extension
**Setup:** Script files without `.ts` or `.py`
**Expected:** Not checked by language-specific tools

## EDGE-006: Dual Extension Files
**Setup:** Files like `script.py.ts` (edge case)
**Expected:** Validated by most specific match

---

# Monorepo Simulation

## MONO-001: Separate Packages
**Setup:**
```
packages/
├── frontend/     # TypeScript
└── backend/      # Python
```
**Expected:** Each subdirectory treated separately

## MONO-002: Shared Dependencies
**Setup:** package.json and pyproject.toml at root
**Expected:** Both dependency audits run

## MONO-003: Root-level check.toml
**Setup:** Single check.toml for entire repo
**Expected:** All tools configured once, run everywhere

---

# Checklist

## Mixed Language Core
- [ ] MIX-001 through MIX-007

## Cross-Language Naming
- [ ] NAM-MIX-001 through NAM-MIX-004

## Cross-Language Gitleaks
- [ ] GLK-MIX-001 through GLK-MIX-004

## Cross-Language Disable Comments
- [ ] DIS-MIX-001 through DIS-MIX-005

## Cross-Language Tests Validation
- [ ] TST-MIX-001 through TST-MIX-004

## Tool Isolation
- [ ] ISO-001 through ISO-006

## Cross-Language Audit
- [ ] AUD-MIX-001 through AUD-MIX-004

## Output
- [ ] OUT-MIX-001 through OUT-MIX-003

## Concurrent Execution
- [ ] CON-001 through CON-003

## Edge Cases
- [ ] EDGE-001 through EDGE-006

## Monorepo
- [ ] MONO-001 through MONO-003
