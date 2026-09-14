# 4.9.4 Native Connectors - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md). The core finding there is that connector setup time is never published anywhere - a direct gap against this field's own evaluation methodology - while a real, quantified refresh-rate table does exist per connector. This guide's job is to actually time a real connector setup and confirm real-world refresh behavior for a couple of common connectors. Written so someone with no prior context on this project can pick it up and run it - this entire guide uses everyday tools your organization already has (Jira, Google Drive, Teams, Outlook, or Notion).

**Tenant entry:** Admin Console → Platform → Connectors
**Companion research doc:** [V2/Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md)
**Base field doc (untouched, original):** [../Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Native%20Connectors.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- Admin access to at least one common connector your organization uses - Jira, Google Drive, Microsoft Teams, Outlook, or Notion are all good choices for this test and are covered in Glean's published refresh-rate table.
- A stopwatch or phone timer, for the setup-time measurement in Sr No 3.
- A test document/item you can create and edit in your chosen connector's source system, for the refresh-rate measurement in Sr No 4.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console/catalog check, quick to judge) or `Hard` (needs a real timed connector setup, or waiting for a refresh cycle) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the catalog size and category structure - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Your tenant's connector catalog roughly matches the 275+ figure and 12-category structure claimed on Glean's marketing page | 1. Go to **Admin Console → Platform → Connectors → Add connector** (or equivalent catalog browse view).<br>2. Scroll through and confirm the categories match research (Sales & Marketing, Engineering & Analytics, Documents, Project Management, HR, Support, Communication, Design, Learning & Enablement, Calendar, SSO, Intranet).<br>3. Get a rough sense of the total count available (doesn't need to be exact). | The category list matches, and the total count is roughly consistent with "275+" (your tenant may show fewer if some are disabled by policy). | | | ~15 min, Easy |
| 2 | Native connectors (like Jira, Google Drive, Teams) and "Push API"/custom connectors are genuinely different setup experiences, not the same flow with different names | 1. Start setting up a native connector (e.g. Jira or Google Drive) and note the setup flow - does it use pre-built OAuth/API integration screens?<br>2. Separately, look at the custom/Push API connector documentation or setup path and note how it differs (e.g. requires the Indexing API and your own push job, not a pre-built OAuth flow). | You confirm these are genuinely two different setup experiences - one guided/pre-built, one requiring custom integration work. | | | ~15 min, Easy |

## Section 2 - The core test: how long does a real connector setup actually take? - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | No setup-time figure is published anywhere - measure a real one yourself | 1. Pick one native connector you don't already have set up (or can safely reconfigure) - Jira, Google Drive, Teams, Outlook, or Notion are all good choices.<br>2. Start your timer the moment you begin the setup flow (clicking "Add connector").<br>3. Stop your timer the moment the connector shows a healthy/connected status and begins its first crawl.<br>4. Note anything that slowed you down (needing IT/admin approval elsewhere, waiting on OAuth consent, etc). | You get a real, concrete setup-time number (e.g. "Jira connector took 12 minutes from click to healthy status") - filling a real gap in Glean's public documentation. | | This directly closes the field's own evaluation methodology request for setup-time data | ~20-40 min, Hard (a real connector setup, timed) |

## Section 3 - Confirming the published refresh-rate table matches real behavior - Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The published refresh rates are roughly accurate - a documented `<5m` connector (like Jira) updates fast, while a documented `1h` connector (like Teams) updates slower | 1. Pick one connector from the "fast" tier (Jira, Slack, GitLab - all documented `<5m` via webhook) and one from a "slower" tier (Teams `1h`, Zoom `6h`).<br>2. Make a real, distinctive change in each source system (e.g. edit a Jira issue title; post a distinctive Teams message).<br>3. Time how long each takes to show up in a Glean search. | The fast-tier connector reflects the change within roughly the documented window (a few minutes), and the slower-tier connector takes noticeably longer, roughly matching its documented rate. | | | ~20 min active + up to 1 hr waiting for the slower connector, Hard |
| 5 | The refresh mechanism genuinely differs - some connectors update via webhook (event-driven, near-instant) while others poll on a fixed schedule | 1. For your "fast" connector from Sr No 4, check Admin Console for whether it's described as webhook-enabled.<br>2. For your "slower" connector, confirm it's described as scheduled/incremental crawl instead. | You confirm the fast connector is webhook-based and the slower one is polling-based, matching the documented mechanism difference. | | | ~10 min, Easy |
| 6 | If your organization uses ServiceNow, Knowledge Articles specifically refresh much slower (3 days) than other ServiceNow data (Catalog, 1 hour) | 1. If ServiceNow is enabled in your tenant, check whether Knowledge Articles and Catalog data have visibly different refresh cadences in Admin Console.<br>2. If possible, edit a test Knowledge Article and time how long it takes to appear in search, compared to a Catalog item. | You confirm the two data types within the same connector genuinely refresh at different rates, matching the documented 3-day vs. 1-hour split. | | If ServiceNow isn't used in your tenant, mark `Blocked (ServiceNow not enabled)` and skip - the finding is illustrative, not required for every tenant | ~15 min, Easy (or up to 3 days if timing the full Knowledge Article refresh cycle) |

## Section 4 - Does Glean Agents in Microsoft Teams actually work as documented, and does the single-tenant Azure pitfall hit this tenant? (NEW, added 2026-09-14) - Sr No 7-9

*Added after a full-corpus sweep of this project's local Glean documentation crawl found this material, never cited by this field's original research pass. High priority given Teams is in this tenant's in-scope stack.*

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | A Glean agent (not just base search) can be invoked inside Microsoft Teams chat and can execute a real tool action (e.g. open/comment on a ServiceNow or Jira ticket) without leaving Teams | 1. Confirm Glean is installed in this tenant's Teams and at least one agent (e.g. IT or HR) is deployed.<br>2. In Teams, @mention or open the agent and ask it to perform a real tool action (e.g. "open a ServiceNow ticket for X").<br>3. Confirm the action actually executes (check the target system), not just a text response. | The agent responds inside Teams and the tool action is confirmed to have executed in the target system. | | Mark `Blocked (Glean not yet installed in this tenant's Teams)` if not set up | ~20 min, Medium |
| 8 | Setting up Glean in this tenant's Teams required (or would require) coordinated access across Azure Portal, Teams Developer Portal, Teams Admin Center, and Glean Admin Console - not a single-click install | 1. Ask whoever set up (or would set up) this integration whether they needed Azure AD admin access alongside Glean admin access.<br>2. Confirm how many separate portals/consoles were touched during setup. | Setup is confirmed to have required (or would require) multi-portal coordination, matching the documented complexity. | | | ~15 min, Easy (interview-based if already set up) |
| 9 | If this tenant's Azure environment is single-tenant (the norm for regulated healthcare orgs), the documented 401 "Multi tenant" pitfall either was already hit and resolved, or is a known risk to flag before a pilot; separately, Teams meeting-transcript ingestion (the Teams equivalent of Glean's documented Zoom transcript feature) either exists in this tenant or is confirmed absent | 1. Ask the Azure/IT admin whether this tenant's Azure AD is single-tenant or multi-tenant.<br>2. If single-tenant and Teams integration is already live, confirm whether the 401 error was encountered during setup.<br>3. Separately, test whether Glean can summarize or answer questions about a real Teams meeting recording/transcript, the way it's documented to do for Zoom. | Either the 401 pitfall is confirmed as a real, already-navigated risk (or a flagged pre-pilot risk if not yet set up), and the Teams-meeting-transcript question is answered definitively (works / doesn't work) rather than left assumed. | | This closes a real, currently-unanswered gap in this project's research | ~20 min, Medium |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md), and specifically add the real setup-time number from Sr No 3 - that closes the field's most explicitly-requested gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Catalog size, categories, native vs. custom | 2 | | | | |
| 2. Real setup-time measurement | 1 | | | | |
| 3. Refresh-rate table accuracy | 3 | | | | |
| 4. Glean Agents in Teams + Azure single-tenant pitfall (NEW, 2026-09-14) | 3 | | | | |
