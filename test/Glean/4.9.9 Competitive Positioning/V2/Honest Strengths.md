# 4.9.9 Honest Strengths — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Honest Strengths.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Strengths.md). The core finding there is that this field's strongest claim (permission-aware cross-app search) is already hands-on tested elsewhere in this evaluation and deserves top billing over vendor-stated benchmarks — two of which needed correction (connector count, and the "1.9x" benchmark's actual source page) and one of which (Ericsson's "2,700+ agents") couldn't be reconfirmed at all. This guide's job is to re-run the actual sandbox tests that back claim 1, and independently verify the vendor claims that remain unconfirmed. Written so someone with no prior context on this project can pick it up and run it — mostly sandbox testing plus a few web checks.

**Tenant entry:** Glean Assistant/Search sandbox (`app.glean.com`) · `glean.com/compare/*` and `glean.com/perspectives/*` pages
**Companion research doc:** [V2/Honest Strengths.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Strengths.md)
**Base field doc (untouched, original):** [../Honest Strengths.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Honest%20Strengths.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Sandbox access with a "User B" (non-admin) test account, per this project's established convention.
- Test content in Drive/OneDrive/Gmail/Outlook/Notion with known, deliberately restricted sharing.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Honest Strengths.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Strengths.md#claims-sr-no-1-9-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here. Row 9 added 2026-09-14.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page/sandbox check) or `Hard` (needs careful test setup or a search that may not resolve) — so you can plan which rows to tackle first.

---

## Section 1 — Re-confirming the field's strongest, already-tested claim — Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Permission-aware cross-app RAG genuinely holds — re-run the negative ACL test fresh for this field's own evidence record | 1. As User B, attempt to search for content you know is private to another user across Drive, OneDrive, Gmail, and Outlook.<br>2. Confirm none of it surfaces, and that any citations shown are ACL-bound. | User B sees nothing they shouldn't, confirming this project's strongest strength claim holds up under a fresh, independent re-test. | | Same underlying test as 4.9.1/4.9.5 — reuse if recently run, otherwise re-run for this field's own record | ~20 min, Easy |

## Section 2 — Confirming the corrected connector count and benchmark attribution — Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The connector count is 275+, not 250+ | Open both `glean.com/compare/glean-vs-chatgpt-enterprise` and `glean.com/compare/glean-vs-copilot` and confirm the figure on each. | You independently confirm 275+ appears consistently. | | | ~10 min, Easy |
| 3 | The "1.9x" benchmark and its 280-query methodology appear only on the ChatGPT-Enterprise compare page, not the Copilot one | Open both compare pages and confirm the benchmark's presence/absence on each. | You confirm the attribution correction. | | | ~10 min, Easy |

## Section 3 — Digging for the Zillow and Ericsson agent-count figures — Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Zillow's 3,400+ agents and the 7% review-participation increase are real, citable figures | Open `glean.com/resources/customer-stories/zillow` directly and confirm both figures. | You independently confirm both figures match research. | | | ~10 min, Easy |
| 5 | Ericsson's "2,700+ agents" figure needs to be found and confirmed, or dropped from any client-facing material until it is | 1. Search specifically for a Glean/Ericsson case study or press release naming an agent count.<br>2. If found, note the source and exact figure. If not found, confirm this claim should be removed or marked unconfirmed in any Stratos deck. | You either find and confirm the real figure, or confirm it should not be used until it can be sourced. | | This closes research's one explicitly flagged unconfirmed claim | ~20 min, Easy |

## Section 4 — Distinguishing tested vs. vendor-stated permission claims — Sr No 6-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The real-time SharePoint permission-revocation-speed claim is genuinely untested by this project — test it directly if SharePoint is in scope, or explicitly leave it vendor-stated | If your tenant stack includes SharePoint: revoke a test user's access to a specific document, then immediately re-search as that user and time how long it takes for the content to disappear from results. | You get a real, measured answer to a claim this project has only had as vendor-stated until now. | | Only relevant if SharePoint is in your tenant's actual connector scope — otherwise mark N/A and keep the claim vendor-stated | ~15 min (or N/A), Hard |
| 7 | The "106 SaaS apps" industry statistic is real, general context — confirm its source is accurately described as industry data, not Glean-specific | Confirm the statistic's phrasing on the perspectives article and note it as general industry context in any client material, not a Glean-specific claim. | You confirm the correct attribution. | | | ~5 min, Easy |
| 8 | The Copilot-comparison perspective article is clearly Glean-authored marketing content — make sure any citation of it says so | Confirm the article's authorship/byline and framing. | You confirm it should be cited as vendor-authored content, not neutral analysis. | | | ~5 min, Easy |

## Section 5 — Confirming the Claude Cowork benchmark figures and flagging them as unverified marketing claims — Sr No 9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | Glean's self-reported Claude Cowork benchmark (78% win rate, 81% lower cost per task, 70% higher token efficiency, 31% lower blended cost/token) is real, vendor-published marketing content with no disclosed methodology | Open `glean.com/platform/intelligence` and `glean.com/platform/ai-gateway` and confirm the exact figures quoted. Look for any methodology disclosure (sample size, evaluation criteria, date) on either page. | You confirm the figures appear as stated, and confirm no independent methodology is disclosed — meaning this should be presented to the client as an unverified vendor marketing claim, not a validated strength. | | Do not let this figure be cited without the "vendor-run, methodology-undisclosed" caveat | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Honest Strengths.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Strengths.md), and specifically record the fresh ACL test result (Sr No 1) and whether the Ericsson figure was resolved (Sr No 5).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Strongest claim re-tested | 1 | | | | |
| 2. Connector count + benchmark attribution | 2 | | | | |
| 3. Zillow/Ericsson agent-count figures | 2 | | | | |
| 4. Tested vs. vendor-stated permission claims | 3 | | | | |
| 5. Claude Cowork benchmark verification | 1 | | | | |
