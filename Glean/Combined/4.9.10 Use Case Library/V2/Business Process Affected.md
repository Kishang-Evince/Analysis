**Glean Tier 3 Advanced Evaluation**
**Business Process Affected - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/user-guide/assistant/deep-research` and `docs.glean.com/user-guide/mcp/support`. Field definition: "The exact organizational workflow impacted by automation." Base file at [`../Business Process Affected.md`](../Business%20Process%20Affected.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Business Process Affected.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Business%20Process%20Affected.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass finds a real correction worth flagging in the section Overview: MCP-based support-ticket triage does **not** strictly require ServiceNow or Zendesk, as the "out of tenant stack" classification implies - Glean's own documentation lists these as *"recommended connectors,"* not requirements, since the underlying mechanism works across *"any MCP-compatible interface."* This means the ticket-triage use case may be partially achievable on Stratos's actual tenant stack and shouldn't be dismissed outright. Separately, Deep Research's real constraints are now precisely documented: web-app-only (unavailable in Teams/desktop/mobile), admin-gated, Brave-Web-Search-only for external content, with a real 5-30 minute report-generation timeline - useful, concrete detail for scoping it as a possible future use case.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Deep Research is confirmed genuinely out-of-scope for the tenant stack today, but for more precise reasons than a vague connector gap: it is explicitly limited to the web application (unavailable in Teams, desktop, or mobile) and requires admin enablement before any user can access it | [docs.glean.com/user-guide/assistant/deep-research](https://docs.glean.com/user-guide/assistant/deep-research) | Confirmed directly: *"Deep Research must be enabled by your admin before you can use it"* and *"Currently supported on our web application only."* This sharpens the Overview's "out of tenant stack" classification - the barrier is platform/admin-gating, not a missing connector. |
| 2 | Deep Research has a real, documented report-generation timeline useful for planning purposes | [docs.glean.com/user-guide/assistant/deep-research](https://docs.glean.com/user-guide/assistant/deep-research) | Verbatim: *"Generating a full report typically takes 5-30 minutes, depending on the complexity of the query and the number of sources."* |
| 3 | Deep Research's external web-search component is confirmed to run exclusively through Brave Web Search - a specific, real technical detail | [docs.glean.com/user-guide/assistant/deep-research](https://docs.glean.com/user-guide/assistant/deep-research) | Verbatim: *"Deep Research exclusively uses Brave Web Search for all web content."* |
| 4 | **Correction to the Overview's classification**: MCP-based support-ticket triage does not strictly require ServiceNow or Zendesk - Glean's own documentation names these as recommended, not required, connectors, since the underlying mechanism works across any MCP-compatible interface | [docs.glean.com/user-guide/mcp/support](https://docs.glean.com/user-guide/mcp/support) | Confirmed directly: the page lists *"Zendesk or ServiceNow (for ticketing)"* specifically as suggested integrations, while emphasizing the approach works across *"Any MCP-compatible interface"* and can be *"Embedded in support workflows."* This means Stratos should re-evaluate whether some version of ticket-triage assistance is achievable on the actual tenant stack (e.g., via Teams-embedded MCP queries against existing knowledge sources) rather than assuming it requires acquiring ServiceNow/Zendesk first. |
| 5 | Deep Research's three named example workflow patterns are real and specific, useful for scoping what this use case would concretely look like if pursued later | [docs.glean.com/user-guide/assistant/deep-research](https://docs.glean.com/user-guide/assistant/deep-research) | Confirmed directly: **Track** (*"Analyze recent issues faced by a customer... Jira, Gong, and Slack"*), **Learn** (*"Identify new product launches... blogs, marketing materials, and news releases"*), **Analyze** (*"uncover untapped opportunities for expansion... Gong calls, Slack threads, and Salesforce activity"*). None of these named examples use tenant-stack tools directly, but the pattern (multi-source synthesis into a long-form report) is stack-agnostic and could be reframed around Notion/Drive/Teams sources instead. |
| 6 | The UC-01 through UC-08 baseline-process-to-automated-step mappings remain accurate on cross-reference to this project's own extensive prior hands-on and documentary V2 research - no changes needed to the substantive process descriptions themselves | Cross-referenced across this project's 4.9.1-4.9.9 V2 fields | Each mapping (ACL-filtered unified search, cited Assistant answers with deep links, Teams-embedded sidebar queries, Agent Builder summarization, Go Links/Answers ticket deflection, Notion/Drive Collections) traces to a specific, already-confirmed capability elsewhere in this project. This pass's fresh contribution is concentrated on the two previously-under-documented "out of tenant stack" items (claims 1, 4), not the eight in-scope use cases themselves. |

## Independent read

- Claim 4 is this pass's most actionable finding - it directly challenges an assumption baked into the section Overview (that ticket triage is categorically out of scope) and should prompt a real conversation about whether a scoped-down version of this use case belongs in the tenant-stack library after all, even without ServiceNow/Zendesk.
- Claims 1-3 and 5 give Deep Research enough concrete detail (timeline, platform limits, admin gate, example patterns) that it could be presented to a client as a "future phase" use case with real specifics, rather than left as a vague "not evaluated" footnote.
- Claim 6's honest "nothing changed" for the eight core use cases reflects how much of this field's substance was already established through this project's own hands-on work - this pass's job was to sharpen the boundary cases, not re-verify the well-established core.

## Confidence

**Doc-Verified** for claims 1, 2, 3, 5 (direct fresh fetches, verbatim quotes). **Doc-Verified, a direct correction** for claim 4. **Cross-referenced** for claim 6. Validation date 2026-09-09. Tenant/hands-on verification (an actual admin-enabled Deep Research test, an actual MCP ticket-triage feasibility check against tenant-stack sources) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Deep Research's real barrier | Web-app-only + admin-gated, not a connector gap | 1 |
| Deep Research timeline | 5-30 minutes per report | 2 |
| Deep Research web search | Brave Web Search exclusively | 3 |
| MCP ticket triage requirement | **Corrected**: ServiceNow/Zendesk recommended, not required | 4 |
| Deep Research example patterns | Track / Learn / Analyze - real, reusable for other sources | 5 |
| UC-01 through UC-08 mappings | Reconfirmed via cross-reference; no changes | 6 |
