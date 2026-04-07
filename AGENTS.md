# AGENTS.md - Agent Coding Guidelines

This is a TypeScript CLI project for markdown multilevel numbering.

## Project Structure

```
├── src/
│   └── cli.ts        # CLI entry point (commander-based)
├── package.json
└── tsconfig.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build CLI using esbuild |
| `npm run dev` | Watch mode for development |

## Code Style

### TypeScript

- Use TypeScript types explicitly; avoid `any`
- Use `interface` for object shapes, `type` for unions/aliases
- Enable strict mode (`strict: true` in tsconfig.json)

### Imports

- Use ES module syntax (`import`/`export`)
- Order imports: external libs → internal modules → node built-ins
- Prefer named imports over default imports when available

```typescript
// Good
import { Command } from 'commander'
import { readFile, writeFile } from 'node:fs/promises'

// Avoid
const { Command } = require('commander')
```

### Naming Conventions

- **Files**: kebab-case (e.g., `cli.ts`, `version.ts`)
- **Functions/variables**: camelCase
- **Classes/Types**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE for true constants, camelCase otherwise
- **Interfaces**: PascalCase, optionally prefix with `I` (e.g., `IOptions`) or use descriptive names

### Formatting

- 2 spaces for indentation
- Single quotes for strings (except when string contains single quotes)
- Semicolons at end of statements
- Trailing commas in objects/arrays
- Maximum line length: 100 characters
- Add type annotations for function parameters and return types

```typescript
// Good
async function processFile(input: string, output?: string): Promise<void> {
  const content = await readFile(input, 'utf-8')
  const result = transform(content)
}

// Bad
async function processFile(input, output?) {
  const content = await readFile(input, 'utf-8')
  const result = transform(content)
}
```

### Error Handling

- Use try/catch for async operations
- Provide meaningful error messages
- Use `instanceof Error` checks for type narrowing

```typescript
try {
  const content = await readFile(path, 'utf-8')
  // ...
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error(`Error: ${message}`)
  process.exit(1)
}
```

- Never expose internal errors to end users; wrap with user-friendly messages
- Log errors appropriately (console.error for CLI tools)

### Functions

- Keep functions small and focused
- Use explicit return types for exported functions
- Prefer async/await over raw promises
- Handle all error paths explicitly

### Testing

- Tests should be in `__tests__/` or alongside files as `*.test.ts`
- Use a test framework (e.g., vitest, jest)
- Run single test: `npm test -- --testNamePattern="pattern"` (depends on test framework)

### General

- No comments unless explaining complex business logic
- Avoid magic numbers; use named constants
- Keep module-level code minimal; wrap in functions
- Use meaningful variable names (no single letters except in loops)

## Dependencies

- `commander`: CLI argument parsing
- `markdown-multilevel-numbering`: Core library for numbering logic

## Build System

Uses esbuild CLI for bundling. Output is CommonJS format for Node.js compatibility.

```bash
npm run build   # build
npm run dev     # watch mode
```