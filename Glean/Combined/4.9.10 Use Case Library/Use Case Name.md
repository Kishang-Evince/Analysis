# Field 1: Use Case Name

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
**Companion test guide:** [Use Case Name.md](../../../test/Glean/4.9.10 Use Case Library/Use Case Name.md)

---

**Field definition:** The designated name of the validated business workflow.  
**Prerequisites / Licensing:** Enterprise Search + Assistant base; Agents/Flex for UC-05+; Answers/Go Links admin for UC-06.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Knowledge management](https://www.glean.com/solutions/knowledge-management) · [Healthcare solutions](https://www.glean.com/solutions/industries/healthcare) · [All teams](https://www.glean.com/solutions/all-teams) · Cross-ref [4.9.1](../4.9.1%20Functional%20Capabilities/Overview.md)

| ID | Use Case Name | Glean product surface |
|---|---|---|
| UC-01 | Cross-App Unified Enterprise Search | Search, filters, Enterprise Graph |
| UC-02 | Cited Policy & SOP Q&A (Assistant) | Glean Assistant / Chat |
| UC-03 | New Hire Onboarding & SOP Discovery | Search + Collections + Answers |
| UC-04 | Teams-Embedded Knowledge Lookup | Teams app / sidebar |
| UC-05 | Auto Agent Document Summarization | Agent Builder (Auto) |
| UC-06 | Go Links + Answers Deflection (IT/HR) | Go Links, Answers, extension |
| UC-07 | Email & Meeting Context Prep | Assistant + indexed Gmail/Outlook |
| UC-08 | Credentialing & Compliance Doc Retrieval | Search + Assistant + Collections |

### Verification steps / test case

1. Confirm each use case name maps to a Glean-documented workflow (solutions or user-guide).
2. Tag tenant-stack vs out-of-scope use cases before client delivery.
3. Add client-specific UC-09+ only after discovery (e.g., Perimeter intranet name).

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
