# Field 6: Implementation Complexity

**Category:** 4.9.10 - Use Case Library  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** 8 use cases cataloged (Doc-Verified baseline) · Field 10 sandbox validation **Pending** for 6 of 8 · ROI metrics Pending pilot  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Library scope:** Use cases executable on tenant stack; healthcare ops variants where EHR/CRM not required.  
**Synthesis basis:** Fields 4.9.1–4.9.9 + Glean solutions/docs corpus.  
**Out of tenant stack (documented, not evaluated):** Claims/appeals automation (needs billing/claims systems), Zendesk ticket triage (needs ServiceNow/Zendesk), Deep Research strategic reports (web + multi-connector; admin enable required).
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Implementation Complexity.md](../../../test/Glean/4.9.10 Use Case Library/Implementation Complexity.md)

---

**Field definition:** Estimated engineering complexity to configure the workflow (Low, Med, High).  
**Prerequisites / Licensing:** See Field 9 per UC.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (hours logged)  
**Validation Date:** September 3, 2026  
**Source URLs:** Cross-ref [4.9.1 Field 6](../4.9.1%20Functional%20Capabilities/Overview.md), [4.9.2](../4.9.2%20Agent%20&%20Workflow%20Builder/Overview.md)

| ID | Rating | Est. config hours (first deploy) | Complexity drivers |
|---|---|---|---|
| UC-01 | **Low** | 4–8h (connectors already live) | Connector green + people-data |
| UC-02 | **Low** | 2–4h | Prompt templates; optional Protect+ |
| UC-03 | **Low–Med** | 8–16h | Collection curation; 10+ Answers |
| UC-04 | **Low** | 4–8h | Teams app install; MDM/extension |
| UC-05 | **Med** | 8–24h | Agent Builder; per-user OAuth for tools |
| UC-06 | **Low** | 8–12h | Go Links + Answer authoring; extension deploy |
| UC-07 | **Med** | 8–16h | Gmail/Outlook indexed; OAuth; prompt tuning |
| UC-08 | **Med** | 16–32h | Folder segmentation; Collection governance; Notion share model |

### Engineering observation (Doc-Verified)

- UC-05/07/08 complexity spikes on **Notion ACL gap** and **OAuth** — not builder UI itself.
- UC-08 **High** if client demands field-level PHI controls on Notion — may be **not viable** without Live Mode only.

### Verification steps / test case

1. Log actual admin hours per UC in sandbox (target vs actual).
2. Rate Low/Med/High after OAuth + Notion share steps included.
3. Escalate UC-08 to **High** if compliance requires Notion per-user ACL on indexed corpus.

**Risk & Cost Impact:** Risk: Medium (underestimate OAuth/Notion) | Cost: PS hours

---
