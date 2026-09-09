**Glean Tier 3 Advanced Evaluation**
**Workflow Complexity Ceiling — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/concepts/limits-and-best-practices` and `docs.glean.com/agents/concepts/execution-limits`, plus a targeted search resolving the Company Search result cap's actual source page. Field definition: "Maximum logical structures supported (nested loops, multi-branch trees, parallel agent runs)." Base file at [`../Workflow Complexity Ceiling.md`](../Workflow%20Complexity%20Ceiling.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Workflow Complexity Ceiling.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Workflow%20Complexity%20Ceiling.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The 500-result Company Search cap is reconfirmed as real, but with a content-location correction: it lives on the Company Search tool's own dedicated page, not the general limits-and-best-practices page checked first. That general page instead confirms the batching guidance precisely, with real, quotable JQL-style examples for both date-range and categorical-field batching. This pass also finds a genuinely useful caveat: setting a tool's result count to "As many as possible" can itself overload the agent's context and cause truncation — meaning the fix for hitting a limit isn't always "ask for more," and can make things worse.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | **Content-location correction**: the 500-result Company Search cap is real and confirmed, but lives on the Company Search tool's own dedicated documentation page, not the general limits-and-best-practices page | Search-corroborated — [docs.glean.com/tools/glean/company-search](https://docs.glean.com/tools/glean/company-search) | Confirmed via search: *"Company Search returns a maximum of 500 results per step in Glean agents."* A direct fetch of the general limits page found no mention of this specific figure — this is the correct, precise source to cite for this exact number. |
| 2 | **New, genuinely useful finding**: setting a tool's result count to "As many as possible" can itself cause context overload and truncation — meaning requesting more results isn't a safe way to work around a suspected limit, and can actively make output quality worse | Search-corroborated — [docs.glean.com/tools/glean/company-search](https://docs.glean.com/tools/glean/company-search) | Confirmed: *"using 'As many as possible' for the number of search results can overload context and lead to truncation,"* with the documentation recommending *"specific queries and limit the number of results to improve reliability"* instead. This directly reinforces, with a concrete mechanism, why the docs' own batching guidance (claim 3) is the right approach rather than simply raising a result-count parameter. |
| 3 | The batching guidance (date-range and categorical-field splitting) is confirmed directly, with real example syntax | [docs.glean.com/agents/concepts/limits-and-best-practices](https://docs.glean.com/agents/concepts/limits-and-best-practices) | Verbatim, date-range batching: *"split queries by date range. For example, query one month at a time using JQL like `project = ABC AND created >= "2025-01-01" AND created < "2025-02-01"`."* Field-based batching: *"split queries by a categorical field such as status, priority, or assignee."* The page also generally advises: *"Start with a lower result count and increase it only when your agent's answers are missing relevant context"* — a conservative-by-default recommendation. |
| 4 | The ~30-minute scheduled-run ceiling and the tool-call-budget/response-truncation mechanics (with a download-link mitigation) are reconfirmed via cross-reference to this project's own fresh research on the same execution-limits page, done for the Trigger Types Supported field in this same pass | Cross-referenced from this project's own 4.9.2 Trigger Types Supported V2 field (claims 2, 5) | No need to re-derive this — the exact same execution-limits page was already read directly for the sibling field in this same research session, confirming *"approximately 30 minutes"* for scheduled runs and a real download-link fallback for truncated tool results. |
| 5 | The supported logical constructs (branches, loops, sub-agent steps, merge-branches, per-step memory scoping) remain accurate on cross-reference to this project's own Multi-Agent Orchestration V2 field, researched in this same pass | Cross-referenced from this project's own 4.9.2 Multi-Agent Orchestration V2 field | No changes needed — the sub-agent step mechanic specifically was independently confirmed there via a direct fetch of the Flow concepts page. |

## Independent read

- Claim 2 is this pass's most practically valuable addition — it directly explains *why* the batching guidance in claim 3 exists, rather than presenting batching as an arbitrary best practice. A tenant admin tempted to just crank up a result-count setting to avoid hitting a ceiling should understand this can backfire.
- Claim 1's content-location correction is a small but real accuracy point — citing the general limits page for the 500-result figure, as the base research's source list implied, would send a reader to a page that doesn't actually contain it.
- Claims 4-5's cross-references demonstrate this pass's efficiency: because the Trigger Types Supported and Multi-Agent Orchestration fields were researched in this same session, their fresh findings directly carry over here without needing duplicate fetches.

## Confidence

**Search-corroborated, content-location corrected** for claims 1, 2. **Doc-Verified** for claim 3 (direct fresh fetch, verbatim quotes). **Cross-referenced, high confidence** for claims 4, 5. Validation date 2026-09-09. Tenant/hands-on verification (the actual 20+-file loop stress test, an actual "As many as possible" overload test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| 500-result Company Search cap | Reconfirmed, correct source is the tool's own page | 1 |
| "As many as possible" overload risk | **New**: more results can hurt, not help | 2 |
| Batching guidance | Confirmed, with real example syntax | 3 |
| Scheduled-run ceiling + truncation mitigation | Reconfirmed via cross-reference | 4 |
| Supported logical constructs | Reconfirmed via cross-reference | 5 |
