# 4.9.1 Error Handling & Recovery - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Error Handling & Recovery.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Error%20Handling%20%26%20Recovery.md), using the tenant's real test stack to trigger each failure mode.

**Tenant entry:** `https://app.glean.com` (Search, Assistant, Agent Builder) + a terminal with a Glean API token for the API-level rows
**Companion research doc:** [V2/Error Handling & Recovery.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Error%20Handling%20%26%20Recovery.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Complete [Pre-Flight](../Pre-Flight.md): `FY27_Exec_Compensation.xlsx` (private, owner-only, in OneDrive or Google Drive), `Stratos_Connector_Test_Doc`/`Stratos_Connector_Test_Sheet` (shared Drive folder), `Exhibit_A_SOW_Stratos.pdf`, Notion page shared with the Glean integration, Gmail/Outlook messages, Teams channel message.
- **Admin A** and **User B** identities (User B has no access to `FY27_Exec_Compensation.xlsx`).
- A Glean API token and terminal (`curl` or Python) for Sr No 1-2.

**Sr No mapping:** Sr No 1-5 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Typed errors (`GleanError` / `GleanDataError`) work as documented | 1. As **User B**, use the Search API to query the unique content of `FY27_Exec_Compensation.xlsx` (a file User B has no access to) - this should trigger a `403`.<br>2. Separately, send a deliberately malformed search query (e.g. an invalid facet filter value) - this should trigger a `422`.<br>3. In your script, catch both and print the exception class name for each. | Both the `403` and `422` calls raise `errors.GleanDataError` specifically (with a `.data` payload), while a generic call error elsewhere raises the base `errors.GleanError`. | | | ~20 min, Hard (needs API access + User B's token) |
| 2 | `429` rate-limit responses come with documented, retry-friendly guidance | 1. In a short script, fire repeated Search API calls against `Stratos_Connector_Test_Doc` in a tight loop until you get a `429`.<br>2. Apply the documented exponential-backoff retry pattern (`2 ** attempt` seconds) and confirm the next attempt succeeds. | You hit a `429`, then the backoff retry succeeds on a subsequent attempt. | | Stop firing requests as soon as you confirm one `429` - don't sustain the burst | ~20 min, Hard |
| 3 | Scheduled agent runs that exceed the execution cap terminate without a clear application error | 1. Build a Workflow-mode agent with a scheduled (recurring) trigger.<br>2. Give it a deliberately slow task: e.g. summarize `Exhibit_A_SOW_Stratos.pdf`, then cross-reference every message in the Teams channel and every Notion page shared with the integration, one at a time rather than in batch.<br>3. Let the scheduled run execute and run past the ~30-minute mark without intervening.<br>4. Note exactly what the end user sees at cutoff - a clear error, a silent stop, or a partial result. | You get a concrete, written description of the actual cutoff behavior - confirming or correcting the "unclear error" finding. | | Same underlying test as the Agent Autonomy Level guide Sr No 5 - reuse that result if already run | ~35 min, Hard (or ~0 min if reused) |
| 4 | Context/token overflow causes a silent partial read with no visible warning | 1. Combine `Exhibit_A_SOW_Stratos.pdf`, `Stratos_Connector_Test_Doc`, the Notion project page, and the full Teams channel history into one Assistant summarization request (e.g. "summarize everything about this project across these sources").<br>2. Compare the summary's coverage against the full combined content - check whether content from sources listed later in the request is thin or missing.<br>3. Look for any visible truncation notice in the response UI. | The summary shows uneven coverage (later sources under-represented), and no visible warning explains why. | | Same underlying test as the Context Window & Memory guide Sr No 5 - reuse if already run | ~30 min, Hard (or ~0 min if reused) |
| 5 | The tool-call budget cutoff message/number is real but undisclosed | 1. Build an Auto-mode agent that, instead of batch-fetching, loops through the Teams channel, the Gmail message, the Outlook message, the OneDrive file, and the Notion page **one tool call at a time** in a way that racks up calls quickly.<br>2. Run it until it stops on its own.<br>3. Record the exact number of tool calls made and the exact cutoff message shown. | You obtain a real, specific number and exact wording - the number the public docs never disclose. | | Same underlying test as the Agent Autonomy Level guide Sr No 3 - reuse if already run | ~30 min, Hard (or ~0 min if reused) |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 5 | | | | |

Copy results back into [V2/Error Handling & Recovery.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Error%20Handling%20%26%20Recovery.md).
