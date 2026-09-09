# Field 4: Worst-Fit Client Profile

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Worst-Fit Client Profile.md](../../../test/Glean/4.9.9 Competitive Positioning/Worst-Fit Client Profile.md)

---

**Field definition:** Organizational profiles or compliance structures where the tool is a mismatch.  
**Prerequisites / Licensing:** Same discovery questionnaire as Field 3.  
**Worst-fit profile (Doc-Verified / synthesis):** Notion-confidential-heavy, single-suite, air-gap, budget-rigid, or DB-primary-search orgs.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** Cross-ref [4.9.5 Field 6](../4.9.5%20Compliance%20&%20Regulatory/Overview.md), [4.9.3 Field 3](../4.9.3%20AI%20Architecture%20&%20Models/Overview.md), [4.9.7](../4.9.7%20Pricing%20&%20TCO/Overview.md) · [Glean vs Copilot pricing table](https://www.glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools)

### Mismatch signals (reject or heavy remediation)

| Signal | Why worst fit | Alternative |
|---|---|---|
| **Notion = system of record for confidential HR/clinical/legal** | Indexed path org-wide visible | Segment connectors; Live Mode only; or skip Glean for Notion |
| **M365-only shop, wants in-app Word/Excel drafting** | Copilot native; lower friction (~$30/user add-on vs Glean ~$50–65+ per Glean's own compare) | Microsoft Copilot |
| **Google Workspace-only, minimal M365** | Workspace AI/Gemini embedded | Google Duet/Gemini |
| **Air-gapped / on-prem mandatory** | No appliance; Cloud-Prem still vendor-operated | Self-hosted search or suite AI |
| **Relational DB / structured data primary search** | Glean optimized for unstructured + connector index | Warehouse-native BI, custom SQL |
| **Budget needs fixed per-seat TCO** | FlexCredit/Protect+ opacity (4.9.7) | Suite AI with simpler licensing |
| **Personal Notion accounts, no workspace admin** | Setup docs assume enterprise Notion (4.9.1 Field 2) | Not ready |
| **No IT for connector/oauth/people-data** | Adoption failure likely (4.9.6 Field 4) | Delay or pass |
| **<100 seats, low app sprawl** | ROI weak vs setup cost | Native search per app |

### Verification steps / test case

1. Score prospect - any **High** mismatch signal = flag in advisory.
2. Notion discovery: "Who can see pages shared with Glean integration?" - if answer is "everyone" for sensitive content, worst fit.
3. Count connected apps - if <10 and single suite, recommend native AI.
4. Document walk-away criteria for Stratos sales qualification.

**Risk & Cost Impact:** Risk: **High** if forced into worst-fit (failed deployment, reputational) | Cost: Wasted PS + license

---
