# 4.9.12 Platform vs. Point Solution — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Platform vs. Point Solution.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Platform%20vs.%20Point%20Solution.md). This field is explicitly analytical/synthesis-based — the research doc's conclusion (Glean is clearly expanding into a platform, not deepening a point solution) is built almost entirely by cross-referencing this project's own prior confirmed research across 4.9.1, 4.9.3, 4.9.4, 4.9.9, and 4.9.10, rather than net-new vendor-document research. Accordingly, most rows below are **re-verification of those underlying prior claims** (open the cited prior field doc and confirm the cross-reference is accurate) rather than fresh `app.glean.com` sandbox tests — a few rows do involve a quick live site check. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean sandbox (`app.glean.com`) only for Sr No 1 (a quick live-site structure check); all other rows are cross-references to this project's own prior research docs.
**Companion research doc:** [V2/Platform vs. Point Solution.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Platform%20vs.%20Point%20Solution.md)
**Section overview:** [../../Overview.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/Overview.md)

**Prerequisites (what you need before starting):**
- Read access to this project's own prior V2 field docs in `Glean/Combined/4.9.1`, `4.9.3`, `4.9.4`, `4.9.9`, `4.9.10`.
- Public internet access for the one live-site row (Sr No 1).

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Platform vs. Point Solution.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Platform%20vs.%20Point%20Solution.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / re-checked here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick doc check) or `Hard` (needs reading a longer prior field doc carefully) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the multi-pillar platform site structure — Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's own site is structured around distinct platform pillars (Search, Assistant, Agent Builder, AI Gateway, Model Hub, Security), not a single-product page | Open `glean.com/platform` directly and note the distinct sub-sections/pages linked from it. | You confirm at least 5-6 distinct named platform pillars are presented as separate pages/sections. | | | ~15 min, Easy |

## Section 2 — Re-verifying the feature-breadth cross-reference — Sr No 2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | This project's own `4.9.1/V2/Features Confirmed.md` independently confirms 62+ distinct named capabilities spanning search, generative, agentic, security, and admin | Open `Glean/Combined/4.9.1 Functional Capabilities/V2/Features Confirmed.md` and confirm the table runs to at least Sr No 62 with the claimed breadth of categories. | You confirm the row count and category breadth match. | | | ~15 min, Easy |

## Section 3 — Re-verifying the Agent Identity and MCP/A2A cross-references — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Agent Identity spans 19+ named service integrations, per `4.9.10/V2/Implementation Complexity.md` | Open `Glean/Combined/4.9.10.../V2/Implementation Complexity.md` and confirm Sr No 5's 19+ integration claim. | You confirm the claim and figure match. | | | ~10 min, Easy |
| 4 | MCP directory grew 17→48 templates and A2A protocol is separately supported, per `4.9.4/V2/API Depth & Writeback.md` and `API Architecture Type.md` | Open both cited `4.9.4` files and confirm the MCP-growth and A2A-support claims. | You confirm both claims and figures match. | | | ~15 min, Easy |

## Section 4 — Re-verifying the Memory/Projects platform-primitive claim — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Persistent Memory and Projects (replacing, deprecating Collections) are net-new platform primitives, per `4.9.3/V2/Context Window & Memory.md` and `4.9.1/V2/Features Confirmed.md` | Open both cited files and confirm the Memory and Projects claims, including the "Collections marked Deprecated" detail. | You confirm both claims match, including the deprecation detail. | | This deprecation detail is the single strongest piece of evidence in the whole field — worth double-checking carefully | ~15 min, Easy |

## Section 5 — Re-checking the multi-category Gartner listing — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Glean is independently rated across 3 distinct Gartner Peer Insights market categories | Cross-check against the companion `Customer Retention Signals.md` test guide's Section 2 results (Sr No 3-5) — do not re-run the same search twice. | You confirm 3 distinct market categories were found in that companion guide. | | Reuse the other test guide's result rather than duplicating the Gartner check | ~5 min, Easy |

## Section 6 — Sanity-checking the two-sided long-term-fit tradeoff — Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Platform breadth creates proportionally more governance burden, per prior per-feature model-pinning and provider-availability findings in `4.9.3/V2/Foundation Models Used.md` and `Model Agnosticism.md` | Open both cited files and confirm the per-feature model-pinning (Sr No 7-8) and no-audit-tooling (Sr No 3, 5) claims. | You confirm both claims match, supporting the "breadth cuts both ways" conclusion. | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Platform vs. Point Solution.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Platform%20vs.%20Point%20Solution.md).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Platform site structure | 1 | | | | |
| 2. Feature-breadth cross-reference | 1 | | | | |
| 3. Agent Identity / MCP-A2A cross-reference | 2 | | | | |
| 4. Memory/Projects primitive cross-reference | 1 | | | | |
| 5. Multi-category Gartner listing | 1 | | | | |
| 6. Governance-burden tradeoff cross-reference | 1 | | | | |
