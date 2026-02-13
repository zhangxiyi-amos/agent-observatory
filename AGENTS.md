# AGENTS.md - Development Guide for Coding Agents

*Read this before making any changes.*

## Project Overview

**Name:** agent-observatory
**Purpose:** TODO: Add description
**Tech Stack:** TypeScript, Node.js

## Directory Structure

```
TODO: Add structure
```

## Development Rules

### Code Style
- TypeScript preferred
- Follow existing patterns in the codebase
- Use ESLint + Prettier (config in repo)

### Git Workflow
- Create feature branch: `git checkout -b feature/your-feature`
- Commit messages: `type: description` (e.g., `feat: add user auth`)
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

### Testing
- Every feature needs tests
- Test file: `*.test.ts` or `__tests__/*.ts`
- Run tests: `pnpm test`

### Environment
- Never hardcode secrets
- Use `.env` for local development
- Check `.env.example` for required variables

## Key Files

| File | Purpose |
|------|---------|
|  |

## Common Tasks

### Add a new feature
1. Create feature branch
2. Implement in `src/`
3. Add tests in `__tests__/`
4. Run tests locally
5. Commit with clear message

### Fix a bug
1. Write a failing test that reproduces the bug
2. Fix the code
3. Ensure test passes
4. Commit: `fix: description of fix`

## Gotchas

TODO: Add gotchas

## Contact

If stuck, ask Roci (the orchestrator) for guidance.
