**Glean Tier 3 Advanced Evaluation**
**Adoption Measurement Capabilities - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Does the tool provide usage analytics that would support a FlightPlan(TM) deployment? Look for built-in dashboards showing user activity, feature adoption rates, workflow completion, and engagement trends. Evaluate whether usage data can be exported via API or reporting. Note whether analytics are available at individual, team, and organizational levels." Base file: none exists yet - this is a new field added to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md). Cross-reference: this project's `4.9.1 Functional Capabilities/V2/Features Confirmed.md` (row 62) already flagged Glean's "Insights chat" and "Admin chat" as newly-discovered admin-facing analytics features from a Feb 2026 blog post - this doc goes deeper into the actual Insights dashboard product (`docs.glean.com/administration/insights/`) rather than duplicating that entry-point finding.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Adoption Measurement Capabilities.md](../../../../test/Glean/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Measurement%20Capabilities.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean has a purpose-built admin analytics product called **Insights** (`docs.glean.com/administration/insights/`) with named dashboard tabs for Overview, Assistant, Departments, Managers, and an LLM-usage breakdown, plus a natural-language "Insights chat" interface and a dedicated **Insights API** for programmatic export. This is a strong, well-documented match to the field's requirements: dashboards exist, org/team-level segmentation exists, and API export exists. The one gap found is genuine individual-level analytics beyond a raw "all signed up users" activity table - true per-user "workflow completion" tracking was not confirmed.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean's Insights dashboard tracks three named "health metrics" - Coverage, Activity, and Stickiness - at the organizational level | [docs.glean.com/administration/insights/overview](https://docs.glean.com/administration/insights/overview) | Verbatim: *"Coverage (Signups/Employees), Activity (Monthly Active Users/Signups), and Stickiness (Weekly/Monthly Active Users)."* Additional metrics confirmed on the same page: total searches, Glean interactions, agent runs, and daily/weekly/monthly active user counts. |
| 2 | Team-level (department and manager-hierarchy) segmentation is a dedicated, named feature, not just a generic filter | [docs.glean.com/administration/insights/departments-and-managers/](https://docs.glean.com/administration/insights/departments-and-managers/) | Verbatim: *"Departments view segments usage by individual departments from your org chart"* and *"Managers view enables analysis by manager hierarchy levels, allowing comparison of peer managers at the same reporting depth."* Both use the same three health metrics as claim 1, plus a "product usage table breaking down Search, Glean/Chat, and Agents user counts by department or manager grouping" - directly matching the field's "feature adoption rates" language. |
| 3 | A natural-language "Insights chat" interface exists, letting admins ask ad hoc adoption questions and get tables/charts/CSV output without navigating pre-built dashboards | [glean.com/blog/insights-admin-chat](https://www.glean.com/blog/insights-admin-chat), [docs.glean.com/administration/insights/insights-chat](https://docs.glean.com/administration/insights/insights-chat) | Verbatim from the blog: Insights chat *"translates your natural-language questions into the right data requests, executes them using Python and SQL tools"* and returns *"answers as tables, charts, and downloadable reports."* Example query given: *"Which departments have the highest Glean adoption?"* The same source confirms "recurring adoption reports" can be automated within the interface. |
| 4 | A dedicated Insights API exists for programmatic export of usage/analytics data | [developers.glean.com/api/client-api/insights/overview](https://developers.glean.com/api/client-api/insights/overview) | Verbatim: *"The Insights API provides access to aggregated analytics and usage data about users, queries, and content within your Glean instance."* Endpoint confirmed: `POST /rest/api/v1/insights`, described as supporting "usage analytics, performance metrics tracking, and business intelligence reporting for dashboards and custom reports." This directly closes the field's "exported via API or reporting" sub-question with a positive finding. |
| 5 | Individual-level data exists but appears limited to a raw activity table ("all signed up users"), not confirmed as true per-user workflow-completion or task-level tracking | [docs.glean.com/administration/insights/overview](https://docs.glean.com/administration/insights/overview) | The Overview page was confirmed to display "'All signed up users' in a table showing individual activity" - this is real individual-level visibility, but no page found this pass described tracking a specific workflow's completion (e.g., "agent run X was started and finished by user Y") at the individual level; the confirmed individual granularity is activity presence/volume, not task/workflow completion state. |
| 6 | Insights access is role-gated (Insights Moderator role) and data is retained for a guaranteed 270-day window | [docs.glean.com/administration/insights/overview](https://docs.glean.com/administration/insights/overview) | Verbatim: *"Insights access is restricted to users with the Insights Moderator role, as defined by your Glean admins"* and *"The Insights dashboard guarantees data availability for the last 270 days."* Both are practical planning details - not every admin sees this by default, and historical trend analysis beyond ~9 months is not guaranteed. |
| 7 | A separate Assistant-specific Insights tab covers Chat/AI summarization/AI answers/Gleanbot activity, and a separate LLM Insights view exists for model-usage tracking | Search-corroborated titles: [docs.glean.com/administration/insights/assistant-insights](https://docs.glean.com/administration/insights/assistant-insights), [docs.glean.com/administration/insights/llm-insights](https://docs.glean.com/administration/insights/llm-insights) | Page titles and search-snippet context confirm dedicated sub-views exist beyond the general Overview/Departments/Managers tabs - an Assistant-specific engagement view and an LLM-usage view. Not independently fetched in full this pass (search-snippet confirmation only); flagged in the companion test guide for a tenant-side deep look. |

## Independent read

- This field is a genuine strength for Glean relative to the other new-field findings in this pass - it is the most thoroughly documented of the 5 fields, with a real product (not just a marketing claim), a real API, and multiple corroborating pages. Worth reporting as a positive finding with confidence, not hedged.
- The one honest gap (claim 5) matters specifically because the field's language calls out "workflow completion" by name - Glean's dashboards clearly show *that* people are active and *which* product areas they use, but not obviously *whether a specific multi-step task was completed end-to-end*. That's a real distinction worth testing hands-on in a live tenant rather than assuming either way from docs alone.
- The 270-day retention cap (claim 6) is a planning detail a FlightPlan-style deployment should know upfront - if the client wants pre/post rollout comparison data older than ~9 months, that needs a proactive export/archival plan via the Insights API (claim 4) rather than relying on the dashboard's own history.

## Confidence

**Doc-Verified**, directly fetched, for claims 1, 2, 4, 5, 6 (all confirmed via direct page fetch with verbatim quotes). **Search-corroborated** for claim 3 (blog post fetched directly; docs page corroborated via search snippet). **Search-snippet only, not independently re-fetched in full** for claim 7 - flagged for tenant-side verification. Validation date 2026-09-14, cross-checked against 5 distinct docs.glean.com/developers.glean.com pages plus one glean.com blog post.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Built-in dashboards | Yes - Overview, Assistant, Departments, Managers, LLM Insights tabs | 1, 2, 7 |
| Feature adoption rates | Yes - product usage table by department/manager (Search/Chat/Agents) | 2 |
| Workflow completion tracking | Not confirmed at individual level - activity volume yes, task-completion state unclear | 5 |
| Engagement trends | Yes - Coverage/Activity/Stickiness metrics, MAU/WAU trending | 1 |
| API/export | Yes - dedicated Insights API, POST /rest/api/v1/insights | 4 |
| Individual / team / org levels | Individual (activity table), team (Departments/Managers views), org (Overview) - all three confirmed present | 1, 2, 5 |
| Access control & retention | Insights Moderator role required; 270-day data guarantee | 6 |
