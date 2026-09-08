# Field 10: Trigger Types Supported

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Trigger Types Supported.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Trigger Types Supported.md)

---

**Field definition:** Supported event bindings (schedules, API calls, webhooks, data shifts).  
**Prerequisites / Licensing:** Content-trigger admin gate; per-user activation for content triggers.  
**Trigger coverage (Doc-Verified):** Manual (chat + form), scheduled, content (connector events), API programmatic runs.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (latency, admin gates, Notion gap)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Triggers](https://docs.glean.com/agents/concepts/triggers) · [Content triggers](https://docs.glean.com/agents/concepts/content-trigger) · [Schedule triggers](https://docs.glean.com/agents/concepts/schedule-triggers) · [Agents API runs](https://developers.glean.com/api/client-api/agents/overview)

### Trigger type inventory

| Trigger | Modes | Tenant support |
|---|---|---|
| Chat message (manual) | Auto + Workflow | In-scope |
| Input form (`[[field]]`) | Auto + Workflow | In-scope |
| Scheduled | Both | Admin-gated; max 10 active/user |
| Content — Gmail | Both | **Recommended** — new email filters |
| Content — Outlook | Both | **Recommended** — new email filters |
| Content — Google Drive | Both | **Experimental** — new doc/sheet; hours latency |
| Content — OneDrive | Both | **Experimental** — new/updated docs; hours latency |
| Content — Google Calendar | Both | Recommended (if Calendar connected) |
| Content — Outlook Calendar | Both | Experimental — before event starts |
| Content — Notion | — | **Not documented** |
| Content — Teams | — | **Not a trigger source** (embedded surface only) |
| API `runs/stream` / `runs/wait` | Published agents | External invocation |

### Engineering observation (Doc-Verified)

- Content triggers run in **activating user's permission context** — each user activates their own trigger instance.
- Experimental sources: expect **~hours latency**, always under a day per docs.
- **Notion gap** is significant for tenant stack: no content-trigger path documented; rely on manual/API/schedule for Notion-centric workflows.
- At least one filter recommended per content trigger to avoid quota burn.

### Verification steps / test case

1. Open trigger picker — confirm Gmail, Outlook, Drive, OneDrive present; Notion/Teams absent.
2. Activate Gmail new-email trigger with subject filter; send test mail; measure fire latency.
3. OneDrive new-doc trigger (experimental) — measure hours-level lag.
4. Invoke published agent via Agents API `runs/wait` with test payload.
5. Schedule daily agent — confirm 10-active cap behavior if applicable.

**Risk & Cost Impact:** Risk: Medium (Notion/Teams trigger gap; experimental latency) | Cost: Native / Metered on high trigger volume
