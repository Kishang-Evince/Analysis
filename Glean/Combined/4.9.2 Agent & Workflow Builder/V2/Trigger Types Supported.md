**Glean Tier 3 Advanced Evaluation**
**Trigger Types Supported - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/concepts/triggers`, `docs.glean.com/agents/concepts/schedule-triggers`, and `docs.glean.com/agents/concepts/execution-limits`. Field definition: "Supported event bindings (schedules, API calls, webhooks, data shifts)." Base file at [`../Trigger Types Supported.md`](../Trigger%20Types%20Supported.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Trigger Types Supported.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Trigger%20Types%20Supported.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass adds a genuinely important, previously-uncaptured default: scheduled triggers are **off by default at the admin level** and must be explicitly turned on tenant-wide or for selected users/groups before anyone can use them - a real activation step, not just a per-user activation nuance. The ~30-minute scheduled-run execution ceiling is reconfirmed with an exact match. The main triggers concept page itself only enumerates three trigger types (chat, form, content) directly - scheduled and API triggers are documented on separate pages, confirming this project's own multi-source approach was necessary to get the complete picture.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | **New, important finding**: scheduled triggers are off by default at the admin level tenant-wide, requiring an explicit admin action to enable them - either for everyone or for selected users/IdP groups | [docs.glean.com/agents/concepts/schedule-triggers](https://docs.glean.com/agents/concepts/schedule-triggers) | Verbatim: *"By default, scheduled triggers are turned off. In Admin console → Platform → Agents → Scheduled triggers, admins can turn the feature on for everyone or limit access to selected users and IdP groups."* This is a real, additional admin gate beyond the base research's "Admin-gated" note - worth confirming this specific toggle has actually been enabled before assuming scheduled agents will work for any pilot user. |
| 2 | The ~30-minute scheduled-run execution ceiling is reconfirmed with an exact match, sourced directly from the execution-limits page rather than the schedule-triggers page (which only cross-references it) | [docs.glean.com/agents/concepts/execution-limits](https://docs.glean.com/agents/concepts/execution-limits) | Verbatim: *"Scheduled agent runs have a maximum end-to-end execution time of approximately 30 minutes."* |
| 3 | Scheduled-run timing is confirmed to be inexact - actual execution time can shift depending on contention with other scheduled agents running at the same time | [docs.glean.com/agents/concepts/schedule-triggers](https://docs.glean.com/agents/concepts/schedule-triggers) | Verbatim: *"The exact time of execution may vary depending on how many other agents are scheduled to run at the same time."* This is a real, previously-uncaptured caveat for any workflow depending on precise scheduled timing (e.g., a report needed by a specific hour). |
| 4 | The main triggers concept page itself enumerates only three trigger types directly (chat, form, content) - scheduled and API triggers are documented on entirely separate pages, confirming that no single page gives the complete trigger inventory | [docs.glean.com/agents/concepts/triggers](https://docs.glean.com/agents/concepts/triggers) | Confirmed directly: this page names only *"Chat message trigger,"* *"Input form trigger,"* and *"Content trigger,"* explicitly deferring detailed content-trigger source coverage to a separate page and not mentioning scheduled or API triggers at all. This validates the base research's own multi-source citation approach for this field. |
| 5 | Response-size truncation on individual tool results includes a real mitigation: a download link is provided for the full result when truncated, not just a silent cutoff | [docs.glean.com/agents/concepts/execution-limits](https://docs.glean.com/agents/concepts/execution-limits) | Verbatim: *"Individual tool results are bounded by a maximum size limit. When exceeded, responses are truncated with download links provided for full results."* This is a genuinely useful mitigation detail relevant to any large-Sheet/Doc retrieval scenario in the tenant stack, not previously captured - the truncation isn't a dead end, a full-result download path exists. |

## Independent read

- Claim 1 is this pass's most actionable finding - before running any scheduled-trigger pilot test, Stratos should explicitly confirm with the tenant admin that this feature has actually been turned on, rather than assuming it's available by default the way chat/form triggers are.
- Claim 3's contention-based timing variance is worth flagging for any client use case with a hard deadline dependency (e.g., "the report must be ready by 9am") - Glean's own documentation doesn't promise exact-time execution.
- Claim 5's download-link mitigation is a genuinely positive finding that softens the earlier-flagged "silent truncation" risk noted elsewhere in this section - truncation isn't silent data loss, it's a UX trade-off with a real recovery path.

## Confidence

**Doc-Verified** for claims 1, 2, 3, 4, 5 (direct fresh fetches, verbatim quotes). Validation date 2026-09-09. Tenant/hands-on verification (an actual admin-toggle confirmation, an actual scheduled-run timing measurement, an actual truncation-with-download-link test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Scheduled triggers admin default | **New**: off by default tenant-wide, needs explicit admin enable | 1 |
| ~30-minute scheduled-run ceiling | Reconfirmed, exact match | 2 |
| Scheduled-run timing precision | Confirmed inexact - contention-dependent | 3 |
| Triggers page scope | Confirmed narrower than full inventory - multi-source needed | 4 |
| Truncation mitigation | **New**: download link provided, not silent data loss | 5 |
