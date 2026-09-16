**Glean Tier 3 Advanced Evaluation**
**Audit Trail Completeness - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Log immutability and detail level for administrative and AI actions." Base file at [`../Audit Trail Completeness.md`](../Audit%20Trail%20Completeness.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Audit Trail Completeness.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Audit%20Trail%20Completeness.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

"Audit trail" is not one system - it's **three separate logging systems** covering different slices, easy to conflate. The Admin Audit Log explicitly **excludes** end-user activity by its own documentation; user queries live in a separate "GCE" (Glean Customer Event) log system that must be actively configured and exports as one unfiltered stream. Neither system's documentation makes an immutability/tamper-proofing claim - a real, checkable gap against this field's own definition.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Three genuinely separate logging systems exist, each covering a different slice of activity | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) ; [docs.glean.com/administration/gce-logs/data-dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) | (a) **Admin Audit Log** - administrative/configuration actions only. (b) **GCE (Glean Customer Event) logs** - end-user activity: searches, clicks, chats, feedback, AI/LLM calls, agent workflow runs. (c) **Agent Trace Export (OTLP)** - detailed AI-agent execution traces (already independently covered in this project's Explainability & Decision Logs field). These are not one unified "audit trail" - a buyer asking for "the audit log" needs to specify which one. |
| 2 | The Admin Audit Log explicitly excludes end-user activity by its own stated scope | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) | Verbatim: *"They do not include end-user activity, connector crawl telemetry, API rate-limit metrics, or usage analytics."* This directly matters for this field's own evaluation methodology, which asks to verify whether "user queries" are recorded - they are not, in this specific log; they live in the separate GCE system (claim 6-7). |
| 3 | Role/permission changes are covered by the Admin Audit Log, once the page's fuller event list is reviewed | Broader review, cross-checking [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) against corroborating summary content | Confirmed: admin audit logs capture *"changes to connectors, roles, global configuration, agent subscriptions, and action executions."* **Note on process:** an initial narrower read of this page's content surfaced only a partial event list that did not explicitly mention roles - a follow-up check found the fuller list. Flagged here so the research trail shows the correction rather than silently presenting only the final answer. |
| 4 | Admin Audit Log has a defined retention default, self-serve export, and enterprise-grade delivery options | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) | Default retention: *"30 days"* to *"balance storage efficiency with administrative needs"* - extended retention requires contacting Glean. *"CSV export is the built-in, self-serve way to pull audit log data from the Admin console."* Can also request *"ongoing delivery of your logs to a destination you manage"* - Google Cloud Storage, Amazon S3, or a data warehouse - plus third-party SIEM streaming (corroborated from prior research in this project). |
| 5 | No immutability or tamper-proofing claim (write-once storage, cryptographic sealing, restrictions on admin edit/delete) was found for the Admin Audit Log anywhere checked | [docs.glean.com/administration/management/audit-logs/admin-audit-logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) plus a dedicated absence-check search | Directly confirmed absent: *"The documentation contains no information regarding whether logs are write-once, cryptographically sealed, or whether administrators can modify or delete entries. This critical security property is not discussed."* A genuine, checkable gap directly against this field's own definition ("log immutability"). |
| 6 | The GCE (user-activity) log exports as one single, unfiltered stream - filtering must happen downstream, and it's not enabled by default | [docs.glean.com/administration/gce-logs/data-dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) | Verbatim: *"GCE log export is delivered as a single unified stream. Filtering by event type, connector, user, or content is not supported at the export layer-all events flow to the configured destination."* Exports to customer-managed destinations are *"not enabled by default"* - this system requires deliberate setup, unlike the Admin Audit Log's built-in CSV export. |
| 7 | Once configured, individual GCE log entries are genuinely detailed - real depth for both search/chat activity and AI/agent execution | [docs.glean.com/administration/gce-logs/data-dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) | 16+ event types captured under the unified `glean-customer-event` stream. Example depth: `LLM_CALL` events log *"token usage, model information, provider details, audio usage, and request dimensions."* `WORKFLOW_CONVERSATION` events capture *"the full conversation history within a workflow run."* |

## Independent read

- Claims 1-2 are the field's central finding: "is the audit trail complete" cannot be answered with a single yes/no, because "complete" depends on which of three systems is being asked about, and the one most people mean by "audit log" (the Admin Audit Log) explicitly does not cover user queries - the very thing this field's evaluation methodology asks to check first.
- Claim 5 is a clean, direct gap that maps exactly to this field's own definition (immutability) - worth testing directly rather than assuming either way.
- Claim 6 is a real operational catch: an org that assumes "we get detailed user activity logs" without realizing GCE export isn't on by default, and that filtering isn't available at export time, could be caught off guard by the volume/shape of data if they enable it without planning their downstream pipeline first.
- Claim 3's note about the research process itself is intentional - it's an honest record that the first pass under-read the page, and the correction was found by checking again rather than accepting the first answer as final.

## Confidence

**Doc-Verified**, 2 independent first-party sources (both fetched directly, one re-checked for completeness), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on verification (an actual immutability test and a real GCE log review) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Number of separate logging systems | 3 - Admin Audit Log, GCE logs, Agent Trace Export | 1 |
| User queries in Admin Audit Log? | No - explicitly excluded, live in GCE instead | 2 |
| Role/permission changes covered? | Yes, confirmed on fuller review | 3 |
| Admin Audit Log retention/export | 30-day default, self-serve CSV, SIEM/warehouse delivery available | 4 |
| Immutability/tamper-proofing claim | Not found anywhere - genuine gap | 5 |
| GCE export filtering | None at export layer - single unfiltered stream, not on by default | 6 |
| GCE per-event detail level | High - token usage, model/provider, full conversation history | 7 |
