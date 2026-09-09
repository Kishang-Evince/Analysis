# 4.9.8 Partner Program Details — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Partner Program Details.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Program%20Details.md). This pass found two real, previously-undocumented benefits (MDF/co-marketing, automated deal registration) plus two genuine discrepancies (an accreditation count that may have doubled in two weeks, and inconsistent partner-category counts across sources). This guide's job is to resolve both discrepancies directly with a Glean contact and confirm the new benefits apply to whichever pathway Stratos chooses. Written so someone with no prior context on this project can pick it up and run it — mostly web review and a real partner-application submission, no developer access needed.

**Tenant entry:** `glean.com/partners` · `partners.glean.com` (application portal) · a Glean partner manager (post-application)
**Companion research doc:** [V2/Partner Program Details.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Program%20Details.md)
**Base field doc (untouched, original):** [../Partner Program Details.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/Partner%20Program%20Details.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A decision (even tentative) on which pathway(s) Stratos intends to pursue (Referral / Commercial / Services & Solutions / Technology).
- Whoever internally owns the actual `partners.glean.com` application.

**Sr No mapping:** Sr No 1-11 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Partner Program Details.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Program%20Details.md#claims-sr-no-1-11-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) or `Hard` (needs an actual application/partner-manager conversation) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the core structure directly — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Four pathways exist and multi-pathway participation is allowed; confirm this specific naming comes from the blog, and check whether the main partners page uses different terms | 1. Read `glean.com/blog/glean-partner-network` and confirm the four pathway names.<br>2. Separately read `glean.com/partners` and check whether it uses the same four pathway names or different language. | You confirm the pathway names and the content-location nuance research flagged. | | | ~10 min, Easy |
| 2 | Four ecosystem classifications are named on the main partners page | Open `glean.com/partners` and confirm the four classification names. | You confirm the classification names match research. | | | ~5 min, Easy |
| 3 | No join fee — confirm before applying | Confirm the "no fee" language on `glean.com/partners` before submitting any application. | You confirm no fee is required. | | | ~5 min, Easy |
| 4 | The 4-stage application process (Apply → Review fit → Onboard → Launch & grow) with 1-2 week review is real — confirm by actually applying | 1. Submit a real application at `partners.glean.com` for Stratos's chosen pathway.<br>2. Track the actual calendar time from submission to a response. | You get a real, timestamped confirmation of how long review actually took for your application. | | This is the field's central real-world test | ~30 min to apply + up to 2 weeks wait, Hard |

## Section 2 — Confirming the new benefits apply to your chosen pathway — Sr No 5-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The Build/Sell/Deliver/Operate/Innovate framework is real and relevant to understanding where Stratos's chosen pathway fits | Read the framework description on `glean.com/blog/glean-partner-network` and identify which of the five categories best matches Stratos's intended role. | You have a clear, documented answer for which category applies to your situation. | | | ~10 min, Easy |
| 6 | MDF/co-marketing funding is a real benefit available to Stratos's chosen pathway — confirm eligibility directly, since the blog doesn't specify which pathways qualify | Once in the portal (post-approval) or via your partner manager, ask directly: *"Does our specific pathway/tier qualify for MDF/co-marketing funds, and what's the process to request them?"* | You get a real, pathway-specific answer on MDF eligibility. | | | ~10 min active + wait for reply, Hard |
| 7 | Deal registration is genuinely automated, not just described that way in marketing copy | Once in the portal, actually register a test/real deal and observe whether the process is automated (instant confirmation, tracked status) vs. manual (email-based, delayed). | You confirm the automated claim firsthand. | | | ~15 min (post-portal-access), Hard |

## Section 3 — Resolving the two flagged discrepancies directly — Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | The accreditation count discrepancy (1,000+ at launch vs. 2,000+ later) needs a direct, current answer | Ask your Glean partner contact directly: *"What is the current total accreditation count across the partner network, and when was the 2,000+ figure as of?"* | You get a real, dated, current number, resolving the ambiguity. | | | ~5 min active + wait for reply, Easy |
| 9 | The partner-category count discrepancy (4 official vs. 6 in press coverage) needs a direct clarification | Ask the same contact: *"Are there officially four partner categories or six? How does 'private equity partners' (named in press coverage) fit into the four categories on your public site?"* | You get a clear, authoritative answer reconciling the two framings. | | | ~5 min active + wait for reply, Easy |

## Section 4 — Confirming current Partner Finder count and tier-name gap — Sr No 10-11

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | The Partner Finder directory shows roughly 120+ partners with no visible tier badges | Open `glean.com/partners/partner-finder` and do your own rough count/spot-check. | You confirm the approximate count and the absence of visible tier indicators. | | | ~10 min, Easy |
| 11 | Tier ladder names are only visible after portal login — confirm this directly once your application is approved | Once approved and logged into the Partner Portal, capture the actual tier name/level assigned to Stratos. | You get the real, previously-unavailable tier name, closing this confirmed gap. | | Depends on Sr No 4's approval completing first | ~5 min (post-approval), Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Partner Program Details.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Program%20Details.md), and specifically record the resolved accreditation-count and partner-category discrepancies (Sr No 8-9) and the real tier name once assigned (Sr No 11).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Core structure confirmed | 4 | | | | |
| 2. New benefits confirmed for chosen pathway | 3 | | | | |
| 3. Discrepancies resolved | 2 | | | | |
| 4. Partner Finder + tier-name gap | 2 | | | | |
