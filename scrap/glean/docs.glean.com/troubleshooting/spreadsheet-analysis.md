---
url: "https://docs.glean.com/troubleshooting/spreadsheet-analysis"
canonical: "https://docs.glean.com/troubleshooting/spreadsheet-analysis"
title: "Troubleshooting spreadsheet analysis"
description: "Resolve inaccurate row counts, SharePoint access errors, and mode-related differences when analyzing spreadsheets in Glean Assistant."
fetched_at: "2026-09-01T13:30:36.885Z"
---
On this page

Use this page when you get inaccurate or incomplete answers from Glean Assistant on spreadsheet files.

### Inaccurate row counts or aggregations on a large xlsx file

**Possible cause:** Very large spreadsheets can be truncated when indexed, so only part of the file is available for analysis when the file is referenced by URL.

**Fix:**

1.  **Upload the file directly** to chat instead of referencing the URL. Direct uploads run Data Analysis over the full file contents.
2.  **Switch to thinking mode.** Large-file analysis improvements apply in thinking mode. If you're in fast mode, switch and retry the same question.
3.  **Ask Glean to state how many rows it processed.** If the number looks low, the file was likely truncated at indexing time.
4.  **Simplify the sheet:** remove merged cells, nested tables, and embedded charts. Make sure there's a single clear header row with consistent columns.
5.  **Split the file** into smaller sheets — for example, by region or time period — and analyze each one separately.

### Item requires access error when referencing a SharePoint spreadsheet

**Possible cause:** Glean can't read the SharePoint-hosted xlsx file because the file isn't accessible to the user, isn't indexed yet, or recent permission and location changes haven't propagated.

**Fix:**

1.  **Confirm you can open the file** directly in SharePoint with your own account. Glean honors source-system permissions — if you don't have access in SharePoint, Glean can't read it for you.
2.  **Verify the file is indexed:** in the Admin Console, go to **Glean Protect → Access verification** (or **Document lookup**) and enter the file URL.
3.  **Allow time for recent changes.** If the file was recently created, renamed, or moved, permission and location updates from SharePoint propagate on the connector's crawl cadence. Wait for the next crawl cycle to complete.
4.  **Upload the file directly** as a workaround. Download the file from SharePoint and upload it to chat.

### Fast mode and thinking mode return different answers

**Possible cause:** Fast mode is optimized for speed, while thinking mode is better for multi-step reasoning over large or complex spreadsheets — such as counting rows that match a filter, or aggregating values across thousands of records.

**Fix:** If a spreadsheet answer looks incomplete or inaccurate in fast mode, retry the same question in thinking mode.

## See also[​](#see-also "Direct link to See also")

-   [Data Analysis: Overview](/administration/assistant/data-analysis/about-data-analysis)
-   [File Upload](/administration/assistant/features/file-upload)
-   [Crawler and indexing size limits](/connectors/crawler-and-indexing-limits)
