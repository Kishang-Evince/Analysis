# 4.9.12 Dependency Risk — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Dependency Risk.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Dependency%20Risk.md). The core finding there is two-layered: Glean's Model Hub architecture is genuinely multi-provider (reducing lock-in), but deployment/key-type choices and per-feature model pinning can silently re-introduce single-provider dependency, and there's a real, dated precedent (the April 2026 Claude Sonnet context-window retirement) proving the risk isn't theoretical. Most of this field's evidence is cross-referenced from this project's own prior `4.9.3` research, so most rows below re-verify those underlying claims; a couple of rows involve a live sandbox check or a fresh public-source check. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean sandbox (`app.glean.com`, admin console model-selection screens) for Sr No 4 and 6 if admin access is available; all other rows are doc cross-references or public-source checks.
**Companion research doc:** [V2/Dependency Risk.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Dependency%20Risk.md)
**Section overview:** [../../Overview.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/Overview.md)

**Prerequisites (what you need before starting):**
- Read access to `Glean/Combined/4.9.3 AI Architecture & Models/V2/` for the cross-reference rows.
- Admin console access to the Glean sandbox is helpful but not required for Sr No 4/6 (mark `Blocked` with a note if unavailable, and rely on the doc cross-reference instead).

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Dependency Risk.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Dependency%20Risk.md#claims-sr-no-1-8-mapped-to-test-guide) — same number, same claim, doc-sourced there / re-checked here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick doc/page check) or `Hard` (needs sandbox admin access or a search that may not resolve) — so you can plan which rows to tackle first.

---

## Section 1 — Re-verifying the multi-provider Model Hub breadth — Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Model Hub spans 40+ models across OpenAI/Google/Anthropic/Amazon plus smaller providers | Open `Glean/Combined/4.9.3 AI Architecture & Models/V2/Foundation Models Used.md` and confirm Sr No 1-6's provider/model breadth. | You confirm the claim and provider list match. | | | ~10 min, Easy |

## Section 2 — Re-verifying the dated breaking-change precedent — Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Anthropic's 1M-context retirement (Apr 30, 2026) is a real, documented breaking change | Open `docs.glean.com/release-notes/releases/2026-05-06-may-release` directly and confirm the exact quote about the beta header/context window. | You independently confirm the verbatim quote on the live page. | | | ~10 min, Easy |
| 3 | No proactive at-risk-agent detection tooling exists for this or any provider-forced change | Search Glean's docs/admin console (if accessible) for any "model deprecation impact" or "affected agents" audit feature; also re-check `4.9.3/V2/Model Agnosticism.md` Sr No 5. | You find no such tool anywhere, confirming the gap remains open as of your test date. | | If a new tool has since shipped, this would be a genuine update to research — note it | ~20 min, Hard |

## Section 3 — Live-checking the key-type provider-gating claim in the sandbox — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Anthropic models are unavailable on Glean's Universal Key, only via GCP/AWS Customer Key | If admin console access is available: open the model-selection/LLM administration screen and check which providers are listed as available under your tenant's actual key type. Otherwise, re-confirm via `docs.glean.com/administration/llm-key-feature-availability` directly. | You confirm the Universal-Key-excludes-Anthropic finding either live in your own tenant or via a fresh doc-page fetch. | | Mark `Blocked` with a note if you have neither sandbox admin access nor can reach the doc page | ~15 min (or Blocked), Hard |

## Section 4 — Re-verifying the cloud-provider coupling claim — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Vertex AI and Bedrock are each tied to only one Customer Key cloud type (GCP vs. AWS respectively) | Re-open `docs.glean.com/administration/llm-key-feature-availability` and confirm the Vertex AI / Bedrock availability matrix. | You confirm the matrix matches the claim. | | | ~10 min, Easy |

## Section 5 — Live-checking per-feature model pinning — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Deep Research, Agent Sandbox, agentic search, and real-time voice are each pinned to specific named minimum models | If admin console access is available: attempt to configure Deep Research or Agent Sandbox with a model below the documented minimum and observe whether it's blocked/unavailable. Otherwise, re-confirm via the doc page cited in research. | You confirm the pinning is enforced (sandbox) or documented (doc re-check). | | Mark `Blocked` with a note if sandbox access doesn't cover this admin area | ~20 min (or Blocked), Hard |

## Section 6 — Re-checking vendor company durability signals — Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Glean reports a $7.2B valuation and ~$300M ARR (as of the most recent coverage) | Open `glean.com/press` directly and find the Series F release; separately search for the most recent ARR coverage. | You independently confirm both figures from primary or reputable secondary sources, noting the publication date of whatever you find. | | Reuse the same check from the companion `Customer Retention Signals.md` guide (Sr No 8) rather than duplicating it | ~10 min, Easy |

## Section 7 — Confirming no published dependency-risk framework exists — Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | No Glean-published document addresses model/cloud-provider dependency risk as its own topic (unlike the API deprecation list, which does exist) | Open `developers.glean.com/deprecations` to confirm it covers APIs only; separately search for any Glean "dependency risk" or "vendor lock-in" page. | You confirm the API deprecation list exists but covers APIs only, and no broader dependency-risk document exists anywhere. | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Dependency Risk.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Dependency%20Risk.md), and specifically flag Sr No 3/4/6 if sandbox admin access allowed a genuinely live (not just doc-cross-referenced) confirmation.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Multi-provider breadth | 1 | | | | |
| 2. Dated precedent + tooling gap | 2 | | | | |
| 3. Key-type gating (sandbox) | 1 | | | | |
| 4. Cloud-provider coupling | 1 | | | | |
| 5. Per-feature model pinning (sandbox) | 1 | | | | |
| 6. Vendor durability | 1 | | | | |
| 7. No dependency-risk framework | 1 | | | | |
