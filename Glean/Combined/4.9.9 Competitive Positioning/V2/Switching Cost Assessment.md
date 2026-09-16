**Glean Tier 3 Advanced Evaluation**
**Switching Cost Assessment - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against two Glean-authored comparison articles, cross-referenced against this project's own 4.9.5 Data Retention & Disposal V2 finding. Field definition: "Friction, re-architecting fees, and retraining required to migrate off this platform." Base file at [`../Switching Cost Assessment.md`](../Switching%20Cost%20Assessment.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Switching Cost Assessment.md](../../../../test/Glean/4.9.9%20Competitive%20Positioning/V2/Switching%20Cost%20Assessment.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The "model layer switching is cheap, platform layer switching is expensive" paradox is reconfirmed directly, with the exact verbatim quote now sourced precisely: *"switching from one provider to another is an infrastructure decision, not a six-month migration."* One correction worth noting: the OpenAI-integration comparison article does not actually make a direct comparison to ChatGPT Enterprise's model-exclusivity lock-in - its lock-in argument is more general (standalone models vs. platforms), so this specific source shouldn't be cited as a head-to-head ChatGPT Enterprise comparison. This pass's most consequential addition connects the field's own "Contract checklist: Data deletion on termination" row to a real, already-confirmed legal tension in this project's own 4.9.5 research: Glean's Terms of Service promise automatic data deletion on termination, but the DPA requires a written customer request for Personal Data erasure specifically - a genuine, unreconciled discrepancy directly relevant to assessing how clean an exit from Glean actually is.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The exact, verbatim quote behind the "infrastructure update not migration" framing is confirmed precisely | [glean.com/perspectives/how-gleans-adaptability-stacks-up-against-claude-enterprise](https://www.glean.com/perspectives/how-gleans-adaptability-stacks-up-against-claude-enterprise) | Verbatim, confirmed fresh: *"switching from one provider to another is an infrastructure decision, not a six-month migration."* This is slightly more precise than the base research's paraphrase and worth quoting exactly in any client material. |
| 2 | The same article contrasts this with Claude Enterprise's single-model architecture, which it characterizes as creating higher switching costs since governance/workflows/integrations would need rebuilding to change providers | [glean.com/perspectives/how-gleans-adaptability-stacks-up-against-claude-enterprise](https://www.glean.com/perspectives/how-gleans-adaptability-stacks-up-against-claude-enterprise) | Confirmed directly: Glean's argument is that *"governance lives at the platform level rather than the deployment level"* so *"administrative controls and audit trails persist through model changes"* - while a single-model competitor would require rebuilding *"workflows, integrations, and governance controls"* to switch providers. |
| 3 | The OpenAI-integration article confirms the Model Hub's per-query routing mechanism and the "constant context layer" argument for low model-switching cost | [glean.com/perspectives/integrating-openai-models-with-enterprise-ai-a-comparison](https://www.glean.com/perspectives/integrating-openai-models-with-enterprise-ai-a-comparison) | Verbatim: *"Glean's Model Hub routes each query to the best-fit model for the task"* and *"the system of context remains constant regardless of which model handles the generation, so organizations adopt new models as they improve without rebuilding their retrieval or governance infrastructure."* |
| 4 | **Correction**: the OpenAI-integration article does NOT make any direct comparison to ChatGPT Enterprise's specific model-exclusivity lock-in - its lock-in argument is more general (standalone models vs. enterprise AI platforms), and this source should not be cited as a head-to-head ChatGPT Enterprise switching-cost comparison | [glean.com/perspectives/integrating-openai-models-with-enterprise-ai-a-comparison](https://www.glean.com/perspectives/integrating-openai-models-with-enterprise-ai-a-comparison) | Confirmed via direct fetch: this pass's own retrieval explicitly noted *"the article does not mention ChatGPT Enterprise or make any direct comparison to OpenAI's lock-in approach."* If a specific ChatGPT-Enterprise-vs-Glean switching-cost comparison is needed, a different source should be used - this article's scope is narrower than its inclusion in this field's source list might suggest. |
| 5 | **The field's most consequential finding**: this project's own already-confirmed 4.9.5 Data Retention & Disposal research directly bears on this field's "data deletion on termination" contract-checklist item - Glean's Terms of Service (Section 12.3) promise automatic Customer Data deletion upon termination with no request needed, but the DPA (Section 7) requires a written customer request for Customer Personal Data erasure specifically - a real, unreconciled legal tension that materially affects how clean an exit from Glean actually is | Cross-referenced from this project's own 4.9.5 Data Retention & Disposal V2 field, which read both legal documents directly | This means a departing client cannot simply assume "termination = automatic full data deletion" - Personal Data specifically may require an active, written erasure request under the DPA even though the ToS implies automatic deletion for Customer Data generally. Any exit-planning checklist for a client should explicitly account for this distinction and confirm in writing, at termination time, exactly what deletion action (automatic vs. request-triggered) applies to which category of data. |
| 6 | The platform/context lock-in assets (search index, published agents, Answers/Collections/Go Links, Protect rules, FlexCredit/contract commitments) remain accurately cataloged on cross-reference to this project's own prior V2 findings - no new lock-in asset was identified this pass | Cross-referenced across this project's 4.9.2, 4.9.4, 4.9.6, 4.9.7 V2 fields | Each item traces to an already-confirmed finding elsewhere in this project (Agent Builder's real but platform-specific workflows, custom-connector PS investment, FlexCredit's non-transferable/non-refundable terms per the directly-read legal PDF, extension/Teams-pin user habituation). This pass's fresh contribution is precision on the model-layer-vs-platform-layer language (claims 1-4) and the data-deletion discrepancy (claim 5), not new asset discovery. |

## Independent read

- Claim 5 deserves to be the headline finding for this field specifically because switching cost assessment is exactly the context where "how cleanly can we get our data out" matters most - connecting this project's own already-confirmed legal-document discrepancy to this field's contract checklist turns an abstract compliance footnote into directly actionable exit-planning guidance.
- Claim 4's correction is a smaller but real accuracy point: citing this specific article as a "vs. ChatGPT Enterprise" comparison would overstate what it actually argues - its lock-in critique is aimed at single-model products generally, not OpenAI's ecosystem specifically.
- Claims 1-3 don't change the substance of the "lock-in paradox" finding, but they upgrade it from a paraphrased summary to a precisely-quoted, directly-sourced argument - useful for anyone building a client-facing deck who wants to quote Glean's own words rather than a secondhand summary.

## Confidence

**Doc-Verified** for claims 1, 2, 3 (direct fresh fetches, verbatim quotes). **Doc-Verified, a scope correction** for claim 4. **Cross-referenced, high confidence - directly actionable** for claim 5. **Cross-referenced** for claim 6. Validation date 2026-09-09. Tenant/hands-on verification (an actual pilot-asset inventory, an actual contract-clause review for the data-deletion discrepancy) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| "Infrastructure decision, not migration" quote | Confirmed verbatim, precisely | 1 |
| Claude Enterprise contrast | Confirmed: single-model = higher switching cost | 2 |
| Model Hub routing + constant context layer | Confirmed verbatim | 3 |
| ChatGPT Enterprise comparison scope | Corrected: this source makes no such direct comparison | 4 |
| Data-deletion-on-termination discrepancy | **Real, actionable** - ToS says automatic, DPA requires written request | 5 |
| Platform/context lock-in asset catalog | Reconfirmed via cross-reference; nothing new | 6 |
