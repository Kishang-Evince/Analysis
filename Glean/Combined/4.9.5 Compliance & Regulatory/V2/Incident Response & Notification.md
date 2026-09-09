**Glean Tier 3 Advanced Evaluation**
**Incident Response & Notification — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`, `status.glean.com`, plus the DPA and Security Standard PDFs already directly read in earlier fields of this project. Field definition: "SLA timelines and technical workflows for breach identification and customer reporting." Base file at [`../Incident Response & Notification.md`](../Incident%20Response%20&%20Notification.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Incident Response & Notification.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Incident%20Response%20&%20Notification.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

There are genuinely **two separate incident systems**, easy to conflate: a public, self-serve **status page** for operational/uptime incidents, and a private, contractual **security breach notification process** (72-hour SLA, already confirmed in this project's DPA research) for actual data security incidents. The status page's own real incident history is informative in its own right — it shows Glean's third-party model-provider dependency (Vertex AI, AWS Bedrock, OpenAI) has already caused real, dated service incidents.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean maintains a real, live, public status page for operational/uptime incidents, with a genuine recent incident history | [status.glean.com](https://status.glean.com/) (search-corroborated — see confidence caveat), [docs.glean.com/get-started/start/status-page](https://docs.glean.com/get-started/start/status-page) | Recent incidents found: *"May 18, 2026: Some users experienced elevated rate limiting from Google Vertex AI"*; degraded AI search/assistant performance from *"elevated latency in AWS Bedrock's US-WEST-2 region"*; *"April 13-14: Some users experienced elevated chat errors due to an upstream OpenAI API auth issue, which OpenAI resolved upstream."* All three named root causes trace to third-party model providers, not Glean's own infrastructure — a real, dated confirmation of the multi-provider dependency risk already flagged in this project's AI Architecture research. |
| 2 | Status-page notifications are self-serve and multi-channel, not requiring account-team contact | [docs.glean.com/get-started/start/status-page](https://docs.glean.com/get-started/start/status-page) | *"Glean notifies users through three methods: the status page itself, email notifications sent to administrators, and in-product UI banners."* Subscription is self-service: *"Subscribe to incident updates via email or other available methods"* and *"Select specific components to follow"* — can be modified or cancelled anytime. |
| 3 | Organization-specific (localized) issues are explicitly not expected to appear on the public status page — these require a direct support contact instead | [docs.glean.com/get-started/start/status-page](https://docs.glean.com/get-started/start/status-page) | *"Some issues may affect only your organization"* and won't show globally; for these, customers should *"contact support with specific details about timing, scope, and error messages."* |
| 4 | **Critical distinction**: this public status/uptime system is separate from actual security breach notification, which is governed by a contractual SLA, not the public page | Cross-referenced from this project's own Data Retention & Disposal V2 research (directly read from the DPA PDF), not re-derived fresh this pass | The DPA's Section 4 states Glean *"shall notify Customer without undue delay, but in no event more than seventy-two (72) hours after becoming aware of any Personal Data Breach."* This is a private, contractual notification to the specific affected customer — a fundamentally different mechanism from the public status page's broadcast-style uptime updates. |
| 5 | The internal technical workflow behind a security incident is documented as a structured, 5-stage process, not just a bare SLA number | Cross-referenced from this project's own HIPAA Readiness & BAAs V2 research (directly read from the Security Standard PDF), not re-derived fresh this pass | *"Glean has in place a security incident response plan"* with defined stages: *"Roles and responsibilities: formation of an internal incident response team with a response leader. Investigation: assessing the risk the incident poses and determining who may be affected. Communication: internal reporting as well as a notification process in the event of a Security Breach. Recordkeeping: keeping a record of what was done and by whom to help in subsequent analyses. Audit: conducting and documenting a root cause analysis and remediation plan."* |
| 6 | The 72-hour SLA (claim 4) and the 5-stage workflow (claim 5) are complementary, not redundant — together they fully answer this field's own definition | Synthesis of claims 4-5 | The workflow (claim 5) is the internal mechanism that must complete quickly enough to produce a notification within the SLA deadline (claim 4) — this field's definition explicitly asks for both *"SLA timelines"* and *"technical workflows,"* and both are independently confirmed and documented, from two different primary-source legal/policy documents. |
| 7 | The specific status-page details (uptime percentages, named incidents) could not be independently confirmed via a direct page load this pass — flagged for live re-verification | [status.glean.com](https://status.glean.com/) | Direct fetch attempt returned *HTTP 403 Forbidden* — likely automated-request blocking (e.g. Cloudflare bot protection), not a content issue. The specific incidents and uptime figures cited in claim 1 come from a search-engine-indexed summary of this page, not an independently-loaded live view — should be re-checked with a real browser before being cited as fully settled. |

## Independent read

- Claim 4 is the field's most important framing point: an evaluator who only checks the public status page would come away thinking "incident notification" means the uptime-tracker experience — missing that actual data security breaches follow an entirely separate, private, contractually-bound 72-hour process. Both should be reported, clearly distinguished.
- Claim 1's real incident examples are a genuinely useful, concrete finding beyond the field's literal ask — they demonstrate (with dates and named root causes) that Glean's multi-model-provider architecture has real operational consequences, tying back to and reinforcing findings from this project's Foundation Models Used and Model Agnosticism research.
- Claim 7 is a straightforward honesty flag — the status page's content is almost certainly accurate (it's a standard, expected status-page pattern, and the search-indexed summary is plausible and specific), but the direct-fetch failure should be disclosed rather than silently treated as if it were independently verified.

## Confidence

**Cross-referenced, high confidence** for claims 4-5 (both trace to primary legal/policy PDFs directly read earlier in this project). **Doc-Verified** for claims 2-3 (direct fetch). **Search-corroborated, direct-fetch failed** for claims 1, 7 (flagged explicitly). Validation date 2026-09-09. Tenant/hands-on verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Public status page exists, with real incident history | Yes — 3 named incidents, all traced to 3rd-party model providers | 1 |
| Status-page notification channels | Page + admin email + in-product banner, self-serve subscribe | 2 |
| Org-specific issues on status page? | No — contact support directly instead | 3 |
| Status page = security breach notification? | **No — separate systems**, breach notification is the DPA's 72-hour SLA | 4 |
| Internal incident-response workflow | 5 stages: roles, investigation, communication, recordkeeping, audit | 5 |
| SLA + workflow relationship | Complementary — workflow delivers within the SLA deadline | 6 |
| Status page directly re-verified live? | No — 403 on direct fetch, search-sourced only | 7 |
