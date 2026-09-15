# 4.9.4 Integration Licensing - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Integration Licensing.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Integration%20Licensing.md). The core finding there is that Glean's public documentation confirms native connectors, MCP host, and standard API usage are bundled into the per-seat license, but publishes no per-connector or per-API-call dollar figure anywhere - and a third-party estimate for custom connector development ($15,000-$75,000/integration) is unconfirmed by Glean directly. This is inherently a sales-conversation-gated question: most rows here are answered by your signed Order Form/contract or a direct conversation with your Glean AE/CSM, not by self-serve testing. A few rows are Admin Console checks for any visible connector usage/quota signals.

**Tenant entry:** Admin Console → Platform → Connectors; Admin Console → Usage/Billing (if visible to your role); your organization's signed Glean Order Form/contract
**Companion research doc:** [V2/Integration Licensing.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Integration%20Licensing.md)
**Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Your organization's signed Glean Order Form and/or MSA/contract (or access to whoever holds it - procurement/legal).
- Admin access to the Glean Admin Console (Connectors and, if available, Usage/Billing sections).
- Contact info for your Glean Account Executive (AE) or Customer Success Manager (CSM) - several rows below can only be closed by directly asking them.
- If your organization has evaluated or built any custom/non-native connector, whoever ran that project (for Sr No 6-7).

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Integration Licensing.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Integration%20Licensing.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally confirmed it against your own contract, console, or a direct AE/CSM answer - not that the public docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick console check or document lookup) or `Medium`/`Hard` (requires a scheduled conversation with your AE/CSM, or digging through contract line items).

---

## Section 1 - Confirming native connectors and standard API usage are bundled, not itemized - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Your signed Order Form/contract confirms native connectors (and MCP host, if licensed) are bundled into your per-seat fee, with no separate per-connector line item | 1. Open your organization's signed Glean Order Form/contract.<br>2. Look for any line item pricing connectors individually, or any statement that connector access is bundled with the seat license.<br>3. If unclear, ask your AE/CSM directly: "Are the connectors we use billed separately from our seat license, or bundled in?" | Your contract (or your AE/CSM) confirms connectors are bundled into the seat fee, matching the public docs finding - no surprise per-connector line item exists. | | | ~20 min, Easy (Medium if it requires an AE call) |
| 2 | Your organization's actual API usage (search, indexing, admin APIs feeding your connectors) has not triggered any "machine-scale/abusive volume" additional fee, or if it has, you know what that fee is | 1. Check Admin Console → Usage/Billing (if visible) for any API usage warnings or overage flags.<br>2. Ask your AE/CSM whether your organization has ever been flagged for machine-scale API usage, and if so what the resulting fee was. | Either no overage has occurred, or you now have a concrete, tenant-specific answer for what "abusive volume" fees actually cost your organization - closing a gap the public docs leave abstract. | | | ~20 min, Easy (Medium if it requires an AE call) |

## Section 2 - Confirming AI-feature/connector-fed surfaces bill via Model Hub, not a connector fee - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Your contract's Model Hub / FlexCredit line items are billed based on token/query consumption, not tied to which connectors feed the underlying data | 1. Review your Order Form's Model Hub / FlexCredit pricing section (cross-reference with the companion `License Structure Details.md` test guide if already completed).<br>2. Confirm with your AE/CSM that Model Hub charges are consumption-based (tokens/queries), not connector-count-based. | Your AE/CSM or contract confirms Model Hub/FlexCredit billing is consumption-driven, with no separate per-connector multiplier or surcharge for which data sources are connected. | | If this was already confirmed while testing `License Structure Details.md`, you can copy that result here rather than re-asking | ~15 min, Easy (Medium if it requires an AE call) |

## Section 3 - Confirming custom/non-native connector costs, if applicable - Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | If your organization needs (or has needed) a custom/non-native connector (via Push API), confirm whether Glean quoted a separate professional-services fee for it | 1. Ask your AE/CSM: "If we need a custom connector for [a specific in-house or proprietary system], is that quoted separately, and roughly what does that cost?"<br>2. If your organization has already built one, check the relevant Statement of Work (SOW) or invoice for the actual fee charged. | You get either a real quoted range for your organization, or a real historical dollar figure from a prior custom connector project - closing the gap the public docs leave as "quote-only." | | Mark `Blocked (no custom connector need identified)` if not applicable to this deployment | ~20-30 min, Medium (AE conversation) |
| 5 | The third-party-sourced $15,000-$75,000 per-integration estimate in the companion research doc is sanity-checked against what your organization was actually quoted (if a custom connector was scoped) | 1. Compare any quote or actual cost from Sr No 4 against the $15,000-$75,000 range cited in the research doc (claim 6).<br>2. Note whether your organization's real number falls inside, below, or above that range. | You have a real data point confirming, refuting, or refining the third-party estimate for this specific vendor relationship. | | This is the single most valuable result this guide can produce, since it's the only claim in the companion doc not directly Glean-sourced | ~10 min once Sr No 4 is done, Easy |
| 6 | Admin Console shows whether any custom/Push-API connectors are currently configured in your tenant, and if so, whether they carry any visible usage/cost indicator | 1. Go to Admin Console → Platform → Connectors.<br>2. Look for any connector marked as custom/Push API type (vs. native).<br>3. Check whether the console surfaces any usage, quota, or cost indicator for it. | You confirm whether any custom connectors exist in this tenant today, and whether the console gives any visible cost/usage signal for them (most likely: no visible dollar cost in-console, confirming billing lives only in the contract). | | | ~10 min, Easy |

## Section 4 - Confirming no tier-based connector count/access gating applies to your license - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Your organization's license (Core Suite and/or Enterprise Flex) does not cap or gate the number/type of native connectors you can enable - confirm this against your actual contract and Admin Console, not just the public docs | 1. Check your Order Form for any stated connector count limit or named list of "included" vs. "add-on" connectors.<br>2. In Admin Console → Platform → Connectors → Add connector, confirm whether any connector shows as locked/unavailable due to your license tier. | No connector-count cap or tier-based connector gating is found in your contract or console, matching the public-docs absence-check - or, if one IS found, that's a genuinely new finding this guide should flag back to the research doc. | | If you find ANY tier-gated connector limit, this contradicts claim 7 and should be reported back prominently, since it wasn't found in any public source | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Integration Licensing.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Integration%20Licensing.md), and specifically flag Sr No 5's real-world dollar comparison and any tier-gating contradiction found in Sr No 7 - those are the two rows most likely to change the doc's confidence tier.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Native connectors & API usage bundled | 2 | | | | |
| 2. AI-feature/Model Hub billing tied to consumption, not connectors | 1 | | | | |
| 3. Custom connector cost confirmation | 3 | | | | |
| 4. Tier-based connector gating check | 1 | | | | |
