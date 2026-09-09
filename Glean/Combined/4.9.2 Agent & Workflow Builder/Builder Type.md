# Field 1: Builder Type

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Builder Type.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Builder Type.md)

---

**Field definition:** Primary design model of the editor (Visual Drag-and-Drop, Code-First, Natural Language Directives, Hybrid).  
**Prerequisites / Licensing:** Agent Builder access; Auto + Workflow modes enabled in tenant.  
**Overall builder classification (Doc-Verified):** **Hybrid** - NL-first with optional visual Workflow canvas; code/headless path for Auto agents only.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (tenant mode availability)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Agent Builder concepts](https://docs.glean.com/agents/concepts/agent-builder) · [Create your first agent](https://docs.glean.com/agents/create-agents/create-your-first-agent) · [Auto mode](https://docs.glean.com/agents/auto-mode-agent) · [Headless builder](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder)

### Builder path matrix

| Path | Mode | UI model | Coding required for baseline? | Tenant notes |
|---|---|---|---|---|
| Natural language | Auto + Workflow | Builder Assistant / Build with NL modal | No | Default Auto path; scopes Drive/Notion/M365 tools |
| Visual canvas | Workflow only | Drag-and-drop steps, branches, loops | No | Deterministic step graph; sub-agent steps |
| Headless / Git ADLC | Auto only | `spec.yaml` + `instructions.md` under `.glean/agents/` | Yes (YAML + markdown) | Workflow agents **cannot** be built headlessly |
| Agents API import | Auto (Beta) | Programmatic create/edit/import | Yes (API/JSON) | Beta per developers docs |

### Engineering observation (Doc-Verified)

- Baseline business-user path is **NL-first**: describe agent in plain language; Builder Assistant proposes tools, resources, triggers, settings.
- **Workflow mode** adds visual step editor for operators who need explicit control (branches, loops, merge, memory scoping per step).
- **Code is optional**, not required for standard tenant-stack agents (Drive summary + Notion compare + Outlook draft).
- Headless + Agents API target platform/engineering teams; not needed for Stratos baseline deploy.

### Verification steps / test case

1. Create same agent three ways: Auto NL, Workflow visual, headless `spec.yaml` (Auto only).
2. Confirm Workflow path exposes canvas; Auto path does not require canvas for publish.
3. Confirm headless import fails or is unavailable for Workflow agent type.
4. Record which modes appear in tenant Agent Builder create modal.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
