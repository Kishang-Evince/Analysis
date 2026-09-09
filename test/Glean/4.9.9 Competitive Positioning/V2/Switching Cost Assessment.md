# 4.9.9 Switching Cost Assessment — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Switching Cost Assessment.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Switching%20Cost%20Assessment.md). The core finding there connects this field's "data deletion on termination" contract-checklist item to a real, already-confirmed legal tension: the Terms of Service promise automatic deletion, but the DPA requires a written request for Personal Data specifically. This guide's job is to get that tension resolved directly in writing before any client relies on "automatic deletion" as a switching-cost assumption. Written so someone with no prior context on this project can pick it up and run it — mostly document review and one direct legal/account-team question.

**Tenant entry:** Both comparison articles · the actual signed Glean ToS/DPA (or the public templates already read in this project's 4.9.5 research) · your Glean account/legal contact
**Companion research doc:** [V2/Switching Cost Assessment.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Switching%20Cost%20Assessment.md)
**Base field doc (untouched, original):** [../Switching Cost Assessment.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Switching%20Cost%20Assessment.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Access to (or awareness of) this project's 4.9.5 Data Retention & Disposal V2 field's findings.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Switching Cost Assessment.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Switching%20Cost%20Assessment.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) or `Hard` (needs a written legal/account-team answer) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the exact quotes and the scope correction — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The exact "infrastructure decision, not a six-month migration" quote matches the live page | Open the Claude-Enterprise comparison article and confirm the exact wording. | You independently confirm it. | | | ~10 min, Easy |
| 2 | The Claude Enterprise contrast (single-model = higher switching cost) is confirmed | Confirm this argument's presence on the same article. | You independently confirm it. | | | ~0 min extra, Easy |
| 3 | The Model Hub routing + constant-context-layer language matches the OpenAI-integration article | Open that article and confirm the exact wording. | You independently confirm it. | | | ~10 min, Easy |
| 4 | The OpenAI-integration article does NOT make a direct ChatGPT Enterprise comparison — confirm this scope limitation | Read the article fully and confirm no direct ChatGPT Enterprise lock-in comparison exists. | You confirm the scope correction, preventing a future citation error. | | | ~5 min, Easy |

## Section 2 — Resolving the data-deletion discrepancy in writing — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The ToS-vs-DPA data-deletion discrepancy needs a direct, written resolution before any client should rely on "automatic deletion" as a switching-cost assumption | Ask your Glean account team or legal contact directly, in writing: *"Upon termination, is Customer Personal Data automatically deleted per the ToS, or does it require a written erasure request per the DPA? Please confirm the actual process and timeline."* | You get a clear, written, authoritative answer resolving the discrepancy for real exit planning. | | This is the single most important row in this guide | ~10 min active + wait for reply, Hard |

## Section 3 — Reconfirming the platform-lock-in asset catalog — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The platform-lock-in asset catalog (index, agents, Go Links, Protect rules, FlexCredit commitments) remains accurate | Do the actual pilot asset inventory exercise from the base test guide (agent count, Go Links, Answers, connector configs, Protect rules) and confirm each maps to a real, already-confirmed lock-in mechanism. | You get a real, current inventory ready to inform an actual exit-cost estimate if needed. | | | ~30 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Switching Cost Assessment.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Switching%20Cost%20Assessment.md), and specifically record the written answer on the data-deletion discrepancy (Sr No 5) — that is this field's most consequential, actionable deliverable.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Quotes + scope correction confirmed | 4 | | | | |
| 2. Data-deletion discrepancy resolved in writing | 1 | | | | |
| 3. Lock-in asset catalog reconfirmed | 1 | | | | |
