# Field 2: Audit Trail for AI Actions

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Audit Trail for AI Actions.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Audit Trail for AI Actions.md)

---

**Field definition:** Immutable logging of LLM system prompts, reasoning paths, and actions taken by automated agents.  
**Prerequisites / Licensing:** GCE log export (account team); Protect+ for security findings; Super Admin / SCM roles.  
**Audit completeness rating (Doc-Verified):** **Moderate** - rich **metadata** events; **not** full prompt/response content in standard logs; **not** one immutable unified trail.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (GCE export provisioned?)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Admin audit logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) · [GCE data dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) · [Security principles](https://docs.glean.com/security/security-principles) · [Debug agent](https://docs.glean.com/agents/create-agents/debug-agent) · Cross-ref [4.9.5 Field 3](../4.9.5%20Compliance%20&%20Regulatory/Overview.md)

### Audit architecture (tenant-relevant)

| Log type | Captures | Does NOT capture | Retention |
|---|---|---|---|
| **Admin audit logs** | Connector/config changes, agent subscriptions, action executions | End-user search/chat content | **30 days** default |
| **GCE `CHAT`** | Chat session metadata | Full message text (privacy design) | Per export pipeline |
| **GCE `CHAT_CITATIONS`** | Citation metadata per chat | Reasoning text | Per export |
| **GCE `LLM_CALL`** | Model, provider, token counts | System prompt body | Per export |
| **GCE `WORKFLOW_RUN`** | Agent execution events | Full step payloads in all tenants | Per export |
| **GCE `MCP_USAGE`** | MCP tool invocations | - | Per export |
| **Protect+ Findings** | Blocked injection/toxic events; sensitive content | - | Dashboard + API |
| **Agent Debug (Preview)** | Step I/O, spans, model metadata | Production user runs | Session only |

### Engineering observation (Doc-Verified)

- Platform docs: **no logging of individual user query/response content** at infrastructure level - privacy vs audit tradeoff.
- Disabling chat history does **not** stop GCE `CHAT` metadata events.
- Debug mode **not supported on Azure-hosted** deployments - confirm tenant host.
- **Immutable** chain-of-custody for every Assistant turn: **not documented** - SIEM export is best-effort assembly.

### Verification steps / test case

1. Change Outlook connector setting - verify Admin audit CSV entry within 30-day window.
2. Run Assistant query - if GCE export live, query `CHAT` + `CHAT_CITATIONS` for session ID.
3. Run published agent - check `WORKFLOW_RUN` event (if export provisioned).
4. Trigger Protect+ jailbreak test - verify Finding row with triggering text context.
5. Confirm whether full system prompts retrievable - expect **metadata only**.

**Risk & Cost Impact:** Risk: **High** for regulated clients needing verbatim AI action logs | Cost: SIEM/GCE export setup

---
