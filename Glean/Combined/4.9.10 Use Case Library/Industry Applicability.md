# Field 4: Industry Applicability

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
**Companion test guide:** [Industry Applicability.md](../../../test/Glean/4.9.10 Use Case Library/Industry Applicability.md)

---

**Field definition:** Industry sectors where this specific use case is highly relevant.  
**Prerequisites / Licensing:** HIPAA/BAA for PHI-adjacent content; Protect+ for injection (4.9.5).  
**Confidence Level:** **Doc-Verified** · healthcare claims **Vendor-Stated** where EHR-specific  
**Validation Date:** September 3, 2026  
**Source URLs:** [Healthcare](https://www.glean.com/solutions/industries/healthcare) · [Life sciences](https://www.glean.com/solutions/industries/life-sciences) · [AI automation by industry](https://www.glean.com/perspectives/ai-automation-use-cases)

| ID | Strong fit industries | Healthcare notes |
|---|---|---|
| UC-01 | All knowledge-worker enterprises | Hybrid payer/provider with M365+GWS |
| UC-02 | Healthcare, Financial services, Legal | **BAA required**; no PHI in Notion indexed path without segmentation |
| UC-03 | Healthcare, Professional services, Tech | High turnover clinical/admin staff |
| UC-04 | All Teams-default enterprises | Common in healthcare IT rollouts |
| UC-05 | All | Avoid summarizing PHI without DLP review |
| UC-06 | All | IT/HR deflection universal |
| UC-07 | Sales-led B2B, Professional services | Payer/provider account mgmt |
| UC-08 | **Healthcare (high)**, Life sciences, Financial services | Maps to Glean healthcare "credentialing & compliance" claim - **internal docs only** |

### Compliance boundary (Doc-Verified)

- Glean markets claims/appeals and member inquiry use cases - **require connectors not in tenant stack** (claims systems, Zendesk).
- Tenant-evaluable healthcare value = **administrative knowledge** (SOPs, policies, training, credentialing packets on Drive/Notion).

### Verification steps / test case

1. Legal review: which doc classes may enter index (PHI vs internal ops).
2. Segment Notion/Drive folders before indexing (4.9.5 Field 6).
3. Tag each UC **HIPAA-ready** / **internal-only** / **out-of-scope** for client deck.

**Risk & Cost Impact:** Risk: **High** if UC-02/08 used on ungoverned Notion | Cost: Protect+ add-on

---
