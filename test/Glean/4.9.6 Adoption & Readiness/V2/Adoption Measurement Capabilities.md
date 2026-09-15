# 4.9.6 Adoption Measurement Capabilities - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc.
**Tenant entry:** Glean admin console -> Insights (requires Insights Moderator role) · `developers.glean.com` API docs/API key for the Insights API test
**Companion research doc:** [V2/Adoption Measurement Capabilities.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Measurement%20Capabilities.md)
**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc.
**How to record a result:** Pass/Fail/Partial/Blocked + Notes.
**Effort column:** time estimate + Easy/Hard tag.

---

## Section 1 - Organizational and team-level dashboards - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Insights Overview tab shows Coverage/Activity/Stickiness org-level metrics | 1. In the Glean admin console, open Insights -> Overview.<br>2. Confirm Coverage, Activity, and Stickiness metrics are shown, plus total searches/interactions/agent runs. | You see all three named metrics plus the supporting usage counts. | | Requires Insights Moderator role - confirm you have it, or Blocked | ~10 min, Easy |
| 2 | Departments and Managers views segment usage by team/hierarchy | 1. Open Insights -> Departments. Confirm department-level breakdown of the same metrics.<br>2. Open Insights -> Managers. Confirm manager-hierarchy comparison is available.<br>3. Check both for a product usage table (Search/Chat/Agents) by group. | Both views load and show segmented metrics and product usage tables. | | | ~15 min, Easy |

---

## Section 2 - Natural-language analytics and API export - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Insights chat answers natural-language adoption questions with tables/charts/CSV | 1. Open Insights -> Insights chat (or equivalent entry point).<br>2. Ask: "Which departments have the highest Glean adoption?"<br>3. Confirm you get a table or chart response, and check for a CSV/download option. | You get a relevant answer with exportable output. | | | ~15 min, Easy |
| 4 | A dedicated Insights API exists for programmatic export | 1. With an API key/admin access, call `POST /rest/api/v1/insights` per `developers.glean.com` docs (or ask your Glean admin/IT team to do this if you lack API credentials).<br>2. Confirm the response returns aggregated usage data. | You get a successful API response with usage/analytics data. | | May require IT/admin involvement for API credentials | ~20 min, Easy-Hard (depends on API access) |

---

## Section 3 - The open question: individual-level workflow completion - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Individual-level data is limited to activity presence/volume, not confirmed task/workflow-completion tracking | 1. In Insights Overview, find the "all signed up users" individual activity table.<br>2. Try to determine whether it shows only activity counts, or also whether specific multi-step workflows/agent tasks were completed end-to-end for that user.<br>3. If you can find a specific "task completed" signal at the individual level, note it - this would update the research doc's finding. | You get a clear determination either way: activity-only, or genuine task-completion tracking exists. | | This is the one genuinely open question from the research pass - result matters for closing the field | ~15 min, Easy |

---

## Section 4 - Retention, access control, and remaining dashboard tabs - Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Insights requires the Insights Moderator role and guarantees 270 days of data | 1. Check your own or a colleague's role assignment for Insights access.<br>2. Look for any stated data-retention window in the Insights UI or settings. | You confirm the role gate exists and can find (or fail to find) a stated retention window in the live tenant UI. | | | ~10 min, Easy |
| 7 | Assistant Insights and LLM Insights sub-tabs exist with dedicated content | 1. Open Insights -> Assistant (or "Glean" tab) and confirm Chat/AI summarization/AI answers/Gleanbot activity is shown.<br>2. Open Insights -> LLM Insights and confirm model-usage-specific data is shown. | Both sub-tabs load with the described content, confirming the search-snippet-only finding from the research doc. | | | ~15 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Org/team dashboards | 2 | | | | |
| 2. Insights chat + API export | 2 | | | | |
| 3. Individual-level workflow completion | 1 | | | | |
| 4. Retention/access control + remaining tabs | 2 | | | | |
