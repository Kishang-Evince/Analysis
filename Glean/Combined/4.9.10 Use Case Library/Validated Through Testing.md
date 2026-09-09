# Field 10: Validated Through Testing

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
**Companion test guide:** [Validated Through Testing.md](../../../test/Glean/4.9.10 Use Case Library/Validated Through Testing.md)

---

**Field definition:** Flag indicating if use case was physically built and verified in sandbox without unhandled errors.  
**Prerequisites / Licensing:** Complete 4.9.1 Admin Test Guide artifacts.  
**Overall validation status:** **2 Partial · 6 Pending**  
**Confidence Level:** **Tested** (partial) · **Pending Sandbox** (remainder)  
**Validation Date:** September 3, 2026  
**Source URLs:** [4.9.1 Admin Test Guide](../test/Glean/4.9.1%20-%20Admin%20Test%20Guide.md) · Cross-ref [4.9.1](../4.9.1%20Functional%20Capabilities/Overview.md), [4.9.2](../4.9.2%20Agent%20&%20Workflow%20Builder/Overview.md)

| ID | Validated? | Evidence | Gaps / blockers |
|---|---|---|---|
| UC-01 | **PARTIAL YES** | Unified search across Drive/OneDrive/Notion/Gmail/Teams (4.9.1 F1.2) | OneDrive crawl lag; Notion 6h lag |
| UC-02 | **PARTIAL YES** | Cited Assistant answer on `Stratos_Connector_Test_Doc` (4.9.1 F1.3) | Healthcare policy corpus not loaded; Protect+ not tested |
| UC-03 | **NO** | - | Collections/Answers onboarding path not built |
| UC-04 | **PARTIAL YES** | Teams sidebar search tested (4.9.1 F1.1) | Full dept pilot metrics Pending |
| UC-05 | **PARTIAL YES** | Auto agent summarize Sheet/Doc (4.9.1 F1.4) | OAuth `tools_unauthorized` edge cases remain |
| UC-06 | **NO** | - | Go Links `go/stratos-sow` referenced; full deflection flow not measured |
| UC-07 | **NO** | - | Gmail/Outlook thread summary not timed in sandbox |
| UC-08 | **NO** | - | Compliance Collection not built; Notion governance test Pending |

### Sandbox test mapping

| UC | Primary test ID (4.9.10 Guide) | 4.9.1 cross-ref |
|---|---|---|
| UC-01 | UC10-T01 Cross-app search | F1.2 |
| UC-02 | UC10-T02 Cited policy Q&A | F1.3 |
| UC-03 | UC10-T03 Onboarding Collection | populate-content |
| UC-04 | UC10-T04 Teams sidebar | F1.1 |
| UC-05 | UC10-T05 Auto agent summarize | F1.4 |
| UC-06 | UC10-T06 Go Link + Answer | Go Links section |
| UC-07 | UC10-T07 Email thread prep | Gmail/Outlook prompts |
| UC-08 | UC10-T08 Compliance doc retrieval | Notion ACL test |

### Verification steps / test case

1. Run UC10-T01 through UC10-T08 in Admin Test Guide - update YES/NO per UC.
2. Require **YES** on Fields 1–9 deps before marking Field 10 YES.
3. Partial = core happy path works; known gaps documented in eval log.
4. Re-validate after sandbox wave-2 (crawl lag, OAuth, Notion segmentation).

**Risk & Cost Impact:** Risk: **High** if client sold on NO-validated UCs | Cost: Failed pilot credibility
