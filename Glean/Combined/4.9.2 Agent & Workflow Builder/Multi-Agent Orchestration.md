# Field 6: Multi-Agent Orchestration

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Multi-Agent Orchestration.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Multi-Agent Orchestration.md)

---

**Field definition:** Cooperation and conflict-resolution patterns when running multiple automated agents.  
**Prerequisites / Licensing:** Two+ published agents; sub-agent library access.  
**Orchestration model (Doc-Verified):** Static sub-agents (Workflow) + dynamic Task delegation (Auto) + optional A2A third-party agents.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (race conditions, parallel runs)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Flow concepts](https://docs.glean.com/agents/concepts/flow) · [How agents work](https://docs.glean.com/agents/how-agents-work) · [Auto mode subagents](https://docs.glean.com/agents/auto-mode-agent)

### Orchestration patterns

| Pattern | Mode | Behavior |
|---|---|---|
| Sub-agent step | Workflow | Child agent output feeds parent memory; explicit in canvas |
| Pre-linked subagents | Auto | Configured child agents invoked by parent |
| Task tool delegation | Auto | Runtime dynamic routing to independent sub-agents |
| Skills | Auto | Reusable instruction modules across agents |
| A2A third-party agents | Auto | External registered agents as delegation targets |

### Engineering observation (Doc-Verified)

- Orchestration respects **invoking-user permissions** — child agents cannot escalate ACL beyond parent user.
- **10 active background agents/user** and rate limits (0.5 rps agent runs) constrain true parallel fleet behavior.
- No documented distributed lock for conflicting writes to same Drive/OneDrive file — **Pending Sandbox** for race testing.

### Verification steps / test case

1. Parent Auto agent delegates Gmail triage to child "draft reply" sub-agent; inspect Debug for Task-tool calls.
2. Workflow parent with explicit Sub-agent step — compare trace structure.
3. Run **3 parallel** Auto agents (Drive + Notion) — note queueing, timeouts, answer degradation.
4. Optional: two agents write same Doc — observe conflict behavior.

**Risk & Cost Impact:** Risk: Medium (write races) | Cost: Token Metered

---
