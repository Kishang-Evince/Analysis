# Project Agent Skills (Evince / nest-setup)

Skills teach Cursor agents this repo’s architecture and coding rules. Canonical documentation remains in `libs/@evince/documents/`.

## Skills

| Skill                           | When to use                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| **evince-nest-module**          | **Read first** when implementing or extending a feature module                                    |
| **evince-nest-validate-module** | **Run before done** — audit module against architecture-validation-rule §1–11                     |
| **evince-nest-development**     | Any feature work under `libs/@evince` or `src/modules` — layers, imports, permissions, env        |
| **evince-dto-and-api**          | DTOs, validators, controllers, services, `AppResponse`, search APIs, Swagger                      |
| **evince-api-flow-diagrams**    | API flow docs in `docs/api-flowdiagram/`, user stories, ASCII journeys, Mermaid verification      |
| **evince-repositories-tenancy** | Repositories, `Repository<T>`, facade pattern, query-builder aliases                              |
| **evince-architecture-review**  | PR / code review against standards                                                                |
| **evince-database-migrations**  | TypeORM migrations and schema changes                                                             |
| **ado-bulk-patch-completed**    | Sync Done timesheet rows → ADO Task **Ready For QA** (confirm first; refresh status doc if stale) |
| **qualia-project-requirements** | Qualia scope, sprint gates, ADO Epic/Feature/Task naming                                          |

## Always-on Cursor rules

- `.cursor/rules/evince-module-standards.mdc` — file placement, interfaces, completion gate
- `.cursor/rules/no-over-engineering.mdc` — minimal scope (interfaces/DTOs exempt where required)

## Source documentation

- `libs/@evince/documents/folder-architecture.md`
- `libs/@evince/documents/coding-standards-rule/portal-module-standards.md`
- `libs/@evince/documents/coding-standards-rule/coding-standards.md`
- `libs/@evince/documents/coding-standards-rule/architecture-validation-rule.md`
- `libs/@evince/documents/coding-standards-rule/repository-standards.md`
- `libs/@evince/documents/developer-guideline/example-user-module.md`
- `libs/@evince/documents/developer-guideline/master-module-prompt.md`
- `libs/@evince/documents/migrations.md`
- `docs/api-flowdiagram/` — portal API flow diagrams (admin / customer)

## Installing for the team

These skills ship with the repo under `.cursor/skills/`. Cursor discovers project skills automatically for this workspace. Update skills when guidelines in `libs/@evince/documents` change.

## Agent hooks (anti over-engineering)

Project hooks in [`.cursor/hooks.json`](../hooks.json) inject minimal-scope policy at session start and block common over-engineering writes (unsolicited docs/tests, extra abstraction files). Policy text: [`.cursor/hooks/anti-overengineering-policy.txt`](../hooks/anti-overengineering-policy.txt). Restart Cursor after changing hooks; verify in **Settings → Hooks**.
