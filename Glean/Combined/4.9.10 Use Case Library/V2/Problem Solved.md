**Glean Tier 3 Advanced Evaluation**
**Problem Solved — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/resources/guides/idc-marketscape-knowledge-discovery`, cross-referenced against a fresh web search and this project's own 4.9.10 Department/Function V2 field. Field definition: "The operational inefficiency or manual bottleneck resolved by deployment." Base file at [`../Problem Solved.md`](../Problem%20Solved.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Problem Solved.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Problem%20Solved.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

**Real, worth-flagging sourcing correction**: the "~20% of week searching" benchmark cited in this field's source list is not actually found on the specific IDC MarketScape landing page cited — a direct fresh fetch of that exact page turned up no such statistic anywhere. The figure does exist and is real, but traces more precisely to **McKinsey Global Institute research**, not IDC specifically — an independent, well-known third-party research source, which is a meaningfully more credible attribution than "IDC/Glean collateral" once correctly sourced. Separately, this pass connects a real, quantified customer proof point (Confluent, found in this project's own Department/Function V2 research) directly into this field's evidence base for UC-07.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | **Sourcing correction**: the specific IDC MarketScape page cited in this field's source list does not contain the "~20% of week searching" statistic anywhere — a direct fresh fetch confirmed only a page description, title, and a "Get a demo" call-to-action, with no such figure present | [glean.com/resources/guides/idc-marketscape-knowledge-discovery](https://www.glean.com/resources/guides/idc-marketscape-knowledge-discovery) | This specific URL should be removed as the citation for the "20% of week" statistic — it does not appear on this page. This is a real content-location error worth correcting before this field's source list is relied upon further. |
| 2 | The "~20% of week searching" statistic more precisely traces to McKinsey Global Institute research, not IDC — an independent, well-known third-party research source, which somewhat increases confidence in the figure once correctly attributed | Search-corroborated — multiple sources describing McKinsey Global Institute's knowledge-worker research | Per this pass's search: *"McKinsey Global Institute research, the average knowledge worker spends nearly 20% of their workweek searching for internal information or tracking down colleagues who can help."* This is a genuinely independent research finding (not vendor-invented), though Glean (like many enterprise-search vendors) repeats it in its own marketing — the correct attribution is McKinsey, not IDC, and this project's summary should reflect that. |
| 3 | The "employees search 10+ systems daily" figure remains sourced to Glean's own compare pages, consistent with prior research — no new independent source was found for this specific number this pass | Absence-check, fresh search this pass | This figure should continue to be labeled Vendor-Stated, distinct from the McKinsey-sourced 20% figure (claim 2), which carries a meaningfully different (independent, third-party) provenance. These two statistics should not be presented with the same confidence level. |
| 4 | **New, valuable connection**: the Confluent customer case study (found in this project's own Department/Function V2 field) provides a real, quantified answer to "what problem does this actually solve" for UC-07 specifically — a stronger evidentiary tier than the generic "pre-meeting scramble" problem description alone | Cross-referenced from this project's own 4.9.10 Department/Function V2 field (claim 3) | Confluent's real, named outcomes — *"5 mins saved in customer response times," "+13% employee satisfaction scores for access to information," "15k+ hours saved monthly"* — directly demonstrate the problem-to-outcome arc for a customer-facing/response-time use case closely analogous to UC-07. This should be cited alongside UC-07's problem statement as the strongest available evidence tier for this specific use case. |

## Independent read

- Claim 1's correction matters for citation hygiene specifically — a reader who follows the cited URL expecting to find the "20% of week" statistic would find nothing there, which undermines confidence in the whole source list if left uncorrected.
- Claim 2's re-attribution to McKinsey is a genuine upgrade in evidentiary standing for this specific number — McKinsey Global Institute is a well-regarded, independent research body, distinct from a vendor's own unverified marketing claim, even though Glean (like most competitors) repeats the figure in its own materials.
- Claim 4 continues this project's practice of connecting cross-field findings — the Confluent case study surfaced while researching Department/Function is directly relevant here too, and citing it in both places strengthens the overall library's evidentiary base without requiring new research.

## Confidence

**Doc-Verified, a sourcing correction** for claim 1. **Search-corroborated, independent third-party source** for claim 2. **Absence-check** for claim 3. **Cross-referenced, high confidence** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (the actual baseline timing study, the actual pre/post pilot survey) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| IDC MarketScape citation | **Corrected**: the "20%" figure is not on this specific page | 1 |
| "20% of week" statistic's real source | McKinsey Global Institute, not IDC — independent, more credible | 2 |
| "10+ systems daily" figure | Confirmed Vendor-Stated only, distinct confidence tier from claim 2 | 3 |
| Confluent case study for UC-07 | Real, quantified problem-to-outcome evidence, cross-referenced in | 4 |
