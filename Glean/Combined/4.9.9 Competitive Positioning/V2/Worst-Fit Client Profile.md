**Glean Tier 3 Advanced Evaluation**
**Worst-Fit Client Profile - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools` and independent Copilot-pricing research. Field definition: "Organizational profiles or compliance structures where the tool is a mismatch." Base file at [`../Worst-Fit Client Profile.md`](../Worst-Fit%20Client%20Profile.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Worst-Fit Client Profile.md](../../../../test/Glean/4.9.9%20Competitive%20Positioning/V2/Worst-Fit%20Client%20Profile.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass adds real precision - and an important caveat - to the "M365-only shop" mismatch signal's pricing rationale. Glean's own comparison page states specific figures ($50+$15/user/month for Glean vs. $30/user/month for Copilot, projected to $600K-$780K vs. $360K/year at 1,000 employees), but independent Copilot-pricing research confirms that $30 figure is specifically an *add-on* price requiring a qualifying base Microsoft 365 license already owned - the true all-in Copilot cost is more accurately $42-$90/user/month depending on the base tier. This doesn't undermine the worst-fit signal - if anything it strengthens it for genuinely M365-only shops, since their real incremental cost for AI specifically is the lower $30 add-on, not a like-for-like $50-65 comparison - but the framing needs this clarification to be presented honestly rather than as a flat, misleading dollar-for-dollar comparison.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean's own comparison page states specific pricing figures for both products, with a concrete annual projection at 1,000 employees | [glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools](https://www.glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools) | Confirmed directly: Glean stated at *"approximately $50 per user per month, plus approximately $15 for AI features"* (~$65 total); Copilot stated at *"approximately $30 per user per month."* At 1,000 employees, the article projects Glean at *"roughly $600,000 to $780,000 per year"* versus Copilot at *"roughly $360,000 per year."* |
| 2 | **Important clarification**: independent Copilot-pricing research confirms the "$30/user/month" figure is specifically an add-on price requiring a qualifying base Microsoft 365 license (E3/E5, Business Standard/Premium, etc.) already in place - the true, all-in Copilot cost is more accurately $42-$90/user/month depending on the base tier, a distinction Glean's own comparison page does not make explicit | Search-corroborated - multiple independent Copilot-pricing analyses | *"These are add-on prices only-your real cost is the base plan plus Copilot, typically $30-$90/user/month... the honest answer is a range, not a single figure - $42 to $90 per user per month, depending entirely on which base tier that user already sits on."* This is a real nuance worth stating explicitly: for an organization that does NOT already own a qualifying M365 base license, the true cost of adopting Copilot is substantially higher than $30/seat - but for one that already does (the exact "M365-only shop" profile this field is describing), $30/seat genuinely is the correct incremental AI-specific cost to compare. |
| 3 | Glean's own comparison page includes a fair, self-aware counter-argument acknowledging the price gap may be offset by efficiency gains - worth citing alongside the raw dollar figures rather than omitting it | [glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools](https://www.glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools) | Confirmed directly: the article notes that *"when accounting for productivity losses from tool-switching and additional point solutions needed to fill capability gaps with the single-ecosystem approach, the apparent cost difference may be offset by efficiency gains."* Presenting only the raw dollar comparison without this caveat would understate the fairness of Glean's own framing. |
| 4 | Claim 2's clarification actually strengthens, not weakens, the base research's "M365-only shop" worst-fit signal - for a genuinely single-suite organization already paying for a qualifying M365 tier, Copilot's true incremental AI cost really is the lower ~$30/seat figure, making it the more cost-efficient choice for that specific profile | Cross-referenced synthesis of claims 1-2 | This is worth stating precisely in any client-facing walk-away criteria: the worst-fit signal isn't just "Copilot is cheaper" in the abstract - it's specifically that an M365-only shop's *incremental* cost of adding AI capability is lower with Copilot than with Glean, because Glean's ~$65/seat is a full product cost layered on top of (not replacing) their existing M365 spend, while Copilot's ~$30/seat is genuinely just the marginal AI add-on to a suite they already own. |
| 5 | The remaining worst-fit signals (Notion-confidential-heavy orgs, air-gap/on-prem requirements, fixed-TCO budget rigidity, personal-Notion-only setups, low IT capacity, sub-100-seat/low-app-sprawl organizations) all remain valid on cross-reference to this project's own prior V2 findings - no new mismatch signal was identified this pass | Cross-referenced across this project's 4.9.3, 4.9.5, 4.9.6, 4.9.7 V2 fields | Each of these traces to a specific, already-confirmed finding elsewhere in this project (Notion's structural oversharing gap, Cloud-Prem's vendor-operated-only nature, FlexCredit/Protect+ pricing opacity, personal-Notion setup assumptions, adoption-failure risk factors). This pass's fresh contribution is concentrated on the pricing-comparison signal (claims 1-4), which is the one signal in the base catalog that depended on external vendor-comparison content rather than this project's own hands-on testing. |

## Independent read

- Claims 1-4 together are this field's most valuable addition: rather than either accepting Glean's comparison at face value or dismissing it as self-serving marketing, this pass found the specific independent data needed to determine which framing is actually more accurate for which client situation - and the answer is nuanced (Glean's comparison is reasonably fair specifically for the "already owns M365" scenario this worst-fit signal describes, once the add-on-vs-all-in distinction is made explicit).
- Claim 5's honest "nothing new" for the remaining signals is appropriate - this project has already done substantial hands-on and documentary work establishing those gaps elsewhere, and re-deriving them here would be redundant rather than additive.

## Confidence

**Doc-Verified** for claims 1, 3 (direct fresh fetch, verbatim quotes). **Search-corroborated, independent, high confidence** for claim 2. **Cross-referenced synthesis** for claim 4. **Cross-referenced** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (a real prospect-discovery pricing conversation, a real Notion-oversharing discovery question) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Glean's own pricing comparison figures | Confirmed: ~$65/seat Glean vs. ~$30/seat Copilot | 1 |
| Copilot's "$30" is an add-on price, not all-in | Confirmed, independent - true cost $42-$90/seat depending on base tier | 2 |
| Glean's own efficiency-offset counter-argument | Confirmed, worth including for fairness | 3 |
| Clarified worst-fit pricing rationale | Strengthened: real incremental-cost comparison favors Copilot for genuine M365-only shops | 4 |
| Remaining worst-fit signals | Reconfirmed via cross-reference; nothing new | 5 |
