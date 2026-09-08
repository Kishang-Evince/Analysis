# Field 1: Actual Partner Pricing

**Category:** 4.9.7 - Pricing & TCO  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 5 fields drafted (pricing mechanics Doc-Verified) · Dollar amounts Pending Contract / quote  
**Baseline model:** 100-seat enterprise deploy, tenant stack only (Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets).  
**Important:** Glean publishes **pricing mechanics**, not public list prices. All dollar figures below are **Pending Contract** unless marked Vendor-Stated.
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Actual Partner Pricing.md](../../../test/Glean/4.9.7 Pricing & TCO/Actual Partner Pricing.md)

---

**Field definition:** Confirmed enterprise pricing, discount tiers, and volume pricing scales.  
**Prerequisites / Licensing:** Glean sales quote or partner (Carahsoft, AWS/Google/Azure Marketplace) proposal.  
**Public list price (Doc-Verified):** **None published.** Commercial terms are quote-based.  
**Negotiated price (Pending Contract):** _TBD — per-seat $, volume tiers, multi-year discount_  
**Confidence Level:** **Doc-Verified** (no public list) · **Pending Contract** (actual dollars)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing) · [Core Suite pricing](https://docs.glean.com/glean-core-suite-pricing) · [Partners](https://www.glean.com/partners) · [Partner referral economics](https://www.glean.com/partners/referral)

### Documented pricing channels

| Channel | What docs say | Dollar disclosure |
|---|---|---|
| **Direct / Glean sales** | Primary enterprise path | Quote only |
| **Authorized resellers** | Carahsoft and others listed on partners page | Quote only |
| **Cloud marketplaces** | AWS, Google Cloud, Azure — draw against committed spend | Marketplace listing; no public seat price in docs |
| **Referral partners** | 5–10% of first-year ARR to referring partner (Vendor-Stated) | Partner reward, not customer discount |

### Documented discount types (not percentages)

| Discount lever | Applies to | Doc basis |
|---|---|---|
| **BYOK (Customer Key)** | Enterprise Flex Seats + FlexCredits discounted | Compensates customer LLM/compute cost |
| **Self-host / Customer Hosted** | Seats + FlexCredits discounted | Customer bears cloud infra |
| **Multi-year / volume** | Not published | Verify in contract |

### Engineering observation (Doc-Verified)

- No partner discount schedule, breakpoint table, or list price in scrap or official pricing docs.
- Stratos must obtain **written quote** for 100 seats × 3 years before client-facing TCO.
- Marketplace procurement may change payment mechanics but not documented discount %.

### Verification steps / test case

1. Request formal quote: 100 Enterprise Flex seats, 3-year term.
2. If partner path: request Carahsoft or marketplace quote — compare to direct.
3. Document negotiated $/seat/month, prepay discount, renewal uplift cap.
4. Record BYOK/self-host discount % if applicable.

**Risk & Cost Impact:** Risk: Medium (budget uncertainty until quote) | Cost: TBD

---
