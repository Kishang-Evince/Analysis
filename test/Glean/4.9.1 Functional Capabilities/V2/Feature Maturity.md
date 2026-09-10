# 4.9.1 Feature Maturity — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Feature Maturity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Feature%20Maturity.md). Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` → Admin Console
**Companion research doc:** [V2/Feature Maturity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Feature%20Maturity.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites (do this once, reuse across all 8 fields in this section):**
- Complete the section [Pre-Flight](../Pre-Flight.md) if you haven't: confirm Admin access, set up **Admin A** (you), **User B** (restricted member), **User C** (optional), and the standard test content pack:
  - `Stratos_Connector_Test_Doc` (Google Doc) and `Stratos_Connector_Test_Sheet` (Google Sheet), both in a shared Google Drive folder
  - `Exhibit_A_SOW_Stratos.pdf` in the same shared Drive folder
  - A Notion page with the same project name, **shared with the Glean Notion integration**
  - A Gmail message and an Outlook message, both with the project name in the subject
  - A Microsoft Teams channel message referencing the project name
- Admin access to the Model Hub and Assistant settings.
- A Glean API token + terminal for the two API-level rows.

**Sr No mapping:** Sr No 1-6 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Active release cadence | 1. In a browser, open `https://developers.glean.com/changelog`.<br>2. Scroll back exactly 7 calendar days from today.<br>3. Count how many distinct dated entries appear in that window. | You count multiple entries across the week, with at least one date showing 2+ entries posted the same day. | | | ~10 min, Easy |
| 2 | "Experimental" used sparingly | 1. On the same changelog page, use your browser's page-search (Ctrl/Cmd+F) for the word "experimental."<br>2. Scroll through and count how many of the last ~20 entries (by date) contain it. | 1-2 matches at most out of ~20 recent entries — not a recurring label. | | | ~10 min, Easy |
| 3 | Breaking changes are flagged | 1. On the changelog, page-search for the word "breaking."<br>2. Open the first match and read its full entry text. | The entry clearly and explicitly calls out the change as breaking/action-required, not buried in generic release notes. | | | ~10 min, Easy |
| 4 | Deep-linked citations and the Python SDK are both officially labeled beta | 1. Using your Glean API token in a terminal, send a `/chat` request grounded in `Stratos_Connector_Test_Doc` (Google Drive) with `"agentConfig": {"agent": "FAST"}` set.<br>2. Check the developer docs page for this feature for a beta label.<br>3. Separately, open `pypi.org/project/glean-api-client` and check the version label. | Both the docs page and the PyPI page explicitly say "beta" in their own words — not inferred, stated outright. | | | ~15 min, Hard (needs API token + terminal) |
| 5 | Skills launched as a beta feature | 1. In `https://app.glean.com`, look for a "Skills" feature (Admin Console → Assistant, or the Assistant settings area — exact location may vary by tenant version).<br>2. If found, check for a "Beta" label or badge next to it.<br>3. If not visible in your tenant, check `docs.glean.com/user-guide/assistant/skills` for the same label instead. | A visible "Beta" label is present either in-product or in the docs page. | | | ~10 min, Easy |
| 6 | No published SLA or uptime-history document exists | 1. Ask your Glean account team, in writing: *"Can you share a formal SLA document or historical uptime report for our tenant?"*<br>2. Note whether they provide a contractual SLA (a promise), a historical uptime report (a track record), both, or neither. | You get a clear answer distinguishing "we promise X% uptime" from "here is our actual uptime history" — most likely only the former, or neither. | | | ~10 min active + wait for reply, Easy |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 6 | | | | |

Copy results back into [V2/Feature Maturity.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Feature%20Maturity.md).
