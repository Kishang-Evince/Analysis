---
url: "https://docs.glean.com/troubleshooting/spreadsheet-analysis"
canonical: "https://docs.glean.com/troubleshooting/spreadsheet-analysis"
title: "Troubleshooting spreadsheet analysis"
description: "Resolve inaccurate row counts, SharePoint access errors, and mode-related differences when analyzing spreadsheets in Glean Assistant."
fetched_at: "2026-10-13T08:51:23.424Z"
---
On this page

Use this page when you get inaccurate or incomplete answers from Glean Assistant on spreadsheet files.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you troubleshoot, make sure you have the following:

-   **A supported spreadsheet file.** These steps apply to supported spreadsheet files, including `.xls`, `.xlsx`, and `.xlsm`, analyzed in Glean Assistant.
-   **Read access to the spreadsheet file.** Glean honors source-system permissions, so you need to be able to open the file yourself (for example, in SharePoint) for Glean to read it.
-   **The details of the problem.** Note the exact question you asked, the mode you used (fast or thinking), whether you referenced the file by URL or uploaded it, and the answer you expected versus what you received.
-   **(Optional) Admin console access.** Some checks, such as verifying that Glean has indexed a file, require **Glean Protect** access in the **Admin console**.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

Find your symptom below and follow the matching fix.

### Inaccurate row counts or aggregations on a large xlsx file

**Possible cause:** Very large spreadsheets can be truncated when indexed, so only part of the file is available for analysis when the file is referenced by URL.

**Fix:**

1.  **Upload the file directly** to chat instead of referencing the URL. This lets Data Analysis use the uploaded file rather than truncated indexed content, subject to the [chat file-upload limits](/user-guide/assistant/file-upload#upload-limits) that Data Analysis inherits.
2.  **Use thinking mode.** Data Analysis isn't available in fast mode.
3.  **Ask Glean to state how many rows it processed.** If the number looks low, the file was likely truncated at indexing time.
4.  **Simplify the sheet:** remove merged cells, nested tables, and embedded charts. Make sure there's a single clear header row with consistent columns.
5.  **Split the file** into smaller sheets — for example, by region or time period — and analyze each one separately.

### Item requires access error when referencing a SharePoint spreadsheet

**Possible cause:** Glean can't read the SharePoint-hosted xlsx file because the file isn't accessible to the user, isn't indexed yet, or recent permission and location changes haven't propagated.

**Fix:**

1.  **Confirm you can open the file** directly in SharePoint with your own account. Glean honors source-system permissions — if you don't have access in SharePoint, Glean can't read it for you.
2.  **Verify the file is indexed:** in the **Admin console**, go to **Glean Protect → Access verification** (or **Document lookup**) and enter the file URL.
3.  **Allow time for recent changes.** If the file was recently created, renamed, or moved, permission and location updates from SharePoint propagate on the connector's crawl cadence. Wait for the next crawl cycle to complete.
4.  **Upload the file directly** as a workaround. Download the file from SharePoint and upload it to chat.

### Data Analysis isn't available in fast mode

**Possible cause:** Data Analysis isn't included in fast mode's tool set.

**Fix:** Use thinking mode for analytical questions about spreadsheets.

## See also[​](#see-also "Direct link to See also")

-   [Data Analysis: Overview](/administration/assistant/data-analysis/about-data-analysis)
-   [File Upload](/administration/assistant/features/file-upload)
-   [Crawler and indexing size limits](/connectors/crawler-and-indexing-limits)
