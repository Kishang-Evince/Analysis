**Glean Tier 3 Advanced Evaluation**
**AI-Specific Governance — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `www.glean.com`, plus cross-references to this project's own Prompt Engineering Access V2 research (already independently established). Field definition: "Bias mitigation controls, prompt injection shields, and toxic input/output filtering." Base file at [`../AI-Specific Governance.md`](../AI-Specific%20Governance.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/AI-Specific Governance.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/AI-Specific%20Governance.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This field asks about three things — bias mitigation, prompt injection shields, toxic-content filtering — and they get three very different answers. **Injection and toxicity filtering are real, quantified, and confirmed** (already established in this project's Prompt Engineering Access field). **Bias mitigation has no confirmed technical control anywhere in Glean's product documentation** — checked directly, including the specific quality-evaluation framework, and it's explicitly absent. A now-familiar pattern repeats: Glean's own blog discusses "impartiality" and AI ethics as general industry guidance for customers building their own policies, not as a claim about Glean's own product controls.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | No bias-mitigation or fairness-testing control was found in Glean's own agent-quality evaluation framework — checked directly, and it's explicitly absent | [docs.glean.com/agents/agent-development-lifecycle/evaluate-agent-quality](https://docs.glean.com/agents/agent-development-lifecycle/evaluate-agent-quality) | Confirmed directly: this page's evaluation framework covers exactly four test categories — *"Happy Path, Edge Cases, Adversarial, and Permission"* — and *"none of these sections address potential biases in agent responses or fairness across different demographic groups."* This is the same "Golden test set" framework independently confirmed in earlier research (Hallucination Controls field) — now checked specifically for bias coverage and found to have none. |
| 2 | Glean Protect/Protect+'s own list of what it defends against explicitly does not include bias/fairness/discriminatory-output detection | [docs.glean.com/administration/protect/overview](https://docs.glean.com/administration/protect/overview) | Confirmed directly: the guardrails named are *"prompt injection, jailbreak attempts, malicious code, and toxic content"* — *"bias and fairness detection are not mentioned as distinct features"* anywhere on this page. |
| 3 | Prompt-injection detection is real and independently quantified — cross-referenced from this project's own prior research, not re-derived fresh this pass | Cross-referenced from this project's Prompt Engineering Access V2 field | Two separate, distinctly-scoped published accuracy figures: **96.9%** for prompt injection (live `glean.com/platform/security` page) and **97.8%** for jailbreak attempts specifically (a September 2025 blog post) — already established as two different claims, not one evolving number. |
| 4 | Toxic-content prevention is real but tier-gated to Protect+ specifically, not included in base Protect | Cross-referenced from this project's Prompt Engineering Access V2 field | *"Prevention against prompt injection, jailbreak attempts, malicious code, and toxic content"* is a **Protect+**-specific capability, per the same source re-confirmed in claim 2. |
| 5 | Where injection/toxicity guardrails exist, they come with real, admin-configurable enforcement mechanics — cross-referenced, not re-derived | Cross-referenced from this project's Prompt Engineering Access V2 field | Sensitivity/confidence thresholds are admin-configurable; enforcement has two modes (*"Block and fail only high-severity violations"* vs. *"Flag for review"*). These mechanics apply to the confirmed guardrail categories (injection, jailbreak, malicious code, toxic content) — no equivalent mechanic was found for bias, since no bias-specific guardrail category exists to configure in the first place. |
| 6 | **A recurring pattern, now confirmed a third time in this research effort**: Glean's own marketing/blog content discusses bias, fairness, and "impartiality" as general industry/AI-ethics guidance for customers, not as a claim about Glean's own product controls | [www.glean.com/perspectives/how-to-develop-an-internal-ai-policy-framework](https://www.glean.com/perspectives/how-to-develop-an-internal-ai-policy-framework) (search-corroborated) | Content found: *"core AI values such as impartiality, responsibility, and openness"* framed as advice for a customer's own internal AI policy curriculum — not a description of a technical bias-mitigation feature inside Glean's product. This mirrors the earlier ABAC finding (4.9.1 field research) and the customer-managed-encryption-keys finding (this section's Data Encryption Standards field) — a consistent, now well-established pattern of generic industry-education content on Glean's blog being distinct from confirmed first-party product capabilities. |
| 7 | Glean's ISO/IEC 42001:2023 certification is indirect, structural evidence that *some* internal AI-risk-governance process exists — but no specific bias-mitigation control was found publicly documented, and this should not be assumed from the certification alone | [www.glean.com/platform/security](https://www.glean.com/platform/security) (certification, previously confirmed) plus absence-check across claims 1-2 | ISO 42001 is *"the leading international standard for AI management systems"* and its audit criteria formally require AI-risk governance processes, which commonly include bias-related risk assessment. Holding this certification is real evidence Glean has *internal* processes addressing AI risk broadly — but the specific mechanics, if they include bias-specific testing, are not documented anywhere publicly checked this pass. This is an inference worth stating explicitly as an inference, not treated as confirmed. |
| 8 | A separate, real Glean capability — sensitive-data scanning across connected SaaS apps — should not be confused with output bias/fairness mitigation; they are different governance domains | Search-corroborated — [www.glean.com/press/glean-bolsters-ai-security-expands-data-ai-governance](https://www.glean.com/press/glean-bolsters-ai-security-expands-data-ai-governance) | Glean's *"Open Security and Governance Partner Program"* and *"active data and AI governance capabilities"* involve *"continuous scanning and flagging of sensitive data exposure across its ecosystem of 100+ SaaS applications"* — this is data-exposure governance (already covered under Protect's sensitive-findings feature in earlier fields), not bias/fairness detection in AI-generated output. The two should not be conflated in a summary just because both use the word "governance." |

## Independent read

- Claims 1-2 together give this field's cleanest, most important answer: bias mitigation is not a documented Glean product capability, checked from two independent angles (the quality-evaluation framework and the security-guardrail product), both confirming the same absence.
- Claim 6 is worth calling out explicitly as a pattern, not a coincidence — this is now the third time in this research effort that a plausible-sounding industry-adjacent term (ABAC, customer-managed encryption keys, now bias/fairness/"impartiality") turned out to be generic customer-education content on Glean's blog rather than a first-party product claim. Anyone doing further research on this vendor should specifically watch for this pattern.
- Claim 7 is the fairest way to handle the ISO 42001 angle — it's real, relevant evidence, but citing a certification as if it proves a specific technical control exists would overstate what's actually confirmed. The honest move is to say what the certification implies structurally, and flag the specific-control gap separately.

## Confidence

**Doc-Verified** for claims 1, 2 (direct fetches confirming absence). **Cross-referenced, high confidence** for claims 3-5 (established via this project's own prior direct research). **Search-corroborated** for claims 6, 8. **Structural inference, explicitly labeled as such** for claim 7. Validation date 2026-09-09. Tenant/hands-on verification (an actual bias-probing prompt test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Bias mitigation in quality-evaluation framework | Not found — explicitly absent from the 4-category test framework | 1 |
| Bias/fairness in Protect/Protect+ guardrail list | Not found — not among the named categories | 2 |
| Prompt-injection detection | Real, quantified (96.9%), cross-referenced | 3 |
| Toxic-content filtering | Real, Protect+-gated, cross-referenced | 4 |
| Enforcement configurability | Real for confirmed guardrails; no bias-specific mechanic exists | 5 |
| "Bias/impartiality" on Glean's blog | Generic customer-guidance content, not a product claim — 3rd confirmed instance of this pattern | 6 |
| ISO 42001 as bias-governance evidence | Structural inference only, not a confirmed specific control | 7 |
| Sensitive-data scanning vs. bias mitigation | Different governance domains — don't conflate | 8 |
