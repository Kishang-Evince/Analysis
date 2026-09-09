# Field 5: Problem Solved

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
**Companion test guide:** [Problem Solved.md](../../../test/Glean/4.9.10 Use Case Library/Problem Solved.md)

---

**Field definition:** The operational inefficiency or manual bottleneck resolved by deployment.  
**Prerequisites / Licensing:** Baseline time study optional for ROI.  
**Confidence Level:** **Doc-Verified** (problem) · **Vendor-Stated** (quantified savings)  
**Validation Date:** September 3, 2026  
**Source URLs:** [IDC knowledge discovery](https://www.glean.com/resources/guides/idc-marketscape-knowledge-discovery) · [Healthcare whitepaper CTA](https://www.glean.com/solutions/industries/healthcare) · Cross-ref [4.9.9 Field 5](../4.9.9%20Competitive%20Positioning/Overview.md)

| ID | Problem (pain) | Root cause addressed |
|---|---|---|
| UC-01 | **"Where is that doc?"** - 10+ min/day across apps | App sprawl; no unified ACL-aware index |
| UC-02 | Policy ambiguity; outdated wiki; compliance risk | Unstructured policies; no cited single answer |
| UC-03 | Slow time-to-productivity; manager interrupt load | Onboarding docs scattered; no curated path |
| UC-04 | Low adoption when search lives outside Teams | Context-switch friction |
| UC-05 | Manual read-summarize-email cycle for leadership | Repetitive doc digestion |
| UC-06 | Ticket/email volume for repeat FAQs | No self-serve shortlinks or verified Answers |
| UC-07 | Pre-meeting scramble across mail + attachments | Thread context not linked to file corpus |
| UC-08 | Audit scramble; missed policy updates | Credentialing docs buried; no version visibility |

### Vendor-stated benchmarks (not tenant-verified)

- Employees search **10+ systems daily** (Glean compare pages).
- Knowledge workers **~20% of week** searching (IDC/Glean collateral - Vendor-Stated).

### Verification steps / test case

1. Baseline: time 5 users finding `Stratos_Connector_Test_Doc` without Glean vs with Glean.
2. Survey: "How often do you ask a colleague instead of searching?" pre/post pilot.
3. Document problem statement per UC in client SOW alignment.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
