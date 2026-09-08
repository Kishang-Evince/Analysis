# Field 3: Implementation Costs

**Category:** 4.9.7 - Pricing & TCO  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 5 fields drafted (pricing mechanics Doc-Verified) · Dollar amounts Pending Contract / quote  
**Baseline model:** 100-seat enterprise deploy, tenant stack only (Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets).  
**Important:** Glean publishes **pricing mechanics**, not public list prices. All dollar figures below are **Pending Contract** unless marked Vendor-Stated.
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Implementation Costs.md](../../../test/Glean/4.9.7 Pricing & TCO/Implementation Costs.md)

---

**Field definition:** Professional services, baseline configuration, and expert deployment fees.  
**Prerequisites / Licensing:** Implementation SOW from Glean or partner.  
**Implementation cost (Pending Contract):** _TBD — PS line items_  
**Confidence Level:** **Doc-Verified** (PS categories) · **Pending Contract** (dollars)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Partners implementation](https://www.glean.com/partners) · [Website terms Exhibit A](https://www.glean.com/website-terms) · [Custom connectors about](https://docs.glean.com/connectors/custom/about) · [Comparing costs scaling AI 2026](https://www.glean.com/perspectives/comparing-costs-scaling-ai-search-solutions-in-2026) · [Get started welcome](https://docs.glean.com/get-started/welcome)

### Implementation cost components

| Component | Doc position | Typical cost signal |
|---|---|---|
| **Native connector setup** | 100+ native connectors; admin-guided setup | Included in platform (Vendor-Stated: hours not days) |
| **SSO + people data + invites** | 5-step admin checklist | Internal IT labor; no Glean PS required for baseline |
| **Partner implementation** | Partners offer playbooks, project teams, custom agents | Partner-scoped PS — **not published** |
| **Custom connectors** | Sample terms: native cloud app setup free once; **custom connectors billed via paid PS SOW** | Material cost if Indexing SDK / non-native path |
| **Customer Hosted bootstrap** | AWS/GCP deployment engineering | Significant PS + customer cloud ops |
| **CSM / Solutions Architect** | Referenced in sample terms as included | Verify in enterprise contract |

### Stratos tenant baseline (from 4.9.1 Field 6)

- Expected **Medium** first deploy: M365 cert + Notion share + crawl waits + per-user OAuth — Admin-manageable, **4–16 hours** internal labor, not necessarily paid Glean PS.
- Professional services likely **low** for Glean Hosted + native connectors only; **higher** if custom connectors or Cloud-Prem.

### Verification steps / test case

1. Request implementation SOW breakdown: fixed vs T&M.
2. Count connectors in scope (6 families) — confirm all native, no custom SDK.
3. Log internal Admin hours from 4.9.1 Field 6 checklist as implementation labor cost.
4. If partner-led: get partner PS quote separate from license.

**Risk & Cost Impact:** Risk: Low (native stack) / High (custom connectors) | Cost: $0–$X PS per SOW

---
