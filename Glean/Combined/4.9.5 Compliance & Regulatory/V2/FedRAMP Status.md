**Glean Tier 3 Advanced Evaluation**
**FedRAMP Status - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Specific: FedRAMP authorized, in-process, or not pursuing. Impact level (Low, Moderate, High). Any StateRAMP or DoD IL equivalents." Base file: none exists yet - this is a new field added to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md).*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/FedRAMP Status.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/FedRAMP%20Status.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean is **not FedRAMP authorized at any impact level** as of this research pass. Glean's own security page names TX-RAMP Level 2 (a Texas state-level equivalent) as its only government-adjacent authorization, alongside its commercial certifications (SOC 2 Type II, ISO 27001, ISO 42001, HIPAA, GDPR). No FedRAMP marketplace listing, no StateRAMP listing beyond TX-RAMP, and no DoD Impact Level authorization were found. This is a clean, well-corroborated absence finding, not a research gap.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean is not FedRAMP High authorized, per independent third-party security analysis published in 2026 | [exploreagentic.ai/insights/glean-protect-plus-governance-audit](https://www.exploreagentic.ai/insights/glean-protect-plus-governance-audit/) and [exploreagentic.ai/insights/glean-alternatives-for-regulated-industries](https://www.exploreagentic.ai/insights/glean-alternatives-for-regulated-industries/) (third-party, not Glean-authored) | Verbatim: *"Glean is not FedRAMP High authorized at the time of writing."* The same source adds Glean's own security page "claims SOC 2, HIPAA and GDPR without asserting FedRAMP anywhere" - i.e., Glean does not itself claim any FedRAMP status, low/moderate/high included, and a third-party independently confirms the absence at least at the High level. |
| 2 | Glean's own published security page names TX-RAMP Level 2 as its only state/government-style authorization - no FedRAMP mention at all, positive or negative | [glean.com/platform/security](https://www.glean.com/platform/security) (directly fetched) | The certifications named on the page were confirmed as: *"ISO 42001, HIPAA, TX-RAMP Level 2, SOC 2 Type II, ISO 27001, and GDPR."* TX-RAMP (Texas Risk and Authorization Management Program) is a state-level program, distinct from and not equivalent to federal FedRAMP. |
| 3 | No FedRAMP Marketplace listing for Glean (the glean.com enterprise AI company) was found this pass | Direct search of marketplace.fedramp.gov via web search; direct page fetch returned 404 | A site-restricted search (`site:marketplace.fedramp.gov Glean`) returned no matching product listing for the enterprise AI company; results were unrelated FedRAMP marketplace products. A direct attempt to query the marketplace search endpoint returned an HTTP 404. This is consistent with claim 1 - Glean has not entered the FedRAMP authorization process (or at minimum has no marketplace-visible "In Process" or "Authorized" listing) as of this pass. |
| 4 | No StateRAMP listing or DoD Impact Level (IL2/IL4/IL5) authorization was found for Glean beyond the already-confirmed TX-RAMP Level 2 | Search-corroborated absence check | Web search for "Glean StateRAMP DoD IL4 IL5" returned no Glean-specific results - only generic explainer content about what DoD Impact Levels are in general. TX-RAMP (claim 2) remains the only state/government-adjacent authorization found; it is a Texas-specific program and not part of the multi-state StateRAMP consortium. |
| 5 | Impact Level (Low/Moderate/High) is not applicable/not stated because Glean has no FedRAMP authorization to assign a level to | Derived from claims 1 and 3 | Since no FedRAMP authorization (in-process or granted) was found, the field's "impact level" sub-question has no answer to report - this is not a missing data point but a logical consequence of non-authorization. If Glean pursues FedRAMP in the future, the level (Low/Moderate/High) would need to be re-checked at that time. |

## Independent read

- This is the cleanest absence finding among the 5 new fields: multiple independent sources (Glean's own page, a third-party security analyst, and a marketplace search) all agree on the same conclusion with no contradiction, which is a high-confidence result even without Glean's own explicit "not pursuing" statement.
- TX-RAMP Level 2 (claim 2) is a genuinely useful, easy-to-miss data point - it shows Glean has *some* state-government authorization experience, which is relevant context if a client ever asks "has Glean ever gone through a government authorization process at all" (yes, at the Texas state level) even though the federal FedRAMP answer is no.
- For Perimeter Healthcare (a private behavioral healthcare provider, not a federal agency or federal contractor), this field is low direct relevance - FedRAMP only matters if Perimeter ever needs to demonstrate federal-equivalent authorization (e.g., serving VA or other federal healthcare contracts). Worth flagging that distinction so the finding isn't over-weighted in the overall Radar score for this client.

## Confidence

**Search-corroborated, consistent across multiple independent sources** for claim 1 (not FedRAMP High authorized). **Doc-Verified** for claim 2 (directly fetched Glean's own page, verbatim TX-RAMP mention). **Confirmed absence via direct search + failed direct fetch** for claim 3 (no marketplace listing). **Confirmed absence via search** for claim 4 (no StateRAMP/DoD IL). **Logical derivation, not independently sourced** for claim 5. Validation date 2026-09-14. No Glean-authored "we are not pursuing FedRAMP" statement was found - the absence is inferred from the consistent lack of any positive claim, not from an explicit denial, so the companion test guide includes a row to get that explicit confirmation directly.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| FedRAMP High | Not authorized (third-party confirmed) | 1 |
| Glean's own claimed authorizations | ISO 42001, HIPAA, TX-RAMP Level 2, SOC 2 Type II, ISO 27001, GDPR - no FedRAMP | 2 |
| FedRAMP Marketplace listing | None found | 3 |
| StateRAMP / DoD IL | None found beyond TX-RAMP Level 2 | 4 |
| Impact Level (Low/Mod/High) | Not applicable - no authorization to assign a level to | 5 |
