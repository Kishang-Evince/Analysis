**Glean Tier 3 Advanced Evaluation**
**Expected Outcome — Independent Fresh Research (V2)**

*Independent research, checked 2026-09-09 against Glean's GCE logs documentation (via search, direct fetch of the specific data-dictionary-examples page returned empty content) and cross-referenced against this project's own 4.9.10 Department/Function V2 field. Field definition: "Target metrics, deflection rates, or productivity savings achieved." Base file at [`../Expected Outcome.md`](../Expected%20Outcome.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Expected Outcome.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Expected%20Outcome.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The Insights "Voting feedback" chart is confirmed as a real, named feature directly supporting UC-02's upvote-rate target metric, with three specific named sub-metrics (feedback submission rate, upvote rate, downvote rate). This pass also surfaces a real, practical limitation worth flagging: GCE log export delivers a single unified stream with no filtering by event type, connector, user, or content at the export layer — meaning isolating a specific use case's signal (e.g., UC-06's ticket-deflection activity specifically) requires downstream filtering in BigQuery/Splunk/Athena after ingestion, not something Glean does natively. Most valuably, this pass reconfirms and formally incorporates the real, quantified Confluent customer outcome (found in this project's own Department/Function V2 research) as strong supporting evidence for UC-07's target metrics.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The direct fetch of the specific GCE data-dictionary-examples page cited in this field's source list returned empty content this pass — consistent with this project's recurring pattern of JS-rendered/empty-on-automated-fetch pages, and should be checked with a live browser before being relied upon | [docs.glean.com/administration/gce-logs/data-dictionary-examples](https://docs.glean.com/administration/gce-logs/data-dictionary-examples) | Direct fetch attempt returned only an empty content block — the same failure pattern seen elsewhere in this project (Trust Portal, status page, community forum). The findings below (claims 2-3) come from search-result summaries of related GCE documentation pages, not a direct read of this specific cited page. |
| 2 | The Insights "Voting feedback" chart is a real, named feature with three specific sub-metrics directly supporting UC-02's target metric | Search-corroborated — Glean Insights documentation (docs.glean.com/administration/insights/*) | Confirmed: a *"Voting feedback chart tracks user upvotes and downvotes over your selected time period,"* with named metrics **feedback submission rate** (share of responses receiving any vote), **upvote rate**, and **downvote rate**. This gives UC-02's ">70% upvote" target a real, specific, named data source rather than a generic "Assistant upvote rate" description. |
| 3 | **New, practically important finding**: GCE log export delivers one unified, unfiltered stream — isolating a single use case's signal requires downstream filtering after ingestion, not a native Glean export-time filter | Search-corroborated — Glean GCE logs documentation | Confirmed: *"GCE log export is delivered as a single unified stream, with filtering by event type, connector, user, or content not supported at the export layer — all events flow to the configured destination, and downstream systems (BigQuery, Athena, Splunk, and similar) must apply filters after ingestion."* This is a real, practical planning point: measuring UC-06's ticket-deflection rate specifically, for example, will require building a filtering/tagging layer downstream of Glean's export, not relying on a built-in per-use-case report. |
| 4 | **Cross-referenced, strong evidence**: the Confluent customer case study (found in this project's own Department/Function V2 research) provides real, quantified, named outcomes directly relevant to UC-07's target metrics — a stronger evidentiary tier than the "Vendor-Stated benchmark" framing used for most other target metrics in this field | Cross-referenced from this project's own 4.9.10 Department/Function V2 field (claim 3) | Confluent's confirmed outcomes — *"5 mins saved in customer response times," "+13% employee satisfaction scores for access to information," "15k+ hours saved monthly"* — should be cited directly alongside UC-07's own target metrics as a named, quantified real-world reference point, distinct from the generic "Vendor-Stated" framing applied to the other seven use cases' targets (which lack any named customer backing). |
| 5 | Glean's own seven-stage Agent Development Lifecycle framework (Opportunity, Design, Performance, Input, Develop, Launch, Monitor and Improve) is a relevant, real methodology worth referencing for UC-05's outcome-measurement approach specifically, since it's Glean's own recommended framework for evaluating agent quality over time | Search-corroborated | This framework was already partially confirmed in this project's 4.9.3 Hallucination Controls V2 field (the "Golden test set" evaluation framework, part of the "Performance" stage). Its "Monitor and Improve" stage specifically is the relevant reference point for how Glean recommends tracking an agent's real-world outcome quality post-launch — worth citing directly for UC-05's expected-outcome measurement plan. |

## Independent read

- Claim 3 is this pass's most practically useful finding — a client planning to measure per-use-case outcomes via GCE export needs to know upfront that this requires building their own downstream filtering layer, not that Glean will hand them a pre-segmented UC-06-specific report.
- Claim 4 continues this project's practice of elevating a real, named, quantified customer proof point above generic vendor-stated ranges wherever one exists — UC-07 now has meaningfully stronger evidence than the other seven use cases in this library, and that distinction should be visible in any client-facing presentation rather than flattened into "all targets are equally vendor-stated."
- Claim 1's honest disclosure of the failed direct fetch matters for research integrity — the GCE-specific findings here are search-corroborated, not doc-verified from the exact cited page, and should be confirmed with a live browser before being treated as fully authoritative.

## Confidence

**Attempted direct fetch, failed — flagged explicitly** for claim 1. **Search-corroborated** for claims 2, 3, 5. **Cross-referenced, high confidence — a named, quantified customer proof point** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual GCE export test, an actual downstream filtering build) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| GCE data-dictionary-examples page | Direct fetch failed (empty) — flag for live-browser check | 1 |
| Voting feedback chart | Confirmed real, named, 3 sub-metrics | 2 |
| GCE export filtering limitation | **New**: unified stream, no export-time filtering — build downstream | 3 |
| Confluent outcome for UC-07 | Stronger evidence tier than generic Vendor-Stated targets | 4 |
| Agent Development Lifecycle framework | Real methodology for UC-05 outcome tracking | 5 |
