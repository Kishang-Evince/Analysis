**Glean Tier 3 Advanced Evaluation**
**Data Leakage Protections — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `www.glean.com` and third-party press coverage. Field definition: "Privacy controls preventing tenant data from entering general vendor model training loops." Base file at [`../Data Leakage Protections.md`](../Data%20Leakage%20Protections.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/Data Leakage Protections.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Data%20Leakage%20Protections.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

There is real, credible evidence Glean actively pursues no-training guarantees from at least one major model provider (OpenAI) — but the strongest evidence for this is a **press-reported executive statement, not Glean's own formal legal documentation**. Glean's public Privacy Policy and its subprocessor list — the two documents a customer would actually check — contain **no explicit language at all** about AI training, model improvement, or opt-out. The real, binding protection appears to live in the customer-specific DPA/order form, not in any publicly-verifiable document.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean publishes a complete, dated subprocessor list naming 20 entities — but the list itself makes no statement about whether any of them use customer data for training | [www.glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) | Named LLM-provider subprocessors alone: AWS, Google, Microsoft, Anthropic, OpenAI, Snowflake, Baseten, Fireworks.ai, Groq, Modal Labs (plus non-LLM subprocessors: Palo Alto Networks, Twilio, Salesforce, Slack, Zendesk, SendGrid, Intercom, Brave, Deepgram, Exa Labs, and Glean's own India affiliate). Checked every row: *"The document contains no statements regarding whether any subprocessor uses customer data for model training."* |
| 2 | Glean's own public Privacy Policy — the primary customer-facing legal document — contains no explicit language addressing AI/ML training, model improvement, or training opt-out at all | [www.glean.com/privacy](https://www.glean.com/privacy) | Checked thoroughly: policy covers data collection, business-purpose use, sharing with service providers, retention, and security — but *"there is no mention of: AI or machine learning training, Model development or improvement, Language model fine-tuning, Opt-out provisions for training purposes."* The closest language (*"Fulfill other legitimate business purposes permitted by applicable law"*) is too generic to constitute a training-specific commitment. |
| 3 | Glean's own CISO has gone on record, by name, stating that OpenAI's no-training commitment gives Glean confidence to build on its models — real evidence of active reliance on provider-side guarantees | Press-reported, paraphrased — [thenextweb.com](https://thenextweb.com/news/openai-zero-data-retention-private-safety-processing) | *"Sunil Agrawal, Glean's chief information security officer... OpenAI's no-training commitment and ZDR give his firm the confidence to build on the models."* **Confidence caveat:** this is a paraphrase in press coverage of a named Glean executive, not a direct quote from a first-party Glean document — real and specific, but a different evidentiary tier than a DPA clause or privacy-policy statement. |
| 4 | Glean was specifically named as one of a small group of early customers OpenAI worked with while developing its Zero Data Retention (ZDR) / Private Safety Processing capability | Press-reported — [thenextweb.com](https://thenextweb.com/news/openai-zero-data-retention-private-safety-processing) | *"Companies named in the announcement as having given feedback during development include Glean, Databricks, Abridge, and Microsoft."* This is a specific, checkable partnership claim, not generic marketing language about "enterprise customers." |
| 5 | Zero Data Retention, as reported, means OpenAI does not keep prompts or completions after processing a request — even for safety screening, only an abstracted signal is retained, not the actual content | Press-reported — [thenextweb.com](https://thenextweb.com/news/openai-zero-data-retention-private-safety-processing) | *"OpenAI does not keep their prompts or model responses once it has processed a request."* For safety review specifically: *"OpenAI receives what it calls a narrowly defined signal, naming the type of activity involved"* — not the underlying content itself. |
| 6 | This no-training/ZDR assurance is provider-specific and not uniform across Glean's model catalog — Anthropic's own policy reportedly carves out an exception for its newest frontier models with no enterprise opt-out | Third-party reporting synthesized from search results (not a Glean-issued statement) | General Anthropic enterprise/API policy: ZDR available for qualifying customers, with default API log retention recently reduced from 30 to 7 days. **Caveat found:** newer *"Mythos-class"* frontier models reportedly required 30-day prompt/output retention *"for trust and safety purposes, with no opt-out available to enterprise customers."* **This is not a Glean-specific finding** — it describes Anthropic's own policy — but it matters directly to any Glean tenant whose model routing includes Anthropic's newest models, since Glean's own docs (checked in claims 1-2) say nothing about reconciling this with its own data-leakage posture. |
| 7 | No source checked — subprocessor list, privacy policy, or model documentation — describes a standing, Glean-issued contractual guarantee equivalent to "training opt-out" that applies uniformly regardless of which model/provider a tenant uses | Absence checked across claims 1-2, 6, and [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | The actual protection level appears to be inherited per-provider (OpenAI's ZDR, Anthropic's mixed policy per claim 6) rather than guaranteed by a single, uniform Glean-level policy layer stated anywhere publicly checked this pass. |
| 8 | The generic guidance found for confirming actual contractual protection is to check the customer's own order form/DPA directly — not to rely on public documentation | Search-synthesized guidance, consistent with this project's own established pattern for DPA-dependent fields | *"Validate residency, sub-processor lists, and retention in your order form or DPA."* Consistent with the pattern already established in the Fine-Tuning Capabilities field: the reliable answer for a specific tenant requires a direct, written confirmation from Glean's account/legal team referencing that tenant's actual signed DPA — not an inference from public marketing or press coverage. |

## Independent read

- Claim 3's evidentiary weight matters for how this gets cited: a named CISO's paraphrased press statement is meaningfully more credible than generic marketing copy, but it is not the same as a clause in a signed DPA. Both should be distinguished clearly in any client-facing write-up.
- Claim 2 is the sharpest, most checkable finding here: a customer relying solely on Glean's public Privacy Policy to answer "is my data used for AI training" would find **no answer at all** in that document — a real gap between what's publicly documented and what's apparently true in practice (per claim 3-5's press evidence).
- Claim 6 is important scope-setting: even if OpenAI's ZDR is airtight, a tenant's actual protection depends on which model is actually serving their queries at any given time — and per the Model Agnosticism field's findings, that can change (model swaps, provider-side retirements) without necessarily being flagged to the customer.

## Confidence

**Doc-Verified** for claims 1-2, 7 (direct checks of Glean's own public legal pages, confirming an absence). **Press-reported / vendor-executive-stated** for claims 3-5 (named individual, credible outlet, but not a first-party Glean legal document). **Third-party market context, not Glean-specific** for claim 6. Validation date 2026-09-09. Tenant-specific verification (the actual DPA) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Subprocessor list training disclosure | Absent — 20 subprocessors named, zero training statements | 1 |
| Privacy policy training disclosure | Absent — no AI/ML training language found at all | 2 |
| Evidence Glean pursues no-training terms | Yes — named CISO quote, press-reported | 3-4 |
| What OpenAI ZDR actually guarantees | No prompt/completion retention post-processing; abstracted safety signal only | 5 |
| Uniform across all providers? | No — Anthropic's newest models reportedly carry a no-opt-out retention exception | 6 |
| Uniform Glean-level training-opt-out policy found? | Not found — protection appears inherited per-provider | 7 |
| Where the real answer lives | Customer's own signed DPA/order form — not public docs | 8 |
