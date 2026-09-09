# 4.9.4 API Depth & Writeback - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Depth%20&%20Writeback.md). The core finding there is that writeback into connected third-party systems (Salesforce, Jira, Confluence, Google Docs) appears to be Create + Update only - no Delete action was found anywhere. This guide's job is to confirm that gap directly and to actually time a real writeback, closing the field's own explicitly-requested latency data. Written so someone with no prior context on this project can pick it up and run it - most rows only need everyday workplace tools (Jira, Azure DevOps, Teams, Outlook, Google Docs/Sheets, Excel, Notion), not developer access.

**Tenant entry:** Agent Builder / Glean Chat with at least one write-capable connector enabled (Jira, Azure DevOps, Teams, Outlook, Google Docs, or Notion are all good, common choices) · for Sr No 1 only, a terminal with `curl` and an Indexing API token
**Companion research doc:** [V2/API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Depth%20&%20Writeback.md)
**Base field doc (untouched, original):** [../API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/API%20Depth%20&%20Writeback.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- At least one write-capable connector enabled in your tenant. Prefer a common workplace tool your organization already uses day-to-day - **Jira, Azure DevOps, Teams, Outlook, Google Docs/Sheets, or Notion** are all good choices and don't require any special access beyond your normal login. Salesforce works too if that's what your organization uses, but isn't assumed - most testers won't have a Salesforce license.
- A disposable/test record you're comfortable creating and modifying - a test Jira issue, a test Google Doc, a test Notion page, etc. Do not test against production/real records.
- For Sr No 1 only (testing Glean's own index directly, not a connected app): an Indexing API token and a disposable test datasource - this one genuinely needs a terminal and developer/admin access. If you don't have that, ask a developer colleague to run this row and share the result with you, or mark it `Blocked (no API access available)`.
- A stopwatch or your phone's timer app, for the latency measurement in Sr No 6.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Depth%20&%20Writeback.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine chat interaction using an everyday tool, quick to judge) or `Hard` (needs API/terminal access, or careful timing) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming full CRUD into Glean's own index - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The Indexing API supports create, update, delete, and permission changes against Glean's own index (a disposable test datasource) | 1. Using the Indexing API, index one test document into a disposable datasource.<br>2. Update it.<br>3. Change its permissions.<br>4. Delete it.<br>5. Confirm each operation succeeds. | All four operations (create/update, permission update, delete) succeed against your test datasource. | | Use a disposable/test datasource only - never production indices. This row genuinely needs API/terminal access (there's no everyday-tool equivalent for Glean's own index); if you're not a developer, ask one on your team to run it and share results | ~25 min, Hard (needs API token + terminal) |

## Section 2 - The core test: is there really no Delete action for third-party systems? - Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | For whichever write-capable connector your tenant has (e.g. Jira, Azure DevOps, Teams, Outlook, Google Docs, Notion), you can find Create and Update actions but no Delete/remove action | 1. In Agent Builder or Chat, ask an agent to list the available actions/tools for your enabled connector (e.g. "what actions can you take in Jira?" or "what can you do with Google Docs?").<br>2. Confirm Create and Update-style actions appear.<br>3. Specifically ask/try to find a delete/remove action for that connector. | You confirm Create/Update actions exist, and you find no Delete/remove action anywhere for that connector. | | This is the single most important row in this guide - it's the field's central finding. Pick whichever tool your organization actually uses - Jira, ADO, Teams, Outlook, Google Docs, and Notion are all good, commonly-available choices | ~15 min, Easy |
| 3 | A representative write action - e.g. Jira's "Update Issue" or Azure DevOps' "Update Work Item" (Salesforce's "Update Opportunity" is the equivalent if that's what you use) - supports many different fields, including custom ones, but is genuinely update-only | 1. Ask an agent to update a test record's field in your chosen tool - a standard field first (e.g. a Jira issue's status or description), then a custom field if your organization has any configured.<br>2. Confirm both work.<br>3. Confirm there's no equivalent "create new [record] from scratch" or "delete [record]" action in that same tool group (create is covered separately in Sr No 2; this row is specifically checking that update reaches custom fields too, and that delete still doesn't exist). | The update succeeds for both standard and custom fields, and no delete counterpart action is found. | | If your organization uses Salesforce and prefers to test with its "Update Opportunity" action instead, that works exactly the same way - the finding is the same regardless of which connector you use | ~15 min, Easy |

## Section 3 - Confirming who actually performs the write, and that it can't be silently skipped - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The write happens under your own individual identity (your own OAuth connection to that system), not a shared service account | 1. Trigger a write action (e.g. update a test Google Doc, or a test Jira issue) as yourself.<br>2. Check the resulting change's "last modified by" / audit trail / history in the target system itself (e.g. Google Docs version history, or a Jira issue's activity log) - does it show your name, or a generic Glean service account? | The target system's own audit trail shows the change was made by you personally, not a shared/generic account. | | | ~15 min, Easy |
| 5 | Every write action pauses for your confirmation by default, and there's no way to make this silently skip, even via aggressive automation settings | 1. Trigger a write action normally - confirm the pause-for-approval panel appears.<br>2. If you have access to any "auto mode" or "bypass permissions" style setting in an agent or automation client connected to Glean, enable it and try the write action again. | The confirmation panel still appears even with aggressive automation settings enabled - proving it can't be silently bypassed. | | | ~15 min, Easy |

## Section 4 - Closing the field's own explicitly-requested gap: how fast is a real writeback? - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | No documentation states writeback latency - this has to be timed directly | 1. Trigger a write action (e.g. update a test Jira issue, Google Doc, or Notion page).<br>2. Start your timer the moment you click "Approve" on the confirmation panel.<br>3. Stop your timer the moment the change is visibly reflected in the target system.<br>4. Repeat 3-5 times and take the average. | You get a real, concrete average latency number (e.g. "writes took an average of 2.3 seconds from approval to visible change") - filling a real gap in Glean's public documentation. | | This directly closes the field's own evaluation methodology request for writeback latency data | ~20 min, Hard (multiple timed runs) |

## Section 5 - Confirming the current real action-catalog size - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Glean's action catalog is genuinely larger than the "12 first-party core" figure found in earlier research - currently 85+ per Glean's own marketing | 1. Open `glean.com/blog/85-new-actions-in-agents` yourself and confirm the "85+" figure.<br>2. In your own tenant's **Admin Console → Platform → Actions**, count how many action packs/templates are actually available to enable (not necessarily all enabled). | You confirm the 85+ figure on Glean's site, and you get a sense of how many are actually available in your own tenant's catalog (which may be a subset). | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Depth%20&%20Writeback.md), and specifically add the real latency numbers from Sr No 6 to close that documentation gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Full CRUD into Glean's own index | 1 | | | | |
| 2. No Delete action for third-party systems | 2 | | | | |
| 3. Per-user identity + confirmation can't be bypassed | 2 | | | | |
| 4. Writeback latency measurement | 1 | | | | |
| 5. Current action-catalog size | 1 | | | | |
