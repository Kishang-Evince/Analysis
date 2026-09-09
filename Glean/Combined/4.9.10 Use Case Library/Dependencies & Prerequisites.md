# Field 9: Dependencies & Prerequisites

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
**Companion test guide:** [Dependencies & Prerequisites.md](../../../test/Glean/4.9.10 Use Case Library/Dependencies & Prerequisites.md)

---

**Field definition:** Required software licenses, external APIs, or security networks prior to activation.  
**Prerequisites / Licensing:** Enterprise tier; FlexCredits for heavy agent use (4.9.7).  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** Cross-ref [4.9.4 Field 7](../4.9.4%20Integration%20&%20Technical/Overview.md), [4.9.5](../4.9.5%20Compliance%20&%20Regulatory/Overview.md), [4.9.7](../4.9.7%20Pricing%20&%20TCO/Overview.md)

| ID | Connectors / licenses | Admin / security | Content prerequisites |
|---|---|---|---|
| UC-01 | All 7 tenant connectors; Enterprise Search | SSO, people-data, SCIM optional | Indexed test corpus (`Stratos_Connector_Test_*`) |
| UC-02 | Drive, Notion, OneDrive; Assistant | Protect+ recommended for regulated | Policy docs in ACL-safe folders |
| UC-03 | + Collections, Answers | Content owners assigned | Onboarding Collection curated |
| UC-04 | Teams connector; extension or Teams app | Teams admin approval | Same index as UC-01 |
| UC-05 | Agents (Auto); Drive, Sheets, Notion tools | Per-user OAuth (Google, MS, Notion) | Source doc URLs known |
| UC-06 | Go Links, Answers, extension | Admin content publisher role | Top 20 FAQ content authored |
| UC-07 | Gmail, Outlook indexed | Mail connector admin consent | Sufficient mail history crawled |
| UC-08 | Drive, OneDrive, Notion; Collections | **BAA**; Notion workspace-admin share model | Credentialing folder taxonomy; **no PHI in shared Notion** |

### Cross-cutting dependencies (all UCs)

| Dependency | Status in tenant eval |
|---|---|
| SSO (Entra/Okta) | Required |
| People-data (dept/title) | Required for Insights |
| Browser extension MDM | Required for adoption (4.9.6) |
| M365 admin consent (OneDrive/Outlook/Teams) | Required |
| Google Workspace admin (Drive/Gmail) | Required |
| Notion workspace admin + integration share | Required; ACL caveat |
| Protect+ | Recommended for UC-02, UC-05, UC-08 |
| FlexCredits / Model Hub tokens | Agent-heavy UCs (4.9.7) |

### Verification steps / test case

1. Pre-flight checklist per UC in Admin Test Guide - all deps green before Field 10 run.
2. Document blockers: OAuth pending, Notion share incomplete, crawl lag.
3. UC-08: legal sign-off on indexed folder list before enable.

**Risk & Cost Impact:** Risk: **High** if BAA/Notion deps skipped | Cost: Protect+ + PS

---
