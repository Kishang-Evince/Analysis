# 4.9.11 Compliance Reporting - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Compliance Reporting.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Compliance%20Reporting.md). This is the final field of the entire Tier 3 evaluation. The key open item is confirming whether Guardrails Insights actually requires Protect+ specifically, since the release note announcing it is ambiguous on tiering. This guide's job is to resolve that and do the final compliance-pack assembly exercise for Perimeter Healthcare. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Protect / Guardrails Insights · `trust.glean.com` (live browser) · your Glean account team
**Companion research doc:** [V2/Compliance Reporting.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Compliance%20Reporting.md)
**Base field doc (untouched, original):** [../Compliance Reporting.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Compliance%20Reporting.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access; awareness of whether your tenant has base Protect or Protect+.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Compliance Reporting.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Compliance%20Reporting.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming Guardrails Insights and resolving its tier requirement - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Guardrails Insights is a real, centralized dashboard | Open it from Admin Console → Protect and confirm the trend/policy-confidence/high-risk-user views. | Confirmed. | | | ~15 min, Easy |
| 2 | Guardrails Insights actually requires Protect+, not just base Protect | If your tenant is on base Protect only, confirm whether you can access Guardrails Insights. If not, ask your account team directly: *"Does Guardrails Insights require Protect+ specifically, or is it available on base Protect?"* | You get a definitive, tier-specific answer. | | This closes research's flagged ambiguity | ~15 min + wait for reply if needed, Easy |

## Section 2 - Confirming Trust Portal access and doing the final compliance-pack exercise - Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Trust Portal requires a live browser (and likely login) to access meaningfully | Open `trust.glean.com` in a real, logged-in browser session and confirm real content (certifications, subprocessor list, etc.) becomes visible where automated fetch failed. | Confirmed. | | | ~15 min, Easy |
| 4 | The rest of the reporting inventory is accurate | Spot-check 2-3 items (Sensitive Findings CSV export, Admin audit log CSV, Assistant Insights) against your own tenant. | Confirmed. | | | ~20 min, Easy |
| 5 | **Final deliverable of the entire evaluation**: assemble an actual client-facing compliance pack for Perimeter Healthcare from the real, individually-exported pieces (BAA + Protect+ Sensitive Findings + GCE sample + Admin audit log + Trust Portal SOC2/ISO excerpts) | Pull each real export/document and assemble them into one coherent packet, explicitly noting for the client that this is an assembled pack, not a native Glean report. | You produce the actual, final compliance deliverable this entire Tier 3 evaluation has been building toward. | | This is the capstone deliverable for the whole project | ~half day, Hard |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Guardrails Insights + tier resolved | 2 | | | | |
| 2. Trust Portal + final compliance-pack assembly | 3 | | | | |
