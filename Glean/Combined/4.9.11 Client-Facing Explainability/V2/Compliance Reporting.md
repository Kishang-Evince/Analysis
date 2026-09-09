**Glean Tier 3 Advanced Evaluation**
**Compliance Reporting — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/release-notes/releases/2026-08-18-august-release` and `trust.glean.com`. Field definition: "Pre-packaged compliance dashboards for security, model safety, and alignment." Base file at [`../Compliance Reporting.md`](../Compliance%20Reporting.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Compliance Reporting.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Compliance%20Reporting.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Guardrails Insights is reconfirmed directly as a real, centralized dashboard for guardrail trends, policy confidence, and high-risk users — but this pass finds the specific release note announcing it does not itself state a Protect+-specific tier requirement, only that *"access depends on your organization's Protect configuration and administrator permissions."* The base research's "Protect+ add-on" tier claim should be verified against this project's own 4.9.5/4.9.7 Protect-vs-Protect+ research rather than this release note alone. The Trust Portal remains unreachable via automated fetch — the fourth or fifth time this exact pattern has been confirmed across this entire project. The field's central, honest conclusion — no single pre-packaged compliance pack exists, and any client-facing report must be assembled from multiple fragmented sources — remains accurate and is this project's fitting final finding.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Guardrails Insights is confirmed directly as a centralized dashboard giving security/governance teams trend visibility across guardrail activity, without needing to review individual findings | [docs.glean.com/release-notes/releases/2026-08-18-august-release](https://docs.glean.com/release-notes/releases/2026-08-18-august-release) | Verbatim: *"Guardrails Insights gives security and governance teams a centralized view of AI guardrail activity"* enabling admins to *"understand trends, policy confidence, topics, and high-risk users."* |
| 2 | **Needs re-verification**: this specific release note does not itself confirm a Protect+-specific tier requirement for Guardrails Insights — it states only that access depends on Protect configuration and admin permissions, which is more ambiguous than the base research's flat "Protect+ add-on" framing | [docs.glean.com/release-notes/releases/2026-08-18-august-release](https://docs.glean.com/release-notes/releases/2026-08-18-august-release) | Verbatim: *"Access depends on your organization's Protect configuration and administrator permissions."* This pass's own fetch explicitly noted *"the release note does not specify a particular tier requirement."* The base research's Protect+-gating claim is plausible and consistent with this project's own 4.9.5/4.9.7 research on the broader Protect/Protect+ split, but should be confirmed against those sources (or directly with Glean) rather than cited to this specific release note. |
| 3 | The Trust Portal remains confirmed unreachable via automated fetch — consistent with, and now re-confirming for at least the fourth time in this project, the same JS-rendering/access pattern found repeatedly across this evaluation | [trust.glean.com](https://trust.glean.com) | Direct fetch returned only the page title *"Glean Trust Center"* with no substantive content — the same failure mode already documented for this exact URL in this project's 4.9.5 and 4.9.8 research. This is now a well-established, stable finding: the Trust Portal requires a live, JS-capable browser (and likely authentication) to access meaningfully, and should always be flagged as such rather than treated as a reliably fetchable source. |
| 4 | The remaining reporting inventory (Protect+ Sensitive Findings, Admin audit logs, GCE logs, Assistant Insights, Access verification tool) and the compliance-expectation gap table remain accurate on cross-reference to this project's own extensive prior V2 research | Cross-referenced across this project's 4.9.5, 4.9.7, and this section's own earlier fields | Each item traces to a specific, already-confirmed finding elsewhere in this project (the Sensitive Findings/Protect+ split, the 30-day Admin audit retention, GCE's provisioning-dependent nature, the Assistant Insights Voting feedback metrics). No changes needed to these attributions. |
| 5 | The field's central conclusion — no single, pre-packaged "AI compliance pack" is available anywhere, and any client-facing compliance report must be manually assembled from Protect+, GCE, Admin audit logs, and Trust Portal content — remains the accurate, unchanged finding, and serves as a fitting closing point for this entire evaluation | Cross-referenced synthesis of this field's own inventory and this project's research across all prior sections | This finding is consistent with, and reinforced by, dozens of related findings across this project: fragmented logging systems (4.9.5), no published pricing (4.9.7), marketing overstatements about audit completeness later clarified by internal documentation (4.9.9, 4.9.11 Field 2), and a genuinely capable but never fully unified platform. The honest summary for a client is: real compliance-relevant capability exists throughout Glean, but it requires deliberate assembly effort — nothing arrives pre-packaged. |

## Independent read

- Claim 2's correction matters because tier-gating claims have real budget implications — if Guardrails Insights turns out to be available on base Protect rather than requiring the Protect+ upsell, that changes a cost conversation; this should be nailed down precisely rather than left on an ambiguous release-note wording.
- Claim 3's repeated Trust Portal failure is worth treating as a settled, stable fact at this point in the project rather than re-investigating each time — any future work should go straight to "flag for live-browser check" rather than attempting another automated fetch.
- Claim 5 is offered deliberately as this project's closing synthesis point — after eleven sections and dozens of fields, the single most load-bearing, recurring truth about this vendor's compliance/explainability posture is that real capability is scattered across many systems that were not designed to be presented to a client as one report, and every client-facing compliance conversation should start from that premise rather than assuming a turnkey artifact exists.

## Confidence

**Doc-Verified** for claim 1 (direct fresh fetch, verbatim quote). **Doc-Verified, flagged for re-verification against a different source** for claim 2. **Doc-Verified — a stable, repeated finding** for claim 3. **Cross-referenced** for claim 4. **Cross-referenced synthesis, high confidence** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (an actual Guardrails Insights access test on base Protect vs. Protect+, an actual assembled compliance-pack exercise for Perimeter Healthcare) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Guardrails Insights capability | Confirmed: centralized guardrail-activity dashboard | 1 |
| Guardrails Insights tier requirement | Needs re-verification — this release note is ambiguous on Protect vs. Protect+ | 2 |
| Trust Portal accessibility | Confirmed unreachable via automated fetch — a stable, repeated pattern | 3 |
| Remaining reporting inventory | Reconfirmed via cross-reference | 4 |
| No single compliance pack exists | Reconfirmed — this evaluation's closing synthesis point | 5 |
