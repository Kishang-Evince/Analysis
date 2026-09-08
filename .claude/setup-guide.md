# `.claude` — project AI configuration

This folder teaches claude agents **how this repo works** before they touch code. It is version-controlled team config: same rules for every developer and every agent session.

Human docs live in `docs/` and `README.md`. `.claude/` is **machine-oriented policy** — short, actionable, loaded automatically.

---

## Why this exists

LLM agents start each session with generic knowledge. They do not know:

- Your layer boundaries (controller vs service vs repository)
- Forbidden commands (`npm run build` runs migrations here)
- Naming, import aliases, DTO placement
- When to stop (smallest diff, no unsolicited tests/docs)
- Domain workflows (sync Qualia order, ADO status patch, API flow diagram format)

Without `.claude/`, every chat re-discover architecture from scratch. Agents over-build, put files in wrong folders, run dangerous CLI, ignore team conventions.

**Goal:** encode repeatable decisions once. Agent reads policy → matches existing patterns → smaller, safer diffs.

---

## What lives here

```
.claude/
├── README.md           ← this file
├── rules/              ← always-on or file-scoped constraints (.mdc)
├── skills/             ← task workflows the agent reads when relevant (SKILL.md)
├── hooks.json          ← optional session / tool hooks
└── hooks/              ← hook scripts referenced by hooks.json
```

| Mechanism  | Loaded when                                                     | Best for                                                        |
| ---------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| **Rules**  | Every chat (always) or when matching files open (globs)         | Non‑negotiable standards, guardrails, “never do X”              |
| **Skills** | Agent decides from `description`, or user invokes `/skill-name` | Multi-step workflows, architecture checklists, domain playbooks |
| **Hooks**  | Session start / before tool runs                                | Inject policy text, block risky writes, custom automation       |

**Rules = law.** Short, enforceable, always in context when applicable.

**Skills = playbook.** Longer how-to; read on demand so context stays small.

---

## Rules (`.claude/rules/*.mdc`)

Markdown with YAML frontmatter. claude merges matching rules into agent context.

### Frontmatter

```yaml
---
description: One line — shown in rule picker
alwaysApply: true          # every session
# OR
globs: libs/**/*.ts        # when these files are in context
alwaysApply: false
---
```

### What belongs in rules

- Coding standards (imports, naming, file placement)
- Safety gates (“do not run migration CLI”)
- Scope discipline (“smallest correct change”)
- Required patterns (cache tags, audit log on mutations)
- Comment/doc expectations for certain file types

### What does not belong in rules

- Long tutorials (use `docs/` or a skill)
- One-off ticket instructions
- Secrets, API keys, `.env` values
- Duplicate of entire architecture doc — link instead

### Examples by stack

| Project type             | Example always-on rules                                                                 | Example glob rules                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **NestJS / TypeORM**     | No migration CLI from agent; module layer boundaries; method summary on complex exports | `**/*.entity.ts` — column naming; `**/migrations/**` — suffix bands |
| **React / Next**         | No default export for pages if team uses named; prefer existing UI kit                  | `**/*.tsx` — hooks rules; `**/app/**` — server vs client components |
| **Python / Django**      | Type hints on public API; no raw SQL without review                                     | `**/models.py`, `**/views.py`                                       |
| **Go**                   | Error wrapping style; no `panic` in handlers                                            | `**/*_test.go` — table-driven tests                                 |
| **Mobile (iOS/Android)** | MVVM layer map; no API route duplication per platform                                   | `**/ios/**`, `**/android/**`                                        |
| **Monorepo**             | Package boundary imports; shared util location                                          | Per-package globs (`libs/@foo/**`)                                  |

This repo examples:

- `no-run-migrations.mdc` — agent must not run migration CLI
- `evince-module-standards.mdc` — where controllers, DTOs, constants go
- `no-over-engineering.mdc` — minimal diff, no extra abstractions
- `ponytail.mdc` — reuse before write; fix root cause once

---

## Skills (`.claude/skills/<name>/SKILL.md`)

Skills are **procedures** the agent loads when the task matches the skill `description`.

### Required shape

```markdown
---
name: my-skill-name
description: When to use — third person, specific triggers (file paths, task verbs)
---

# Title

## When to use

...

## Steps

1. ...
2. ...

## Checklist before done

- [ ] ...
```

Optional siblings: `reference.md`, `examples.md`, `agent-prompt.md`, small scripts.

### Personal vs project

| Location            | Scope                                   |
| ------------------- | --------------------------------------- |
| `~/.claude/skills/` | All your projects (personal preference) |
| `.claude/skills/`   | This repo only — **commit for team**    |

Do not write to `~/.claude/skills-claude/` — reserved for claude built-ins.

### What belongs in skills

- “Implement a Nest feature module” step-by-step with links to canonical docs
- “Create API flow diagram” template and folder layout
- “Review PR against architecture rule §1–11”
- “Bulk patch ADO from timesheet” with confirmation gates
- Framework-specific checklists (DTO + Swagger + validators)

### What does not belong in skills

- One-line rules (use `.mdc` instead)
- Information that never changes (put in `docs/`; skill links to it)
- Huge paste of entire coding standard — skill should **point** to source of truth

### Examples by stack

| Project type     | Example skills                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| **NestJS**       | nest-module scaffold; migration file authoring; repository/query-builder patterns; architecture audit |
| **React**        | Component + Storybook workflow; design-system token usage                                             |
| **DevOps**       | Terraform module layout; CI fix loop for failing check                                                |
| **Data**         | dbt model conventions; migration + backfill playbook                                                  |
| **PM / process** | Ticket naming; sprint deliverable format; timesheet → board sync                                      |

This repo index: [skills/README.md](./skills/README.md).

---

## Hooks (optional)

`hooks.json` runs shell commands at lifecycle points:

- **sessionStart** — inject policy reminder into context
- **preToolUse** — block or warn before Write/StrReplace (e.g. unsolicited `docs/` or test files)

Hooks complement rules; they cannot replace clear `.mdc` text. Restart claude after editing hooks.

---

## How rules and skills work together

```
User request
    │
    ▼
Always-on rules (scope, safety, style)
    +
Glob rules (open files match **/*.entity.ts)
    │
    ▼
Agent picks skill from description ("implement nest module", "create migration")
    │
    ▼
Skill says: read X doc, follow Y checklist, run Z audit before done
    │
    ▼
Rules still apply (e.g. no migration:run)
```

**Split guidance:**

1. If agent must **never** violate it → **rule**
2. If agent needs **steps** for a task type → **skill**
3. If humans need deep reference → **`docs/`**, linked from skill/rule

---

## Adding or changing config

### New rule

1. Create `.claude/rules/my-rule.mdc` with frontmatter
2. Keep under ~80 lines; one concern per file
3. Prefer `alwaysApply: false` + globs when scope is narrow

### New skill

1. Create `.claude/skills/my-skill/SKILL.md`
2. Write `description` with triggers: paths, verbs, tool names
3. Link canonical docs; do not fork them
4. Add row to `skills/README.md`

### Review cadence

Update `.claude/` when:

- Architecture doc changes (folder layout, import aliases)
- Repeated agent mistakes in PR review (new rule or skill step)
- New forbidden or required CLI behavior
- New recurring workflow (diagrams, ADO, releases)

Treat `.claude/` like lint config: **small, enforced, reviewed in PR**.

---

## Checklist for new projects

- [ ] `rules/` — safety + stack standards (3–8 files, not 30)
- [ ] `skills/` — 1 scaffold skill + 1 review/audit skill minimum
- [ ] `skills/README.md` — index for team
- [ ] Link from root `README.md` or contributor guide to `.claude/README.md`
- [ ] No secrets; no duplicate of full architecture bible
- [ ] Optional hooks only if rules alone fail (e.g. block `docs/` spam)

---

## Further reading

- claude docs: Rules, Skills, Hooks (IDE settings)
- This repo skills index: [skills/README.md](./skills/README.md)
- Canonical human docs: `libs/@evince/documents/`, `docs/`
