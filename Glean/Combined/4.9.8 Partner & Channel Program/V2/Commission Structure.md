**Glean Tier 3 Advanced Evaluation**
**Commission Structure - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/partners/referral`. Field definition: "Fee splits, referral margins, setup percentages, and recurring revenue splits." Base file at [`../Commission Structure.md`](../Commission%20Structure.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Commission Structure.md](../../../../test/Glean/4.9.8%20Partner%20&%20Channel%20Program/V2/Commission%20Structure.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The referral track's 5%/10% economics are reconfirmed directly, with real new precision on eligibility: a referral only qualifies if the account is not an existing customer, has no active qualified opportunity, and has had no recent meaningful sales engagement - three specific, checkable exclusion conditions not previously documented. Clawback is confirmed as pro-rated, not all-or-nothing. Commercial/VAR reseller margins remain completely unpublished anywhere checked, consistent with prior research - this is the track most relevant to Stratos's actual implementation-and-advisory revenue model, and it stays a real, confirmed gap requiring direct portal/agreement access.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The 5% first-year-ARR referral commission applies specifically to a "net-new, private-sector closed-won deal" - confirmed verbatim, not paraphrased | [glean.com/partners/referral](https://www.glean.com/partners/referral) | Verbatim: *"For eligible referrals that turn into a net-new, private-sector closed-won deal, you earn 5% of first-year ARR."* |
| 2 | **New finding**: three specific eligibility exclusions govern whether a referral qualifies at all - the account must not already be a Glean customer, must have no active qualified opportunity, and must show no recent meaningful sales engagement | [glean.com/partners/referral](https://www.glean.com/partners/referral) | Verbatim: *"The account must not be an existing Glean customer, there must be no active qualified opportunity, and no recent meaningful sales engagement."* This is real, previously-undocumented specificity - a referral to an account Glean's sales team is already quietly working would not qualify, even if the partner didn't know that. |
| 3 | Clawback is confirmed as a pro-rated reduction, not necessarily a full forfeiture - a more precise mechanic than "per agreement" | [glean.com/partners/referral](https://www.glean.com/partners/referral) | Verbatim: *"If a customer fails to pay, receives a refund, or terminates early, we may reduce, withhold, or claw back fees on a pro-rated basis."* |
| 4 | A downloadable Referral Program one-pager exists at a specific, real URL - but its contents could not be extracted via automated fetch this pass and should be reviewed with a live browser/download | [glean.com/partners/referral](https://www.glean.com/partners/referral), linking to [a Google Drive-hosted PDF](https://drive.google.com/file/d/1rOR-aiAUuJStYvKxIihvzF6oZq_io-4I/view?usp=sharing) | The link itself is confirmed real and live. A direct fetch attempt returned only the Google Drive viewer shell, not the document's actual text - consistent with this project's recurring pattern of JS-rendered/viewer-gated content resisting automated extraction. This should be downloaded and read directly by a person rather than assumed to add nothing beyond the webpage. |
| 5 | Commercial/VAR reseller margin percentages remain completely unpublished anywhere checked this pass, across Glean's own site and general search - reconfirming, not just repeating, the base research's finding | Absence-check, fresh search this pass | No source - Glean-authored or third-party - disclosed a specific reseller margin percentage, renewal-year commission rate, or setup-fee split for the Commercial/VAR track. This is the track most relevant to Stratos's actual revenue model (referral alone is a one-time, low-lift motion), making this gap the field's most consequential one to close directly. |
| 6 | No multi-year renewal commission structure was found for any track, referral or otherwise | Absence-check, fresh search this pass | Consistent with prior research: nothing found describing what (if anything) a partner earns in Year 2 or Year 3 of a referred or resold customer's subscription. |
| 7 | A sourcing caution specific to this field: "Glean.ai Partner Program" content surfaced in a general search for Glean commission/margin terms - worth flagging explicitly here because a commission-percentage mix-up between the two unrelated companies would be a real, consequential research error, not just a cosmetic one | Search-corroborated - [glean.ai/partner](https://www.glean.ai/partner) appeared in search results for Glean commission-structure terms | Glean.ai (the accounts-payable/spend-intelligence company, already flagged multiple times elsewhere in this project) runs its own, entirely separate partner program with its own commission terms. Given this field is specifically about dollar percentages, citing a Glean.ai commission figure as if it were Glean.com's would be a materially worse mistake here than in most other fields - worth a specific, standing caution. |

## Independent read

- Claim 2 is the most useful addition this pass: the three exclusion conditions mean a partner can't assume every warm intro qualifies for the referral fee - an account already in active discussion with Glean's own sales team, even if the partner isn't aware of that, would be excluded. This is worth surfacing to whoever at Stratos would be making referrals.
- Claim 5 remains this field's central open question, and it's the one most worth resolving directly - referral economics alone (a one-time 5-10% of first-year ARR) would not fund a full systems-integrator-style implementation motion, which is exactly the concern the base research's own "Engineering observation" already flagged.
- Claim 7 is offered as a standing, field-specific caution rather than a new substantive finding - it doesn't change any number in this field, but the stakes of the "similarly-named company" trap are higher here than in a field like Training Infrastructure, since a wrong commission percentage could directly affect a real business decision.

## Confidence

**Doc-Verified** for claims 1, 2, 3 (direct fresh fetch, verbatim quotes). **Confirmed-real-but-unreadable** for claim 4 (the link and its existence are confirmed; its contents are not). **Absence-check** for claims 5, 6. **Search-corroborated, standing caution** for claim 7. Validation date 2026-09-09. Tenant/hands-on verification (an actual downloaded 1-pager read, an actual Commercial/VAR agreement request) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Referral commission scope | Confirmed: net-new, private-sector, closed-won only | 1 |
| Referral eligibility exclusions | New finding: 3 specific disqualifying conditions | 2 |
| Clawback mechanic | Confirmed: pro-rated, not all-or-nothing | 3 |
| Referral 1-pager PDF | Real link confirmed; contents unreadable via automated fetch | 4 |
| Commercial/VAR margin % | Confirmed absent everywhere - the field's key open question | 5 |
| Multi-year renewal commission | Confirmed absent for all tracks | 6 |
| Glean.ai sourcing caution | Standing caution specific to this field's dollar-figure stakes | 7 |
