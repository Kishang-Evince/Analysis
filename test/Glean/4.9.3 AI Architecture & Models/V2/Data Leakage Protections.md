# 4.9.3 Data Leakage Protections — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Data Leakage Protections.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Data%20Leakage%20Protections.md). The core finding there is a real gap between public documentation and reported practice: Glean's own Privacy Policy and subprocessor list say nothing about AI training at all, while press coverage names Glean's CISO on the record about relying on OpenAI's no-training commitment. This guide's job is to get the actual binding answer — from your own signed contract, not from public pages. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Your organization's actual signed DPA/order form with Glean (ask legal/procurement if you don't have a copy) · `www.glean.com/privacy` and `www.glean.com/legal/subprocessors` for the public-document checks
**Companion research doc:** [V2/Data Leakage Protections.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Data%20Leakage%20Protections.md)
**Base field doc (untouched, original):** [../Data Leakage Protections.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Data%20Leakage%20Protections.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A copy of your organization's actual signed Data Processing Agreement (DPA) and order form with Glean — this is the single most important document for this field. Ask legal/procurement/whoever manages the Glean contract if you don't already have it.
- No admin console access needed for most rows — this is primarily a legal-document review guide, plus direct questions to your Glean account team.
- Knowing which model provider(s) your tenant actually uses (from earlier fields' research) — relevant for Sr No 6.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Data Leakage Protections.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Data%20Leakage%20Protections.md#claims-sr-no-1-8-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine document read, quick to judge) or `Hard` (needs legal-document access or a written account-team answer) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the public documents really say nothing about training — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The public subprocessor list names 20 entities but says nothing about any of them using customer data for training | 1. Open `www.glean.com/legal/subprocessors` yourself.<br>2. Read every row.<br>3. Confirm there's no column, footnote, or statement anywhere about training-data use. | You find the full subprocessor list with no training-related statement anywhere on the page. | | | ~10 min, Easy |
| 2 | The public Privacy Policy contains no explicit language about AI/ML training, model improvement, or training opt-out | 1. Open `www.glean.com/privacy` yourself.<br>2. Search the page (Ctrl+F) for "train," "training," "model," "machine learning," "AI."<br>3. Read the surrounding context of any hits found. | You find no clause specifically addressing AI training use of customer data — only generic business-purpose language, if anything. | | | ~15 min, Easy |

## Section 2 — Confirming the reported OpenAI relationship, and what it actually promises — Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Glean's CISO has publicly commented on relying on OpenAI's no-training commitment — this is a real, findable press statement, not a rumor | 1. Search for the press coverage of OpenAI's Zero Data Retention announcement naming Glean.<br>2. Confirm the CISO's name (Sunil Agrawal) and the substance of the statement attributed to him. | You independently find this press coverage and confirm the named individual and statement match the research doc. | | | ~15 min, Easy |
| 4 | Glean is specifically named as an early customer OpenAI worked with on this capability — not just generically mentioned as "a customer" | 1. In the same press coverage, confirm Glean is named alongside specific other companies (e.g. Databricks, Abridge, Microsoft), not just referenced vaguely. | You confirm Glean is named specifically, alongside other named companies. | | | ~10 min, Easy |
| 5 | Zero Data Retention, per this reporting, means prompts/completions are deleted after processing — even safety screening only sees an abstracted signal, not your actual content | 1. Re-read the technical description of ZDR in the same press coverage.<br>2. Confirm whether it states content is retained even briefly for safety review, or only an abstracted flag. | You confirm the reporting states only an abstracted signal is retained for safety purposes, not the actual prompt/completion content. | | | ~10 min, Easy |

## Section 3 — Is this protection uniform across every model your tenant might use? — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | If your tenant uses Anthropic's newest ("frontier"/Mythos-class) models, the no-opt-out 30-day retention exception reportedly applies — this is Anthropic's own policy, not something Glean controls or discloses | 1. Confirm which Anthropic model(s), if any, your tenant actually uses (from earlier Foundation Models Used research).<br>2. If using a newest-generation Anthropic model, ask your Glean account team directly whether the retention exception described in research applies to your tenant's usage.<br>3. If your tenant doesn't use Anthropic models at all, mark `Blocked (Anthropic not in use)`. | You get a direct, written answer on whether this exception applies to your actual usage — closing a real ambiguity the public research couldn't resolve on its own. | | | ~15 min active + wait for account-team reply, Hard |

## Section 4 — Getting the real, binding answer from your own contract — Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | No public Glean document promises a uniform, Glean-level "no training on your data, period" guarantee across every provider — the actual protection depends on which provider serves your queries | 1. With your actual signed DPA/order form in hand, search it for any clause addressing AI model training, data use restrictions, or subprocessor training prohibitions.<br>2. Compare what you find (or don't find) against the public-document gap confirmed in Sr No 1-2. | You either find a specific, binding clause in your own DPA that closes this gap (a genuinely useful finding to report), or you confirm the DPA is similarly silent/generic, matching the public-document pattern. | | This is the single most valuable row in this entire field — your actual contract is the real source of truth | ~30 min, Hard (needs legal-document access and careful reading) |
| 8 | The reliable way to get a binding answer for your specific tenant is a direct written confirmation from Glean's account/legal team referencing your actual DPA — not an inference from public marketing or press coverage | 1. Ask your Glean account team, in writing: *"Can you point us to the specific clause in our DPA/order form that addresses whether our data is used to train any model, including third-party provider models?"*<br>2. Record their answer, including which specific document/section they cite. | You receive a specific, written answer citing your actual contractual language — not a generic reassurance. | | | ~10 min active + wait for account-team reply, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Data Leakage Protections.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Data%20Leakage%20Protections.md). Sr No 7-8's actual contractual findings are the most valuable output this guide can produce — record the exact clause/section cited, verbatim.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Public documents confirmed silent on training | 2 | | | | |
| 2. OpenAI ZDR relationship + technical guarantee | 3 | | | | |
| 3. Anthropic exception applicability check | 1 | | | | |
| 4. Real contractual answer (DPA review) | 2 | | | | |
