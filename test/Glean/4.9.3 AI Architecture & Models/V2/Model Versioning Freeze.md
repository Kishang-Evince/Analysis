# 4.9.3 Model Versioning Freeze - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Model Versioning Freeze.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Versioning%20Freeze.md). The core finding there is that no exact-dated-version-pinning control was found anywhere - instead, Glean appears to actively migrate tenants off older models on its own schedule. One source (the Gemini 2.5 rerouting date) could not be directly confirmed and needs live re-verification. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → Models (Model Hub) · `docs.glean.com/release-notes/sunset/` for the retirement-tracker check
**Companion research doc:** [V2/Model Versioning Freeze.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Versioning%20Freeze.md)
**Base field doc (untouched, original):** [../Model Versioning Freeze.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Model%20Versioning%20Freeze.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console and its Model Hub.
- No special technical setup needed - this is mostly a UI search-for-absence exercise plus a couple of document checks.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Model Versioning Freeze.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Versioning%20Freeze.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI/document search, quick to judge) or `Hard` (needs careful confirmation of a specific date/detail) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming there's no exact-version-pinning control anywhere in the admin UI - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Nowhere in the Model Hub or agent/step model settings can you pin one exact dated model release (like a specific date-stamped snapshot) so it never changes | 1. Go through every model-related settings screen in Admin Console (Model Hub, per-agent, per-step model selectors).<br>2. Look specifically for a way to select a dated/versioned snapshot rather than just a named model. | You find only named model options (e.g. "GPT-5.4") with no dated-snapshot pinning field anywhere. | | | ~15 min, Easy |
| 2 | The model picker inside a chat conversation only affects that conversation, not a permanent org-wide setting | 1. Open a chat conversation, pick a specific model from its picker.<br>2. Start a brand-new conversation and check whether that same model is still selected by default, or whether it reset. | The new conversation does not inherit your prior session's model pick as a new permanent org default. | | Same underlying test as the Model Agnosticism guide's Sr No 2 - reuse if already run | ~10 min, Easy (or ~0 min if reused) |
| 3 | The admin's real control is enabling/disabling or beta-gating which models are available - not locking a specific version | 1. In Model Hub admin settings, review what controls actually exist per model (enable/disable, beta/limited rollout toggle, etc).<br>2. Confirm none of these controls freeze a model at its current dated release. | You confirm the available controls are all about availability/rollout, not version-locking. | | | ~15 min, Easy |

## Section 2 - Confirming a real retirement-notice page exists, and checking its current live content - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Glean maintains a dedicated retirement/sunset page listing specific capabilities and dates - distinct from the API-only deprecations page found in earlier research | 1. Open `docs.glean.com/release-notes/sunset/` yourself.<br>2. Confirm it lists specific retiring capabilities with dates (research found *"Agentic Engine V1 (Customer Key: Gemini)"* retiring Feb 15, 2026 as one example).<br>3. Check whether that specific entry is still listed, or whether it's since passed and been removed/updated. | You confirm this page exists and genuinely lists dated retirement entries - and note whether the specific example from research is still current. | | | ~10 min, Easy |

## Section 3 - Closing the verification gap: does the Gemini 2.5 rerouting date check out? - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean reportedly plans to stop routing to Gemini 2.5 models on October 6, 2026, ahead of Google's own later retirement date - **this needs live re-verification since it was only found via search summaries, not a directly-loaded page** | 1. Check the sunset page from Sr No 4, plus Glean's general release notes (`docs.glean.com/release-notes/`), for any entry mentioning Gemini 2.5 and an October 2026 date.<br>2. If your tenant uses Gemini via Vertex AI, ask your Glean account team directly whether this rerouting date and replacement models (Gemini 3.1 Pro, 3.7 Flash, 3.5 Flash Lite) are accurate for your deployment. | You either find this documented directly on a live Glean page (upgrading the research's confidence tier), or your account team confirms/corrects the specific date and replacement models. | | This is the priority row in this guide - it closes a flagged research gap | ~20 min, Easy (page search) + wait for account-team reply if needed |
| 6 | If confirmed, this would be the third documented case (after GPT-4.1's auto-expansion and Claude Sonnet's context-window retirement) of Glean changing tenant model behavior on its own schedule, without a customer opt-out | 1. Once Sr No 5 is resolved, compare it against the two other precedents already established in this research effort (GPT-4.1 context expansion, Claude Sonnet 1M retirement).<br>2. Confirm whether the Gemini case follows the same pattern: automatic change, advance notice given, no permanent opt-out offered. | You confirm (or correct) whether this is genuinely a third instance of the same pattern. | | | ~10 min, Easy |

## Section 4 - Final sanity check: does anything resembling true version-freeze exist anywhere? - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | After all the above checks, no mechanism anywhere in the product matches the field's own definition - pinning to one exact, permanently-fixed model release | 1. Having completed Sr No 1-6, do one final pass: ask your Glean account team directly, in writing: *"Is there any way, today or on your roadmap, to pin an agent or the whole tenant to one exact dated model version permanently, immune to future auto-migrations?"* | You get a definitive written answer - either confirming no such capability exists (matching research), or revealing one that should update the research doc. | | | ~10 min active + wait for account-team reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Model Versioning Freeze.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Versioning%20Freeze.md). Sr No 5 is the priority - it closes this doc's one flagged confidence gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. No version-pinning control found | 3 | | | | |
| 2. Real retirement-notice page confirmed | 1 | | | | |
| 3. Gemini rerouting precedent (closes research gap) | 2 | | | | |
| 4. Final confirmation from account team | 1 | | | | |
