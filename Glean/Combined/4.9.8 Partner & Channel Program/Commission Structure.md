# Field 2: Commission Structure

**Category:** 4.9.8 - Partner & Channel Program  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–6 drafted (Doc-Verified / Vendor-Stated) · Fields 7–8 **Pending internal** (Stratos Edge agreement + portal registration)  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Commission Structure.md](../../../test/Glean/4.9.8 Partner & Channel Program/Commission Structure.md)

---

**Field definition:** Fee splits, referral margins, setup percentages, and recurring revenue splits.  
**Prerequisites / Licensing:** Signed partner agreement (track-specific); referral legal terms.  
**Referral economics (Doc-Verified):** **5% first-year ARR**; **up to 10%** with tier approval; paid ~**45 days** after customer payment.  
**Commercial/VAR margins (Pending Contract):** _TBD — portal agreement only_  
**Confidence Level:** **Doc-Verified** (referral) · **Pending Contract** (reseller margins)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Referral program](https://www.glean.com/partners/referral) · [Partners co-sell section](https://www.glean.com/partners) · Referral 1-pager (linked from referral page)

### Commission inventory

| Track | Published economics | Recurring? | Payment |
|---|---|---|---|
| **Referral** | 5% of **first-year ARR** on net-new private-sector closed-won | **One-time** (first year only) | ~45 days after Glean receives customer payment |
| **Referral (tier uplift)** | Up to **10%** with tier approval | One-time | Same |
| **Commercial / VAR** | "Financial incentives tied to your tier" — **no % published** | Unknown | Portal agreement |
| **Clawback** | On refund / early termination per legal agreement | — | Referral FAQ |

### Engineering observation (Doc-Verified)

- Referral is **low-lift intro motion** — not a recurring reseller margin model.
- For Stratos advisory + implementation revenue, **Services & Solutions** or **Commercial** track likely needed beyond referral 5–10%.
- No published setup-fee split or multi-year renewal commission in public scrap.

### Verification steps / test case

1. Download Referral Program 1-pager from `/partners/referral`.
2. Confirm 5%/10% and payment timing in FAQ.
3. Request Commercial/VAR agreement from Glean channel team for margin % and renewal splits.
4. Model Stratos economics: referral fee vs implementation PS margin (4.9.7 Field 3).

**Risk & Cost Impact:** Risk: Medium (referral alone may not fund full SI motion) | Cost: N/A until deal closes

---
