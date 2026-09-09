# Field 2: Agent Autonomy Level

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Agent Autonomy Level.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Agent Autonomy Level.md)

---

**Field definition:** Limit of independent decision-making, automated guardrails, and human checkpoints.  
**Prerequisites / Licensing:** Auto + Workflow agents; write tools for Drive/Outlook/Gmail if testing confirmations.  
**Overall autonomy rating (Doc-Verified):** **Tiered** - Auto = high dynamic planning; Workflow = low deterministic; writes gated by default HITL.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (admin opt-out policy)  
**Validation Date:** September 3, 2026  
**Source URLs:** [How agents work](https://docs.glean.com/agents/how-agents-work) · [Auto mode](https://docs.glean.com/agents/auto-mode-agent) · [HITL for tools](https://docs.glean.com/tools/human-in-the-loop-experience-for-tools)

### Autonomy spectrum

| Mode | Planning | Tool selection | Write actions | Guardrails |
|---|---|---|---|---|
| **Auto** | Agentic engine plans steps at runtime | Dynamic via Task tool + configured tools | Pause for user confirm (web default) | Sandboxed code execution for analysis only; sub-agent delegation |
| **Workflow** | Fixed step sequence | Explicit per step | Per-step "run without confirmation" override | NL-conditioned branches; sub-agent steps |
| **Scheduled / background** | Same as configured mode | Same | **No interactive HITL** - blocked writes email subscriber or Agent Inbox | Admin + builder opt-in for no-confirm writes |

### Engineering observation (Doc-Verified)

- Auto mode can delegate at runtime via **Task** tool to library sub-agents or third-party A2A agents - higher autonomy than Workflow static sub-agent steps.
- **Write tools pause by default** in Glean web app (Allow/Cancel); reduces runaway automation risk.
- Scheduled runs terminate at ~**30 min**; **10 active background agents/user** cap limits blast radius.
- Teams/Slack surfaces: HITL confirmations **not** applied - web-only interactive approval.

### Verification steps / test case

1. Auto agent: "Summarize Gmail thread and draft Outlook reply" - observe dynamic tool picks in Debug trace.
2. Workflow equivalent - confirm fixed step order regardless of input variation.
3. Attempt write (create Google Doc or Outlook send) - confirm pause in web UI.
4. Check Admin policy for "Run without user confirmation" - note if enabled.

**Risk & Cost Impact:** Risk: Medium (unbounded Auto loops) | Cost: Token Metered

---
