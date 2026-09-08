# Field 3: Department / Function

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
**Companion test guide:** [Department - Function.md](../../../test/Glean/4.9.10 Use Case Library/Department - Function.md)

---

**Field definition:** The internal business group or division utilizing the tool.  
**Prerequisites / Licensing:** People-data dept mapping for Insights (optional).  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [People solutions](https://www.glean.com/solutions/departments/people) · [ITSM solutions](https://www.glean.com/solutions/departments/it-service-management) · [Customer service](https://www.glean.com/solutions/departments/customer-service)

| ID | Primary department | Secondary users |
|---|---|---|
| UC-01 | All employees | IT (connector health), Knowledge Mgmt |
| UC-02 | Operations, Compliance, HR | Legal, Clinical ops (non-EHR docs) |
| UC-03 | HR / People, L&D | Hiring managers, dept champions |
| UC-04 | All Teams-heavy teams | Sales, Support, Engineering |
| UC-05 | Operations, Finance, Program Mgmt | Executives (briefings) |
| UC-06 | IT Service Desk, HR Shared Services | All employees (self-serve) |
| UC-07 | Sales, Customer Success, Leadership | Anyone with heavy email load |
| UC-08 | Quality, Compliance, Credentialing, Revenue Cycle ops | Clinical admin (policy only — not clinical chart) |

### Perimeter Healthcare relevance

- **High:** UC-02, UC-03, UC-08 (internal policy/SOP/credentialing on Drive+Notion)
- **Medium:** UC-01, UC-04, UC-06, UC-07
- **EHR boundary:** No UC assumes Epic/Cerner access — internal knowledge only

### Verification steps / test case

1. Assign pilot champion per UC department.
2. Insights → Departments: segment Activity by dept after 4-week pilot.
3. Confirm clinical staff training excludes EHR displacement messaging.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
