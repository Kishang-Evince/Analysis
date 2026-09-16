**Glean Tier 3 Advanced Evaluation**
**Industry Applicability - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/solutions/industries/life-sciences` and `glean.com/perspectives/ai-automation-use-cases`. Field definition: "Industry sectors where this specific use case is highly relevant." Base file at [`../Industry Applicability.md`](../Industry%20Applicability.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Industry Applicability.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Industry%20Applicability.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

**Important, sixth confirmed instance of this project's recurring "generic industry content mistaken for a vendor-specific claim" pattern**: the "AI automation use cases by industry" article cited as a source for this field is not actually about Glean's own product at all - it's generic commentary on AI automation broadly (IoT sensors, computer vision quality control, loan-processing acceleration), covering manufacturing, financial services, retail, and professional services in ways entirely unconnected to Glean's specific features. This source should be dropped from this field's citation list. Separately, the life sciences industry page confirms four real, specific use cases - none naming an actual customer - reinforcing this project's already-established finding (4.9.9) that healthcare/life-sciences remains a less customer-proven vertical for Glean than its named enterprise wins elsewhere.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | **Sixth confirmed instance of this project's "generic industry content ≠ vendor-specific claim" sourcing trap**: the "AI automation use cases" article cited in this field's source list is generic AI-in-industry commentary, not specifically about Glean's product or features | [glean.com/perspectives/ai-automation-use-cases](https://www.glean.com/perspectives/ai-automation-use-cases) | Confirmed directly: the article discusses *"Real-time data from IoT sensors,"* *"computer vision to identify defects,"* and *"loan processing accelerates by up to 25 times"* - none of which describe Glean's own product capabilities. This article should not be cited as evidence for any Glean-specific industry-applicability claim; it is general industry-trend commentary published on Glean's blog, continuing the exact pattern already found five times elsewhere in this project (ABAC, encryption-key language, bias/impartiality language, the "Comparing Costs" implementation-cost bands, and the generic AI-search cost figures). |
| 2 | The life sciences industry page confirms four real, specific named use cases, directly relevant to UC-08 and to any pharma/life-sciences-adjacent healthcare client | [glean.com/solutions/industries/life-sciences](https://www.glean.com/solutions/industries/life-sciences) | Confirmed directly: *"Advance the next study with prior evidence"* (avoiding redundant research), *"Prepare for stage gates and inspections"* (summarizing SOPs/submission evidence), *"Assess cold-chain excursions faster"* (logger data, shipment records, CAPAs), and *"Prepare field teams with approved context"* (commercial/medical team prep). |
| 3 | No specific customer is named anywhere on the life sciences industry page - reconfirming, via a fresh independent check, this project's already-established 4.9.9 finding that healthcare/life-sciences lacks named customer proof points relative to Glean's other verticals | [glean.com/solutions/industries/life-sciences](https://www.glean.com/solutions/industries/life-sciences) | Confirmed directly: *"The page does not name any specific customers... without mentioning any named organizations or case studies."* This is now confirmed across three separate pages in this project's research (healthcare solutions, the life-sciences blog in 4.9.9, and this industry page) - a consistent absence, not a one-off gap. |
| 4 | UC-02 and UC-08's healthcare-specific applicability claims should be sourced from the healthcare solutions page and this project's own 4.9.9 research, not from the generic AI-automation article - this field's source list should be corrected accordingly | Cross-referenced from claims 1-3, and this project's 4.9.9 Best-Fit Client Profile V2 field | Given claim 1's finding, the base research's implicit reliance on the "AI automation use cases" article for industry-applicability evidence should be replaced with the healthcare solutions page and the life-sciences blog (both already directly read in this project's 4.9.9 research) as the actual, relevant sources. |
| 5 | The "Cold-chain excursion" use case (life sciences) is a genuinely distinct, specialized workflow not represented anywhere else in this project's use-case library - worth noting as a potential UC-09 candidate specifically for a pharma-adjacent healthcare client, though out of scope for Perimeter Healthcare's own tenant stack unless cold-chain/supply logistics become relevant | [glean.com/solutions/industries/life-sciences](https://www.glean.com/solutions/industries/life-sciences) | This is a genuinely novel workflow pattern (logger data + shipment records + CAPAs + release criteria) not captured by any of UC-01 through UC-08 - flagged for awareness, not recommended for immediate inclusion given Perimeter Healthcare's likely provider/payer (not pharma-supply-chain) profile. |

## Independent read

- Claim 1 is this pass's most important finding for research integrity - using a generic, non-Glean-specific article as a cited source for a field specifically about *Glean's* industry applicability would be a real sourcing error, and it's worth removing this citation from the field's source list going forward rather than leaving it as an unexamined reference.
- Claim 3's cross-page reconfirmation (three separate pages, same absence) meaningfully strengthens confidence that the lack of named healthcare/life-sciences customers is a real, stable pattern in Glean's public materials, not an artifact of checking only one page.
- Claim 5 is offered as a forward-looking note rather than a finding requiring action now - worth keeping in mind if Perimeter Healthcare's scope ever expands toward supply-chain or pharma-adjacent operations.

## Confidence

**Doc-Verified, a sourcing correction** for claim 1. **Doc-Verified** for claims 2, 3. **Cross-referenced synthesis** for claim 4. **Doc-Verified, forward-looking note** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (a legal review of which document classes may enter the index) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| "AI automation use cases" article | **Sourcing error**: generic content, not Glean-specific - remove from citations | 1 |
| Life sciences use cases | Confirmed: 4 named, specific workflows | 2 |
| Named life-sciences customers | Confirmed absent - 3rd page confirming this pattern | 3 |
| Corrected source list for UC-02/UC-08 | Should use healthcare page + 4.9.9 research instead | 4 |
| Cold-chain excursion use case | Novel pattern, out of scope for Perimeter's likely profile | 5 |
