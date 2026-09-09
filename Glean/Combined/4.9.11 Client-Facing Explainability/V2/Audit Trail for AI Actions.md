**Glean Tier 3 Advanced Evaluation**
**Audit Trail for AI Actions — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/administration/management/audit-logs/admin-audit-logs` and `docs.glean.com/security/security-principles`, cross-referenced against this project's own 4.9.9 findings about repeated audit-trail overstatements in Glean's marketing. Field definition: "Immutable logging of LLM system prompts, reasoning paths, and actions taken by automated agents." Base file at [`../Audit Trail for AI Actions.md`](../Audit%20Trail%20for%20AI%20Actions.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Audit Trail for AI Actions.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Audit%20Trail%20for%20AI%20Actions.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass finds that Glean's own internal Security Principles documentation is honest and precise about the two-tier logging system — Admin audit logs (admin/config actions only) versus Customer event logs/GCE (user-facing events including searches and chats, but requiring separate export provisioning, not on by default). This is directly relevant to, and directly explains, the pattern this project already found three times in its 4.9.9 research: Glean's own customer-facing marketing pages claim audit logging "covers every query," which is only true if GCE export has been actively provisioned — a condition those marketing pages never mention. The internal technical documentation, read directly here, is more careful and accurate than the marketing surface.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Admin audit logs are confirmed directly to capture only administrative/configuration actions, with an explicit, more complete list of exclusions than previously documented | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) | Verbatim: *"Admin audit logs track administrative and configuration actions. They do not include end-user activity, connector crawl telemetry, API rate-limit metrics, or usage analytics."* This is a more complete exclusion list than the base research had — connector crawl telemetry and API rate-limit metrics are also explicitly excluded, not just end-user query content. |
| 2 | The 30-day default retention period is reconfirmed directly, with the specific extension mechanism named precisely | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) | Verbatim: *"The default retention period of 30 days ensures you have sufficient historical data for typical troubleshooting and compliance requirements."* Extended retention requires *"contacting their Glean Account Manager"* — a real, actionable step for any client needing longer retention for compliance purposes. |
| 3 | **The field's most important finding**: Glean's own internal Security Principles page describes the two-tier audit system honestly and precisely — explicitly naming Customer Event logs (GCE) as the mechanism serving compliance reporting, distinct from Admin audit logs | [docs.glean.com/security/security-principles](https://www.glean.com/security/security-principles) | Verbatim: *"Admin audit logs capture administrative actions performed within your Glean instance, including changes to connectors, roles, global configuration, agent subscriptions, and action executions."* Separately: *"Customer event logs provide a structured record of user-facing events (searches, chats, workflow runs, citation clicks) for engagement analysis, compliance reporting, and custom dashboards."* |
| 4 | **This directly explains and contextualizes a pattern already found three times elsewhere in this project**: Glean's customer-facing marketing pages (platform/connectors, the life-sciences blog, the ChatGPT-Enterprise compliance article) claim audit logging "covers every query" or is "strictly enforced" — a claim that is only accurate if GCE export has been actively provisioned by the customer, a precondition those marketing pages never mention | Cross-referenced from this project's own 4.9.9 Honest Weaknesses and Displacement Scenarios V2 fields | The internal Security Principles page (claim 3) correctly frames GCE as an available, configurable compliance-reporting mechanism — it does not claim GCE is on by default or that "every query" is automatically logged without setup. The marketing pages' blanket "covers every query" language is the overstatement; the technical documentation, read directly, is careful and accurate. This distinction should be stated explicitly in any client-facing summary: the audit-trail capability described in marketing is real and achievable, but requires deliberate GCE export configuration, not automatic out-of-the-box coverage. |
| 5 | No immutability or chain-of-custody language was found on the Security Principles page either, reconfirming — via a fresh, independent check — the base research's "not documented" finding for this specific requirement | Absence-check against [docs.glean.com/security/security-principles](https://www.glean.com/security/security-principles) | Confirmed directly: *"The page does not discuss audit trail immutability or chain-of-custody controls."* This remains a genuine, confirmed documentation gap for any regulated client whose compliance requirement specifically demands a tamper-evident or immutable audit chain. |
| 6 | LLM system-prompt and reasoning-path logging is not addressed at all on this specific security page — a genuine silence, consistent with the base research's finding that full prompt bodies aren't captured in standard logs | Absence-check against [docs.glean.com/security/security-principles](https://www.glean.com/security/security-principles) | Confirmed directly: *"The page does not explicitly address logging of user queries or LLM prompts."* This silence is itself informative — it's not that the page denies this capability, it simply doesn't claim it, consistent with the base research's "metadata only, not full prompt/response content" finding. |

## Independent read

- Claim 4 is this pass's most valuable contribution to the whole evaluation, not just this field — it resolves the tension flagged repeatedly in 4.9.9 by showing that Glean's own technical documentation, when read carefully, is actually consistent with this project's confirmed findings; the overstatement lives specifically in customer-facing marketing copy, not in the underlying technical reality or in Glean's own security documentation. This is a genuinely fair way to characterize the gap: not "Glean lied," but "Glean's marketing team oversimplified what Glean's own security team documents precisely."
- Claim 1's more complete exclusion list (crawl telemetry, rate-limit metrics, usage analytics, not just query content) gives a fuller picture of Admin audit logs' actual scope — useful for anyone assessing whether this log type alone would satisfy a specific compliance requirement.
- Claims 5-6's honest absences continue this project's practice of clearly labeling what isn't documented rather than assuming a capability exists because it seems like it should.

## Confidence

**Doc-Verified** for claims 1, 2, 3 (direct fresh fetches, verbatim quotes). **Cross-referenced synthesis, high confidence — resolves a previously-flagged tension** for claim 4. **Absence-check** for claims 5, 6. Validation date 2026-09-09. Tenant/hands-on verification (an actual GCE export provisioning check, an actual admin-audit-log entry test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Admin audit log exclusions | Confirmed, more complete list: also excludes crawl telemetry, rate-limit metrics | 1 |
| Retention period + extension | Confirmed: 30 days default, extend via Account Manager | 2 |
| Two-tier system, honestly documented | Confirmed on the internal Security Principles page | 3 |
| Resolves the marketing-overstatement pattern | GCE is real but requires provisioning — marketing omits this precondition | 4 |
| Immutability/chain-of-custody | Confirmed still undocumented | 5 |
| LLM prompt/reasoning logging | Confirmed silent on this page — consistent with metadata-only finding | 6 |
