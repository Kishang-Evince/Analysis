# Field 7: Testing & Debugging Tools

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Testing & Debugging Tools.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Testing & Debugging Tools.md)

---

**Field definition:** Quality of native sandboxes, loggers, step-tracers, and rollback environments.  
**Prerequisites / Licensing:** Agent Builder edit access; sample Drive/Notion content for preview.  
**Overall debug tooling rating (Doc-Verified):** **Strong** - Preview, Debug mode, re-run-from-step, golden sets, content-trigger sample events.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (Azure-hosted limitation check)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Debug agent](https://docs.glean.com/agents/create-agents/debug-agent) · [Re-run from step](https://docs.glean.com/agents/create-agents/re-run-from-step) · [Evaluate agent quality](https://docs.glean.com/agents/agent-development-lifecycle/evaluate-agent-quality) · [Content trigger testing](https://docs.glean.com/agents/concepts/content-trigger)

### Tooling inventory

| Tool | Capability | Limitation (Doc-Verified) |
|---|---|---|
| Preview + Reset / Try Again | Dry-run before publish | Session-bound |
| Debug mode | Step traces, spans, I/O payloads, error filter, context window (Auto) | **Not on Azure-hosted deployments**; weak on "Let agent decide" steps |
| Re-run from step | Resume Preview from mid-flow (~2 hr session; caches prior steps) | Preview only |
| Golden test sets | ADLC quality evaluation | Setup effort |
| Content trigger play button | Sample event before deploy | Per-user activation |
| Git ADLC PR preview | Draft preview links per changed agent | Needs Git integration |

### Verification steps / test case

1. Break Workflow agent at step 3; use Debug **Only show errors**; **Play from this step**.
2. Auto agent: inspect context-window usage meter in Debug.
3. Content trigger: use sample-event play for Gmail new-email filter.
4. Confirm Debug availability on `app.glean.com` tenant (non-Azure).

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
