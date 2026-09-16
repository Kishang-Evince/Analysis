# 4.9.1 Configuration Complexity - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Configuration Complexity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Configuration%20Complexity.md), timing the actual baseline setup for this specific tenant stack.

**Tenant entry:** `https://app.glean.com` → Admin Console
**Companion research doc:** [V2/Configuration Complexity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Configuration%20Complexity.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Admin/Super Admin access.
- A stopwatch or phone timer - this guide is largely about measuring real elapsed time, not just pass/fail.
- **User B** and **User C** identities set up per [Pre-Flight](../Pre-Flight.md), for the phased-rollout test.
- Connector admin credentials for the 8-app stack (Google Workspace admin for Drive/Gmail/Docs/Sheets, Microsoft 365 admin for Teams/Outlook/OneDrive, Notion workspace admin) - needed if connectors for this stack aren't already live from Pre-Flight.

**Sr No mapping:** Sr No 1-4 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Baseline Assistant setup is really just 3 required steps | 1. Start your stopwatch.<br>2. Go to **Admin Console → Platform → Assistant**, click **Activate**.<br>3. Under **Assign teammates**, choose either "Enabled for all users" or "Enabled for test group only."<br>4. Click **Enable** to confirm.<br>5. Stop the stopwatch. | You completed exactly these 3 clicks/decisions with no undocumented extra step blocking you, and you have a real elapsed-time number (e.g. "4 minutes 30 seconds"). | | Record the real time - this is the data point Sr No 4 needs | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The phased-rollout option ("test group only") really restricts access | 1. Repeat Sr No 1's activation but choose **"Enabled for test group only"** and add only **User C** to that group.<br>2. Log in as **User B** (not in the test group) and check whether Assistant is available to them.<br>3. Log in as **User C** and confirm Assistant is available. | User B does not see Assistant enabled; User C does. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Optional customization adds real, separate configuration effort | 1. Start a fresh stopwatch.<br>2. Under **Customize Glean Assistant**, configure all 4 optional items: (a) select an LLM provider/access method in Model Hub, (b) add one content-exclusion rule (e.g. exclude a test folder in Google Drive from Assistant access), (c) add one custom instruction (e.g. "Only respond in a formal tone"), (d) add disclaimer text.<br>3. Stop the stopwatch once all 4 are saved. | All 4 optional items are configurable, each requiring a distinct decision, and you have a separate timing number from the Sr No 1 baseline. | | Time this separately - don't merge it into the Sr No 1 number | ~30 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | No published time-to-configure benchmark exists, so your own timed runs are the first real data point | 1. Search `docs.glean.com` and `glean.com` for any stated "setup takes X minutes/hours" claim.<br>2. Compare against your Sr No 1 and Sr No 3 timings. | No published benchmark is found anywhere - your two real timings (baseline vs. baseline+customization) become the reference data for this evaluation. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 4 | | | | |

Copy results back into [V2/Configuration Complexity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Configuration%20Complexity.md), including both real timing numbers from Sr No 1 and 3.
