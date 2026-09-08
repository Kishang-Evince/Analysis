# Field 3: Workflow Complexity Ceiling

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Workflow Complexity Ceiling.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Workflow Complexity Ceiling.md)

---

**Field definition:** Maximum logical structures supported (nested loops, multi-branch trees, parallel agent runs).  
**Prerequisites / Licensing:** Workflow mode agent; Drive/OneDrive content for loop stress test.  
**Documented ceiling (Doc-Verified):** Branches, loops, sub-agents, merge-branches, memory scoping — **no published max step count**; hard budgets on tool calls, payload size, runtime.  
**Confidence Level:** **Doc-Verified** (constructs) · **Pending Sandbox** (numeric tool-call cap, crash point)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Flow concepts](https://docs.glean.com/agents/concepts/flow) · [Limits and best practices](https://docs.glean.com/agents/concepts/limits-and-best-practices) · [Execution limits](https://docs.glean.com/agents/concepts/execution-limits) · [Troubleshooting](https://docs.glean.com/agents/troubleshooting)

### Documented limits table

| Limit type | Documented value | Impact on tenant stack |
|---|---|---|
| Tool-call budget per run | Exists; count **not published** | Loops over many OneDrive/Drive files may exhaust budget |
| Response payload size | Per-tool cap; truncation possible | Large Sheet/Doc retrieval may truncate |
| Company Search per step | Max **500** results | Broad Drive/Notion sweeps need batching |
| Scheduled run duration | ~**30 min** then terminated | Long multi-source workflows need decomposition |
| Active background agents | **10**/user | Parallel scheduled agents capped |
| Published versions retained | **30** | Version history depth |

### Supported constructs (Doc-Verified)

- NL-conditioned **branches**, **loops**, **sub-agent** steps, **merge-branches**, per-step memory scoping, multi-tool chains.
- Docs recommend **batching** (date range, status field) when enumerating large Drive/OneDrive sets — use native connector tools vs company search for exhaustive lists.

### Verification steps / test case

1. Build Workflow agent: loop over 20+ OneDrive files + branch on file type + sub-agent summarize.
2. Note step where run fails (tool-call budget, timeout, truncation message).
3. Retry with batched queries per docs guidance; compare completion.
4. Record observed ceiling as Pending Sandbox metric.

**Risk & Cost Impact:** Risk: Medium (silent truncation) | Cost: Token Metered under heavy loops

---
