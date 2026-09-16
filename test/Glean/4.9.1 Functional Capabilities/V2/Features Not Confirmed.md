# 4.9.1 Features Not Confirmed - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Features Not Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md), using the tenant's real test stack wherever a claim can be reproduced hands-on.

**Tenant entry:** `https://app.glean.com` → Admin Console (Users & permissions, Connectors)
**Companion research doc:** [V2/Features Not Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Complete [Pre-Flight](../Pre-Flight.md): **Admin A**, **User B** identities; `Stratos_Connector_Test_Doc`/`Stratos_Connector_Test_Sheet` in Google Drive; Notion page shared with the Glean integration; Google Workspace connector (covers Drive/Gmail/Docs/Sheets) live and healthy.
- One test file over 64 MB and one between 16.875 MB and 64 MB, ready to upload to Google Drive or OneDrive, for Sr No 3-4.
- Access to your Google Workspace admin console, for Sr No 5 (credential rotation).
- One volunteer non-technical colleague for Sr No 9.

**Sr No mapping:** Sr No 1-9 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No Glean-specific ABAC capability exists | 1. Log in as **Admin A**.<br>2. Go to **Admin Console → Users & permissions**.<br>3. Look through every sub-page (User roles, People data, Third-party access) for any rule builder based on attributes (e.g. "if document has tag X and user department = Y") rather than named roles.<br>4. Try to construct a permission rule for `Stratos_Connector_Test_Doc` based on an attribute rather than a role. | No attribute-based rule builder exists anywhere in Admin Console - only role/group-based controls. | | | ~15 min, Easy |
| 2 | Glean's access model is named "permission mirroring and least privilege," not branded "RBAC" | 1. In **Admin Console → Users & permissions → User roles**, note the exact terminology used for how permissions work (roles, groups, mirrored source permissions).<br>2. Check whether any in-product help text or tooltip uses the term "RBAC." | Roles exist functionally (Admin/Member), but nothing in the product UI labels the overall model "RBAC" - it's described in terms of mirroring source-system permissions. | | | ~10 min, Easy |
| 3 | A document over 64 MB is not downloaded/crawled at all; one between 16.875 MB and 64 MB gets truncated at indexing | 1. Upload your over-64MB test file to the shared Google Drive folder used for `Stratos_Connector_Test_Doc`.<br>2. Wait one full crawl cycle (check **Admin Console → Platform → Connectors → Google Drive** for last-crawl time), then search for unique text from the end of that file - expect no hit at all.<br>3. Upload your 16.875-64MB test file the same way; wait for crawl; search for unique text from near the end of the file. | The over-64MB file produces zero search hits (never indexed). The 16.875-64MB file is searchable for content near the start, but a search for unique text near the end returns nothing (truncated). | | | ~30 min, Hard (needs large test files + crawl wait) |
| 4 | OCR is enabled only for some connectors, and even then doesn't bypass the 64 MB limit | 1. In **Admin Console → Platform → Connectors**, open the settings for Google Drive, OneDrive, and Notion individually and check whether an OCR toggle is present and what it's set to.<br>2. Upload an over-64MB scanned-image PDF to whichever connector has OCR enabled.<br>3. Confirm it's still not indexed. | OCR toggle presence/state is inconsistent across the three connectors, and even with OCR on, the over-64MB file still isn't indexed. | | | ~25 min, Hard |
| 5 | Credential rotation is documented and works as described for Google Workspace | 1. In your Google Workspace admin console, generate a new service-account JSON key for the account Glean uses.<br>2. In **Admin Console → Platform → Connectors → Google Drive** (or the shared Google Workspace connector settings), update the credential to the new key.<br>3. Search for `Stratos_Connector_Test_Doc` to confirm the connector still works.<br>4. Delete the old key in Google Workspace admin. | The connector continues working after rotation with no broken searches or errors. | | | ~30 min, Hard (needs Google Workspace admin access) |
| 6 | No visible admin control exists for server-side caching behavior | 1. Search Admin Console thoroughly (Platform, Management, Assistant sections) for any setting mentioning "cache," "TTL," or "invalidate."<br>2. Run the identical search for `Stratos_Connector_Test_Doc` twice within a few seconds and compare response times as an informal signal (not proof either way). | No cache-related admin control is found anywhere in the UI. | | | ~15 min, Easy |
| 7 | No published throughput/concurrency benchmark exists | 1. Ask your Glean account team, in writing, for an official performance benchmark document. | None provided, or only anecdotal/marketing language. | | | ~15 min active + wait for reply, Easy |
| 8 | The third-party "26 nodes / $10k+/month for 20 users" claim should be verified directly with Glean | 1. Ask your Glean account team, in writing: *"A third-party blog claims a 20-user Customer Hosted POC required 26 high-memory nodes and $10K+/month - can you confirm or refute this?"* | You get a direct, comparable answer from Glean. | | Record the answer verbatim regardless of outcome | ~10 min active + wait for reply, Easy |
| 9 | Non-technical UX quality requires a live session, not documentation review | 1. Give your non-technical volunteer three tasks using the real tenant stack: find `Stratos_Connector_Test_Doc` in Search, ask Assistant to summarize it alongside the Notion project page, and ask Assistant to draft a short reply referencing the Teams channel message.<br>2. Note where they hesitate or need help. | You get real, first-hand qualitative feedback - the point of this row is that it can only be closed by doing this, not by more documentation reading. | | Same underlying test as the UI/UX Quality guide Sr No 5 - reuse if already run | ~30 min, Hard (or ~0 min if reused) |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 9 | | | | |

Copy results back into [V2/Features Not Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md), pasting the account team's verbatim answers for Sr No 7-8.
