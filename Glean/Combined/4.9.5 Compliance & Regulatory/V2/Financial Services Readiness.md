**Glean Tier 3 Advanced Evaluation**
**Financial Services Readiness - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Specific: SOC 2 Type II status, PCI-DSS compliance for payment data, FINRA considerations for broker-dealer environments, SEC data retention requirements." Base file: none exists yet - this is a new field added to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md). Cross-reference: SOC 2 Type II status is already fully researched in [`V2/Certifications Validated.md`](Certifications%20Validated.md) (Sr No 1) - not re-litigated here; this doc focuses on the PCI-DSS/FINRA/SEC-specific sub-parts of the field, which that companion doc does not cover. Note for context: Perimeter Healthcare is a behavioral healthcare client, not a financial services firm, so this field is lower direct relevance to them - but the SOW requires it as a general Radar field, so it is researched honestly here rather than skipped.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Financial Services Readiness.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Financial%20Services%20Readiness.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean publishes SOC 2 Type II, ISO 27001, ISO 42001, HIPAA, and GDPR as its named compliance certifications - it does **not** publicly name PCI-DSS, FINRA, or SEC Rule 17a-4 anywhere on `glean.com/platform/security`, `docs.glean.com/security`, or in general web search. This is a genuine absence, not a research gap: Glean is a horizontal enterprise search/AI platform, not a payments processor or broker-dealer system of record, so PCI-DSS scope (cardholder data) would not naturally apply unless a customer routed payment data through it (which Glean's own architecture does not describe as a supported use case). FINRA/SEC considerations are architecturally relevant (Glean synthesizes answers across connectors, which complicates records-retention "shaped record" capture) but are not addressed by Glean in any published material found this pass.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | SOC 2 Type II status is confirmed and already independently verified in the companion Certifications Validated research - not duplicated here | [`V2/Certifications Validated.md`](Certifications%20Validated.md), Sr No 1 | Cross-reference only. See that doc for the full claim, source, and Trust Portal access process. |
| 2 | PCI-DSS is not named anywhere in Glean's public security documentation or marketing pages found this pass | [glean.com/platform/security](https://www.glean.com/platform/security) (directly fetched), search-corroborated | Direct fetch of the security page confirmed the named certifications are "ISO 42001, HIPAA, TX-RAMP Level 2, SOC 2 Type II, ISO 27001, and GDPR" - **PCI-DSS is absent from this list.** A follow-up web search for "Glean PCI-DSS compliance" returned no Glean-published claim of PCI-DSS certification; the only PCI-DSS content surfaced was generic third-party explainer material, not Glean's own statement. |
| 3 | FINRA is not addressed anywhere in Glean's own published material; the only FINRA-adjacent content found is a third-party analyst piece framing FINRA 4511 as a baseline expectation Glean has not been shown to meet | Search-corroborated, [exploreagentic.ai/insights/glean-alternatives-for-regulated-industries](https://www.exploreagentic.ai/insights/glean-alternatives-for-regulated-industries/) (third-party, not Glean-authored) | Verbatim from the third-party analysis: *"A Glean response that fans out across six connectors and synthesizes an answer is hard to decompose into 17a-4-shaped records after the fact."* This is an independent analyst's architectural concern, not a Glean admission or denial - flagged here as the closest available signal, with its non-Glean authorship made explicit so it is never mistaken for a vendor statement. |
| 4 | SEC Rule 17a-4 (broker-dealer electronic recordkeeping/WORM retention) is not addressed anywhere in Glean's own published material | Search-corroborated absence check; same third-party source as claim 3 | No Glean-authored page found this pass makes any claim about WORM-format retention, 17a-4-shaped record decomposition, or broker-dealer recordkeeping compatibility. The only substantive treatment found was the same third-party analyst piece, which raises the concern rather than resolving it. |
| 5 | Glean's own audit-trail/retention architecture (per the already-researched Data Retention & Disposal and Audit Trail Completeness fields in this section) was not evaluated in this pass against the specific 17a-4 "shaped record" bar - that is a distinct, deeper analysis this field alone cannot close | Internal cross-reference, not independently re-verified this pass | Flagged as a gap rather than closed: answering "does Glean satisfy 17a-4" requires evaluating Glean's actual audit log schema/export format against the rule's specific immutability and format requirements, which is out of scope for a documentation-only pass and belongs to a dedicated financial-services engagement if Glean is ever evaluated for a broker-dealer client. |

## Independent read

- The honest finding here is absence, not failure: Glean is a horizontal knowledge/AI platform built for HIPAA/SOC2/ISO-style enterprise IT compliance, and nothing in its public material suggests it was built or certified for payment-card or broker-dealer-specific regulatory regimes. That's a legitimate, reportable finding for the Radar field - "not addressed" is itself the answer for PCI-DSS/FINRA/SEC.
- For Perimeter Healthcare specifically, this field carries low direct relevance (no payment-card or broker-dealer workloads expected), but the underlying architectural point in claim 3 - that synthesized, multi-connector answers are hard to decompose into clean, single-source records after the fact - is worth flagging as a pattern that could recur in *any* regulated-recordkeeping context, healthcare audit trails included, even though this specific field is framed around financial services.
- None of PCI-DSS, FINRA, or SEC 17a-4 appear to be Glean roadmap items in any material found this pass (no "coming soon" or "in progress" language) - this reads as a genuine non-priority for Glean's current certification investment, not a near-term gap that's about to close.

## Confidence

**Confirmed absence via direct fetch + search** for claims 2-4 (PCI-DSS, FINRA, SEC 17a-4 all absent from Glean's own published material). **Cross-reference, not re-verified** for claim 1 (SOC 2, already covered elsewhere). **Explicitly flagged as unresolved/out of scope** for claim 5. Validation date 2026-09-14. This field genuinely cannot be advanced further by documentation research alone - closing it requires a direct question to Glean's account team, which the companion test guide is built around.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| SOC 2 Type II | Confirmed - see Certifications Validated doc | 1 |
| PCI-DSS | Not found published anywhere - genuine absence | 2 |
| FINRA | Not addressed by Glean; third-party concern only | 3 |
| SEC 17a-4 | Not addressed by Glean; third-party concern only | 4 |
| Glean's own retention vs 17a-4 bar | Not evaluated this pass - needs dedicated deep-dive if ever relevant | 5 |
