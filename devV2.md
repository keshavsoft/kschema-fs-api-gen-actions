# KSchema API Gen Actions

## Introduction

`@keshavsoft/kschema-api-gen-actions` is not just a collection of scripts.  
It is a modular command execution framework designed to generate API-related code using scalable architecture principles.

The project evolved from simple utility scripts into a structured CLI platform capable of:

- command-based execution
- version isolation
- dynamic module loading
- task orchestration
- scalable action registration
- reusable workflow pipelines

The primary goal of this architecture is to make adding new generators simple without changing the core execution engine.

---

# High Level Architecture

The application follows a layered execution pipeline.

```text
cli.js
    ↓
loadRunner.js
    ↓
v17/start.js
    ↓
resolveCommand.js
    ↓
dynamic task import
    ↓
action execution
```

Each layer has a single responsibility.

---

# Why This Architecture Exists

Earlier script-based systems usually become difficult to maintain because:

- all logic stays in one file
- commands become tightly coupled
- adding new features creates side effects
- version upgrades break older behavior

This project avoids those problems by separating:

- command resolution
- execution orchestration
- task implementation
- version management
- configuration metadata

---

# Entry Point

## cli.js

Location:

```text
bin/cli.js
```

This is the public executable entry point.

Responsibilities:

- detect latest supported version
- load correct runtime
- execute runner

Example flow:

```js
const version = getLatestVersion();

const runner = await loadRunner(version);

await runner();
```

This file intentionally contains minimal logic.

That keeps the entry layer stable.

---

# Runtime Loader

## loadRunner.js

Location:

```text
bin/core/loadRunner.js
```

Purpose:

Dynamically load the correct runtime based on version.

Example:

```js
await import(`../${version}/start.js`)
```

Benefits:

- version isolation
- backward compatibility
- safe upgrades
- independent runtime evolution

This design allows multiple versions to coexist.

Example:

```text
v15/
v16/
v17/
```

Each version behaves like an independent runtime engine.

---

# Runtime Engine

## start.js

Location:

```text
bin/v17/start.js
```

Responsibilities:

- parse user input
- validate commands
- resolve executable task
- execute selected action

Execution flow:

```text
parse input
    ↓
resolve command
    ↓
load task
    ↓
execute task
```

This file acts as the orchestration layer.

---

# Command Resolution

## resolveCommand.js

Location:

```text
bin/v17/core/resolveCommand.js
```

Purpose:

Convert command text into executable modules.

Example:

```js
const matched = actions.find(x => x.cmd === cmd);
```

Then dynamically load:

```js
await import(`../tasks/actions/${matched.file}.js`)
```

This creates a plugin-style architecture.

The core engine never needs direct knowledge about task implementations.

---

# actions.json

Location:

```text
bin/v17/config/actions.json
```

This is one of the most important files in the architecture.

It acts as:

- command registry
- metadata registry
- execution mapping layer

Example:

```json
{
  "cmd": "Insert",
  "file": "insert"
}
```

Meaning:

```text
CLI command "Insert"
    ↓
maps to
    ↓
insert.js
```

Benefits:

- easy scalability
- zero hardcoded command logic
- configurable runtime behavior
- cleaner orchestration

Adding a new command becomes configuration-driven.

---

# Task Layer

Location:

```text
bin/v17/tasks/actions/
```

This layer contains actual business logic.

Examples:

```text
showAll.js
insert.js
distinct.js
filterColumns.js
```

Each file handles one independent action.

This creates:

- separation of concerns
- isolated debugging
- safer refactoring
- reusable workflows

---

# Folder Strategy

## core/

Contains reusable infrastructure logic.

Examples:

- parsing
- command resolution
- shared helpers

---

## config/

Contains metadata and runtime mappings.

Examples:

- actions.json
- command registry

---

## tasks/

Contains executable business workflows.

This is where actual generation logic lives.

---

# Dynamic Import Strategy

Dynamic imports are a major architectural decision in this project.

Example:

```js
await import(path)
```

Benefits:

- lazy loading
- reduced startup overhead
- scalable command system
- plugin-style extensibility

Only required modules are loaded during execution.

---

# Version Isolation

The architecture supports independent runtime versions.

Example:

```text
v15/
v16/
v17/
```

Why this matters:

- old projects continue working
- new versions evolve safely
- breaking changes stay isolated
- migration becomes controlled

This is similar to how larger frameworks maintain runtime compatibility.

---

# Scalability Model

This architecture scales horizontally.

Meaning:

adding new commands does not require modifying the execution engine.

To add a command:

1. Create task file
2. Register action in `actions.json`
3. Done

The core runtime remains unchanged.

That is a strong scalability characteristic.

---

# Example Command Lifecycle

Example user command:

```bash
kschema-api-gen-actions Insert
```

Execution path:

```text
cli.js
    ↓
loadRunner.js
    ↓
v17/start.js
    ↓
resolveCommand.js
    ↓
actions.json lookup
    ↓
dynamic import
    ↓
insert.js execution
```

This is the full execution pipeline.

---

# Architectural Strengths

## Modular

Every layer has a dedicated responsibility.

---

## Extensible

New commands can be added without changing the engine.

---

## Maintainable

Smaller isolated files simplify debugging.

---

## Version Safe

Older runtimes remain untouched.

---

## Plugin Friendly

Dynamic imports enable future plugin systems.

---

# Design Philosophy

This project follows a simple principle:

```text
Small focused modules are easier to scale than large intelligent files.
```

The architecture prioritizes:

- clarity
- modularity
- scalability
- controlled evolution
- runtime flexibility

---

# Future Possibilities

This structure can evolve into:

- full CLI framework
- plugin ecosystem
- code generation platform
- scaffolding engine
- API workflow automation system

The current architecture already supports that direction.

---

# Conclusion

This project demonstrates how a simple utility can evolve into a scalable developer platform through:

- layered architecture
- dynamic imports
- command registries
- isolated runtimes
- modular execution pipelines

The codebase is intentionally structured to support long-term growth while keeping execution logic understandable and maintainable.