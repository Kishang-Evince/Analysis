# Field 2: Business Process Affected

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
**Companion test guide:** [Business Process Affected.md](../../../test/Glean/4.9.10 Use Case Library/Business Process Affected.md)

---

**Field definition:** The exact organizational workflow impacted by automation.  
**Prerequisites / Licensing:** Connectors live for affected sources.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Healthcare onboarding](https://www.glean.com/solutions/industries/healthcare) · [Deep Research examples](https://docs.glean.com/user-guide/assistant/deep-research) · [MCP support triage](https://docs.glean.com/user-guide/mcp/support)

| ID | Baseline process (manual) | Glean-automated step |
|---|---|---|
| UC-01 | User opens Drive, Outlook, Notion, Teams separately to hunt file/thread | Single query across all sources; ACL-filtered results |
| UC-02 | Read PDF/wiki pages or ask colleague for policy interpretation | Natural-language question with cited excerpts + deep links |
| UC-03 | New hire reads scattered onboarding docs; asks manager repeat questions | Self-serve search + curated Collection/Answer for role |
| UC-04 | Context-switch from Teams chat to browser search | In-channel Glean sidebar query without leaving Teams |
| UC-05 | Analyst opens Sheet/Doc, manually summarizes for stakeholder email | NL agent reads source, outputs summary with citations |
| UC-06 | Employee files IT ticket or HR email for FAQ ("VPN", "PTO policy") | Go Link or pinned Answer resolves before ticket |
| UC-07 | Rep reads long email thread + hunts attachments before call | Assistant summarizes thread + surfaces related Drive/Notion docs |
| UC-08 | Ops staff searches shared drives/Notion for credentialing packet before audit | Targeted search + Collection of compliance docs; cited policy version |

### Verification steps / test case

1. For each UC, document 3–5 manual steps in current-state process map.
2. Run sandbox flow — confirm Glean replaces ≥1 full manual step.
3. Flag processes that still need human approval (no auto-write to SoR).

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
