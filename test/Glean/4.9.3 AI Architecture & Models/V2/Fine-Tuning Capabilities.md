# 4.9.3 Fine-Tuning Capabilities — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Fine-Tuning Capabilities.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Fine-Tuning%20Capabilities.md). The core finding there is that "does Glean fine-tune on our data" has two opposite-sounding correct answers depending on which model you mean: the generative/answering model (no) versus the search-relevance/embedding model (yes, continuously). This guide's job is to confirm both halves hold true in a real tenant, and to make sure nobody on the team accidentally answers this field with just one half of the truth. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Assistant/Model settings (for the generative-model half) · your own observation of search quality over time (for the embedding-model half)
**Companion research doc:** [V2/Fine-Tuning Capabilities.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Fine-Tuning%20Capabilities.md)
**Base field doc (untouched, original):** [../Fine-Tuning Capabilities.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Fine-Tuning%20Capabilities.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- No special technical setup needed — most of this guide is document review plus asking your Glean account team direct written questions (their answers, in writing, are themselves the test evidence for several rows).
- For Sr No 4 and 5 (the "has search actually improved over time" checks): ideally a tenant that's been live for at least a few months, so there's something to compare against. A brand-new tenant can still do these rows, just note that as a limitation.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Fine-Tuning Capabilities.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Fine-Tuning%20Capabilities.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found or what answer you got. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine question/UI check, quick to judge) or `Hard` (needs a subjective quality judgment or a tenure-dependent comparison) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the generative (answering) model is NOT trained on your data — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's own answering/summarizing model is never trained or fine-tuned using your organization's documents or data | 1. Ask your Glean account team, in writing, this exact question: *"Can you confirm in writing that our organization's data is never used to train or fine-tune the generative model that produces Assistant/Chat answers?"*<br>2. Compare their written answer against the public documentation's own statement on this. | You receive a clear written confirmation matching the public documentation — that your data is not used to train or fine-tune the answer-generating model. | | | ~10 min active + wait for account-team reply, Easy |
| 2 | If you use your own OpenAI/Anthropic/Google/Amazon account (Customer Key) instead of Glean's own model, there is still no supported way to point Glean at a version of that provider's model that *you* fine-tuned yourself | 1. If your tenant uses a Customer Key setup, check the model configuration screens for any option to specify a custom/fine-tuned model deployment ID (as opposed to just a standard model name).<br>2. If nothing is found, ask your Glean account team directly whether bringing a self-fine-tuned model deployment is supported today. | You find no such option in the admin UI, and/or your account team confirms in writing that this isn't currently supported. | | If you don't use Customer Key at all, mark `Blocked (Universal Key tenant, not applicable)` | ~15 min, Easy |

## Section 2 — Confirming the search/embedding model DOES adapt to your organization's data — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Separately from the answering model, Glean maintains a distinct search-relevance model that is specifically adapted to your organization's own terminology and documents | 1. Ask your Glean account team, in writing: *"Do you build or fine-tune a search-relevance/embedding model specific to our organization, using our own documents and terminology?"*<br>2. Compare their answer against Glean's own public blog claim on this (cited in the research doc). | Your account team confirms, in writing, that yes — a per-organization search model exists and adapts to your specific terminology (matching the public blog claim), distinct from the answer-generating model in Sr No 1. | | | ~10 min active + wait for account-team reply, Easy |
| 4 | This adaptation happens automatically and continuously over time — there's no manual "retrain" button, schedule, or opt-out control for it | 1. Search the Admin Console thoroughly for any setting related to "retrain," "re-index for relevance," "model adaptation," or similar.<br>2. Ask your account team directly whether this process can be manually triggered, scheduled, paused, or opted out of. | You find no manual control for this in the admin UI, and your account team confirms it runs automatically/continuously with no customer-facing on/off switch. | | | ~15 min, Easy |

## Section 3 — Has search quality actually measurably improved over time in your own tenant? — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | If this continuous fine-tuning claim is real, a tenant that's been live longer should show noticeably better search relevance for company-specific terms (acronyms, project names) than it did when first launched | 1. If your tenant has been live for a while, ask a few long-tenured employees whether search results for internal acronyms/project names/jargon have noticeably improved since launch.<br>2. If you have access to any search-quality metrics/dashboard, check whether there's a visible upward trend over time.<br>3. If your tenant is brand new, skip the historical comparison and instead just test: search for a company-specific acronym or project code name today and judge whether the results already look tailored (vs. a generic, no-context result). | You find at least anecdotal or metric-based evidence that search relevance for company-specific language has improved over time (mature tenant), or that even a new tenant already returns contextually reasonable results for internal jargon (new tenant). | | This is a real-world plausibility check on the fine-tuning claim, not a strict pass/fail lab test — record what you actually observe, even if it's just anecdotal | ~20 min, Hard (subjective judgment, needs tenured employees or a mature tenant) |

## Section 4 — Making sure the team doesn't answer this field with only half the truth — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Anyone summarizing this field for a client needs to explicitly say "which model" — a one-line "No, we don't fine-tune on your data" or "Yes, we do" would both be misleading on their own | 1. Re-read the research doc's headline and Sr No 1-4 findings together.<br>2. Draft a one-paragraph plain-English answer to "does Glean fine-tune on our documents" that correctly covers **both** halves (generative model: no; search/embedding model: yes, continuously) without contradicting itself.<br>3. Have a colleague unfamiliar with this research read your paragraph and confirm it doesn't read as self-contradictory or confusing. | Your colleague understands, from your one paragraph alone, that there are two different models with two different (correct) answers — and doesn't come away thinking Glean either fully does or fully doesn't fine-tune on customer data. | | This is a communication/write-up quality check, not a technical test — but it's the row most likely to prevent a real client-facing mistake | ~20 min, Hard (writing + peer review) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Fine-Tuning Capabilities.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Fine-Tuning%20Capabilities.md), and paste in your account team's written answers from Sr No 1-4 verbatim — those written confirmations are the strongest evidence this field can have.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Generative model not trained on your data | 2 | | | | |
| 2. Search/embedding model adapts to your data | 2 | | | | |
| 3. Real-world plausibility check | 1 | | | | |
| 4. Write-up quality check | 1 | | | | |
