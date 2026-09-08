# Field 10: Explainability & Decision Logs

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Explainability & Decision Logs.md](../../../test/Glean/4.9.3 AI Architecture & Models/Explainability & Decision Logs.md)

---

**Field definition:** Human-readability of decision logs, system routing, and reasoning steps.  
**Prerequisites / Licensing:** Agent Debug access; GCE log export; Protect+ for security findings.  
**Explainability rating (Doc-Verified):** **Good for agents** (Debug traces, GCE events) · **Limited for Assistant** (no full chain-of-thought per chat).  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (GCE log access in tenant)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Debug agent](https://docs.glean.com/agents/create-agents/debug-agent) · [GCE data dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) · [Security principles](https://docs.glean.com/security/security-principles) · [About deployment audit table](https://docs.glean.com/get-started/prepare/about-deployment)

### Observability inventory

| Signal | Contents | Assistant | Agents |
|---|---|---|---|
| Agent Debug mode | Steps, spans, I/O, model metadata, context window | N/A | Yes (not Azure-hosted) |
| GCE `LLM_CALL` | Tokens, model, provider | Yes | Yes |
| GCE `CHAT_CITATIONS` | Citation metadata | Yes | N/A |
| GCE `WORKFLOW_RUN` | Agent execution | N/A | Yes |
| Admin audit logs | Config changes | Yes | Yes |
| Protect+ Findings | Blocked/flagged AI security events | Yes | Yes |

### Engineering observation (Doc-Verified)

- Platform docs note **no logging of individual user query/response content** at infrastructure level — metadata events only (privacy vs explainability tradeoff).
- Debug mode **not supported on Azure-hosted Glean** — confirm tenant host type.
- Not a full "model decision log" with reasoning text for every Assistant query.

### Verification steps / test case

1. Run agent with Debug — export step trace for Drive→Notion workflow.
2. Query GCE for `LLM_CALL` + `CHAT_CITATIONS` after known Assistant question.
3. Change Model Hub setting — confirm admin audit entry.
4. Trigger Protect+ policy — verify Findings row.

**Risk & Cost Impact:** Risk: Low | Cost: SIEM export if required

---
