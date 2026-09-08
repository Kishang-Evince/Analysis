# Field 8: Versioning & Rollback

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Versioning & Rollback.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Versioning & Rollback.md)

---

**Field definition:** Administrative management of system revisions, workspaces, and immediate rollbacks.  
**Prerequisites / Licensing:** Agent publish permission; optional moderator approval workflow.  
**Rollback capability (Doc-Verified):** Draft/publish model; **30** published versions; restore any prior version as new draft.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (end-user visibility after rollback)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Draft and version](https://docs.glean.com/agents/concepts/agents-draft-version) · [Manage drafts versions rollbacks](https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks)

### Version lifecycle

| State | User impact | Notes |
|---|---|---|
| Draft | None (autosave) | Live published version unchanged |
| Ready to publish | None until approved | Moderator gate when sharing scope requires |
| Published | Live for end users | Up to 30 retained in history |
| Restore | Creates new draft from old published version | **Restore to Published State** discards current draft |

### Not versioned (Doc-Verified)

- Permissions, sharing settings, publishing options — changes apply immediately outside version history.

### Verification steps / test case

1. Publish v1; edit draft to v2; publish.
2. Version history → Restore v1 as draft → re-publish.
3. Confirm end-user run matches restored behavior.
4. Change sharing scope — confirm not in version diff.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
