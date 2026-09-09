# 4.9.3 Foundation Models Used - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Foundation Models Used.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Foundation%20Models%20Used.md). All claims there are doc-sourced only, publicly readable, no login - this guide upgrades each claim to `Tested` against a live tenant. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` → Admin Console → Platform → Models (Model Hub)
**Companion research doc:** [V2/Foundation Models Used.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Foundation%20Models%20Used.md)
**Base field doc (untouched, original):** [../Foundation Models Used.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Foundation%20Models%20Used.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**

- Admin or Super Admin access to the Glean Admin Console (regular member access won't show the Model Hub).
- Knowing which "key type" your tenant uses - Glean Universal Key, a GCP Customer Key, or an AWS Customer Key. If you don't know, ask whoever manages the Glean contract/infrastructure before starting Sr No 7-9.
- Access to at least one feature that uses a specific named model requirement, if you want to test Sr No 8 live (e.g. Deep Research, Agent Sandbox, or agentic search - whichever your tenant has enabled).

**Sr No mapping:** Sr No 1-11 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Foundation Models Used.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Foundation%20Models%20Used.md#claims-sr-no-1-11-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you saw. "Pass" means you personally observed it in your own tenant - not that the public docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs extra setup, account-team contact, or careful attempted misconfiguration) - so you can plan which rows to tackle first.

---

## Section 1 - How big and how varied is the model catalog, really? - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's Model Hub actually lists 40+ distinct models from a mix of open and proprietary sources, not just a marketing number | 1. Log in as Admin.<br>2. Go to **Admin Console → Platform → Models** (name may vary slightly - look for "Model Hub").<br>3. Scroll/count through the full list of models shown. | You can count roughly 40 or more distinct model entries in your own tenant's Model Hub - not just 3-4 big-name options. | | If your tenant's list is much shorter, note the real count - the tenant may have some models disabled by policy | ~10 min, Easy |

## Section 2 - Are the actual model names/versions visible, not just provider names? - Sr No 2-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Specific OpenAI model names (like "GPT-5.1") are shown, not just "OpenAI" as a generic label | In the Model Hub list from Sr No 1, find the OpenAI section/provider group and read the individual model names listed under it. | You see specific named models (e.g. something like "GPT-4.1," "GPT-5.x," or similar exact version names) rather than a single generic "OpenAI" entry. | | | ~5 min, Easy |
| 3 | Specific Google Gemini model names are shown the same way | Same as Sr No 2, but for the Google/Gemini provider group. | You see specific named Gemini versions (e.g. "Gemini 3.x Flash," "Gemini 3.x Pro") rather than a single generic "Google" entry. | | | ~5 min, Easy |
| 4 | Specific Anthropic Claude model names are shown the same way | Same as Sr No 2, but for the Anthropic/Claude provider group. **Note:** if your tenant uses Glean's Universal Key, this group may not appear at all - see Sr No 7 before assuming this is a failure. | You see specific named Claude versions (e.g. "Claude Sonnet," "Claude Opus," with version numbers) rather than a single generic "Anthropic" entry - OR you confirm Claude is absent specifically because of the Universal Key limitation (which is itself a Pass for Sr No 7, not a Fail here). | | | ~5 min, Easy |
| 5 | Other, smaller providers beyond the "big 3" also appear by name (e.g. Amazon, or smaller inference providers) | Scroll through the rest of the Model Hub list looking for anything other than OpenAI/Google/Anthropic. | You find at least one additional named provider/model (e.g. an Amazon model, or a smaller inference-provider model). | | | ~5 min, Easy |
| 6 | Glean's own in-house model appears in this same list, not hidden away separately | Look through the same Model Hub list for any entry that is Glean's own proprietary model rather than a third-party one (may be labeled distinctly, e.g. as Glean's own name for it). | You find Glean's own proprietary model listed as a normal entry in the same catalog view as the third-party models - not walled off in a separate screen. | | | ~5 min, Easy |

## Section 3 - Does which provider you can use depend on your deployment type? - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Which providers are available to you depends on whether your tenant uses Glean's Universal Key, a GCP Customer Key, or an AWS Customer Key - and specifically, Anthropic/Claude models are NOT available at all on the Universal Key | 1. Find out (ask your Glean admin/account contact if unsure) which key type your tenant uses.<br>2. If Universal Key: check whether any Anthropic/Claude models appear in your Model Hub at all.<br>3. If GCP or AWS Customer Key: check whether Anthropic/Claude models appear. | If your tenant is on the Universal Key, you should find **no** Anthropic/Claude models available. If your tenant is on a GCP or AWS Customer Key, Anthropic/Claude models should be available. Either outcome matching this pattern is a Pass. | | This is a genuine limitation worth confirming directly - it affects any client with an Anthropic-specific requirement | ~15 min, Easy (mostly asking + checking a screen) |

## Section 4 - Are certain features locked to certain specific models? - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | Certain Glean features require a specific named minimum model version to work at all - it's not "any model will do" | 1. Pick one feature your tenant has enabled that's known to require a specific model (e.g. Deep Research, Agent Sandbox, or agentic search - check the research doc's Sr No 8 row for which model each needs).<br>2. In the Model Hub or that feature's settings, try to see which model is actually configured/required for it.<br>3. If possible, try switching the underlying model to something below the stated minimum and see if the feature blocks you or warns you. | The admin interface either shows you the specific required minimum model for that feature, or actively prevents/warns you when you try to assign an insufficient model to it. | | | ~25 min, Hard (needs deliberate misconfiguration attempt) |
| 9 | If your tenant uses a Customer Key (GCP or AWS, not Universal), all 4 model "roles" (large, small, agentic, fast-agentic) must come from the same single provider - you can't mix providers across those roles | 1. Confirm your tenant uses a Customer Key (skip this row entirely if Universal Key - mark `Blocked (Universal Key tenant)`).<br>2. In Model Hub settings, try to set the "large" model default to one provider (e.g. OpenAI) and the "agentic" model default to a different provider (e.g. Google).<br>3. See if the system allows this mixed configuration or blocks/warns you. | The system blocks or warns against mixing providers across those 4 roles when on a Customer Key - confirming the same-provider requirement. | | | ~20 min, Hard (Customer Key tenants only) |

## Section 5 - Can an admin control which models end users actually see? - Sr No 10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | An admin can restrict end users to a subset of models, and can keep newer models in a limited/beta rollout instead of exposing them to everyone immediately | 1. In Model Hub admin settings, look for per-model visibility/rollout controls (e.g. "enabled for all users," "beta," "limited rollout").<br>2. Try toggling one model's visibility setting.<br>3. Log in (or ask a colleague to log in) as a regular, non-admin user and check whether that model now does/doesn't appear as a chat option for them. | The regular user's available model list changes to reflect exactly what you configured as Admin - proving the restriction is enforced, not just a cosmetic admin-side label. | | | ~20 min, Hard (needs a second user login to verify) |

## Section 6 - Is there one clear screen showing exactly which model powers each feature right now? (closing a real documentation gap) - Sr No 11

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 11 | There is no single admin dashboard/report that clearly lists "this exact model is currently live for this exact feature" across the whole tenant - you'd have to check each feature's settings individually | 1. Look through the entire Admin Console for anything resembling a single consolidated view of "active model per feature."<br>2. If you find nothing consolidated, instead check 3-4 different features individually (e.g. Chat, Agent Builder, Deep Research) and note whether each requires a separate settings screen to see its current model. | Either you confirm no single consolidated view exists (matching the research finding), or you find one (which would contradict the research finding - note exactly where it is and what it's called if so). | | | ~20 min, Easy (thorough click-through, no special setup) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Foundation Models Used.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Foundation%20Models%20Used.md): for each `Pass` row, append `+ Tested (tenant, 2026-XX-XX)` to that claim's Detail cell; for anything else, add a short note on what blocked it or what actually happened instead.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Catalog size | 1 | | | | |
| 2. Named models by provider | 5 | | | | |
| 3. Key-type-dependent availability | 1 | | | | |
| 4. Feature-to-model pinning | 2 | | | | |
| 5. Admin control over end-user visibility | 1 | | | | |
| 6. Consolidated view gap | 1 | | | | |
