# Field 4: Pre-Built Templates

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Pre-Built Templates.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Pre-Built Templates.md)

---

**Field definition:** Availability and quality of ready-to-use virtual agents or workflow models.  
**Prerequisites / Licensing:** Agent Builder; calendar connector for Outlook variant of Plan my day.  
**Template inventory (Pending Sandbox):** In-product count TBD; docs list **8** named templates; public Agent Library has **33** examples.  
**Confidence Level:** **Doc-Verified** (categories + named templates) · **Pending Sandbox** (full tenant catalog)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Agent templates](https://docs.glean.com/agents/templates) · [Agent Library concept](https://docs.glean.com/agents/concepts/agent-library) · [www.glean.com/agent-library](https://www.glean.com/agent-library/)

### Doc-catalogued in-product templates (partial)

| Template | Category | Tenant relevance |
|---|---|---|
| Daily action items | Personal productivity | Uses knowledge graph across connected apps |
| Plan my day (Outlook) | Personal productivity | **Outlook Calendar via Microsoft Teams** — in-scope |
| Plan my day (Google) | Personal productivity | Out of scope if no Google Calendar |
| Persona-based event messaging | Marketing | Needs event/calendar context |
| + 4 more in templates.md | Various | Verify in tenant picker |

### Public Agent Library (Vendor-Stated inspiration)

- **33** example agents on marketing site (meeting recap, ghostwriter, competitive brief, etc.) — reference designs, not necessarily pre-installed in tenant.

### Engineering observation (Doc-Verified)

- Templates organized by category: General, Engineering, HR, IT, Marketing, Sales, Support.
- **Plan my day** explicitly documents Outlook vs Google Calendar variants — good fit for M365-only tenant.
- Customization expected: templates are starting points, not frozen SKUs.

### Verification steps / test case

1. Agent Builder → Create → Templates — screenshot full category list.
2. Clone **Plan my day (Outlook)**; run with Outlook Calendar connected.
3. Count templates; rate customization friction 1–5.
4. Compare one public Agent Library example vs in-product clone effort.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
