# Development Guide

> Internal developer documentation for `@keshavsoft/kschema-api-gen-actions`

This document explains:

- project architecture
- command flow
- folder structure
- dynamic loading system
- how to add new actions
- how v13 works internally

---

# Goal of This Project

This CLI helps developers generate Express.js API actions quickly.

Instead of manually creating:

- routes
- controller imports
- folders
- boilerplate

the CLI automates everything.

---

# High Level Flow

When user runs:

```bash
npx kschema-api-gen insert
```

the application flow is:

```txt
cli.js
    ↓
start.js
    ↓
parseInput.js
    ↓
resolveCommand.js
    ↓
actions.json
    ↓
dynamic import()
    ↓
tasks/actions/insert.js
```

---

# v13 Architecture

v13 introduced:

- JSON metadata driven command loading
- dynamic imports
- removal of duplicate export files
- centralized command registry

This removed a lot of repetitive code.

---

# Folder Structure

```txt
bin/
├── cli.js
│
├── v13/
│   ├── commands/
│   │   └── loadCommand.js
│   │
│   ├── config/
│   │   └── actions.json
│   │
│   ├── core/
│   │   ├── parseInput.js
│   │   ├── resolveCommand.js
│   │   ├── showUsage.js
│   │   └── createFolder.js
│   │
│   ├── tasks/
│   │   └── actions/
│   │       ├── insert.js
│   │       ├── showAll.js
│   │       └── distinct.js
│   │
│   └── start.js
```

---

# Core Idea

Earlier versions required updating multiple files manually.

Example:

- import statement
- command map
- export command file

This caused duplication.

v13 solves this using:

```txt
actions.json
```

as the single source of truth.

---

# actions.json

Location:

```txt
bin/v13/config/actions.json
```

Example:

```json
[
    {
        "cmd": "showAll",
        "file": "showAll",
        "exportFile": "ShowAll",
        "group": "GetMethods"
    },
    {
        "cmd": "insert",
        "file": "insert",
        "exportFile": "Insert",
        "group": "PostMethods"
    }
]
```

---

# Meaning of Each Field

| Field | Purpose |
|---|---|
| cmd | command typed in CLI |
| file | JS file inside tasks/actions |
| exportFile | external/export name |
| group | logical grouping |

---

# Dynamic Command Loading

## resolveCommand.js

Instead of manual imports:

```js
import Insert from "...";
import ShowAll from "...";
```

v13 dynamically imports command files.

Code:

```js
import actions from "../config/actions.json" with { type: "json" };

export default async function resolveCommand(cmd) {
    const matched = actions.find(x => x.cmd === cmd);

    if (!matched) return null;

    const module = await import(`../tasks/actions/${matched.file}.js`);

    return module.default;
};
```

---

# Why Dynamic Imports?

Benefits:

- zero duplicate imports
- easier scaling
- cleaner architecture
- fewer manual updates
- less maintenance

---

# loadCommand.js

Location:

```txt
bin/v13/commands/loadCommand.js
```

Purpose:

Used by tests and external loaders.

Code:

```js
import actions from "../config/actions.json" with { type: "json" };

export default async function loadCommand(name) {
    const matched = actions.find(x => x.exportFile === name);

    if (!matched) return null;

    const module = await import(`../tasks/actions/${matched.file}.js`);

    return module.default;
}
```

---

# Action Files

Location:

```txt
tasks/actions/
```

Examples:

```txt
insert.js
showAll.js
distinct.js
```

Each action contains the actual business logic.

These files:

- create folders
- copy templates
- update routes
- generate boilerplate

---

# Adding a New Action

Example:

```txt
update.js
```

---

## Step 1

Create:

```txt
tasks/actions/update.js
```

---

## Step 2

Add entry in:

```txt
config/actions.json
```

Example:

```json
{
    "cmd": "update",
    "file": "update",
    "exportFile": "Update",
    "group": "PostMethods"
}
```

---

## Step 3

Done.

No additional imports required.

No command maps required.

No export files required.

Everything works automatically.

---

# Command Execution Flow

Example:

```bash
npx kschema-api-gen insert
```

Internal flow:

```txt
cli.js
    ↓
start.js
    ↓
parseInput()
    ↓
resolveCommand("insert")
    ↓
actions.json lookup
    ↓
dynamic import
    ↓
tasks/actions/insert.js
    ↓
execute action
```

---

# Why This Architecture is Better

## Old v12 Problems

```txt
manual imports ❌
manual maps ❌
duplicate export files ❌
multiple update points ❌
```

---

## New v13 Benefits

```txt
single source of truth ✅
dynamic imports ✅
less maintenance ✅
easier scaling ✅
clean architecture ✅
```

---

# Important Concept

The application is NOT fully JSON driven.

Only metadata is JSON driven.

Meaning:

```txt
JSON → describes commands
JS → contains business logic
```

This is intentional and good architecture.

---

# Testing

Tests use:

```txt
loadCommand.js
```

instead of direct imports.

This keeps tests aligned with real CLI behavior.

---

# Example Test Flow

```txt
test/distinct.js
    ↓
loadCommand.js
    ↓
actions.json
    ↓
tasks/actions/distinct.js
```

---

# Coding Style

Project follows:

- ESM modules
- async/await
- dynamic imports
- convention-based architecture
- minimal configuration

---

# Future Improvements

Potential future ideas:

- auto action generation
- template engine
- TypeScript support
- Swagger generation
- Prisma support
- Sequelize support
- MongoDB support
- validation generation

---

# Beginner Advice

If you are new to this project:

start reading in this order:

```txt
1. cli.js
2. start.js
3. parseInput.js
4. resolveCommand.js
5. actions.json
6. tasks/actions/
```

This will help you understand the entire flow quickly.

---

# Philosophy

This project values:

- simplicity
- developer speed
- scalability
- maintainability
- low repetition
- predictable structure

---

# Final Note

v13 was a major architectural cleanup.

The biggest improvement was:

```txt
moving from duplicated configuration
to centralized metadata
```

This made the project easier to maintain and extend.