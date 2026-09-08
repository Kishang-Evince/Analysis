# Field 9: Human-in-the-Loop Design

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Human-in-the-Loop Design.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Human-in-the-Loop Design.md)

---

**Field definition:** Handoff efficiency, pausing, and operator approval checkpoints.  
**Prerequisites / Licensing:** Write-capable tools (Google Docs create, Outlook send); User B for permission tests.  
**HITL default (Doc-Verified):** **Write pause in web app**; batch review; per-step and admin opt-out; Wait-for-user-input step for structured mid-flow data.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (Teams surface behavior)  
**Validation Date:** September 3, 2026  
**Source URLs:** [HITL for tools](https://docs.glean.com/tools/human-in-the-loop-experience-for-tools) · [Build safe agents](https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents) · [Schedule triggers](https://docs.glean.com/agents/concepts/schedule-triggers)

### HITL behavior matrix

| Surface | Write confirmation | Editable preview | Notes |
|---|---|---|---|
| Glean web app | Default pause Allow/Cancel | Supported (not Google/Microsoft doc/email create) | Grouped batch review available |
| Teams / Slack | **Not applied** | N/A | Different trust model |
| Scheduled / background | No interactive pause | N/A | Blocked writes → email or Agent Inbox |
| Wait for user input step | Structured field capture | N/A | Distinct from write confirmation |

### Opt-out controls (Doc-Verified)

- Per-step **Run without user confirmation** (builder).
- Admin policy **Run without user confirmation** (tenant-wide gate).

### Verification steps / test case

1. Agent creates Google Doc + drafts Outlook email — confirm web pause at each write.
2. Run same agent from Teams (if embedded) — document confirmation gap.
3. Add Wait for user input step mid-Workflow — confirm state survives pause.
4. Scheduled agent with write — confirm email/Inbox routing when HITL unavailable.

**Risk & Cost Impact:** Risk: Medium (Teams no HITL) | Cost: Native

---
