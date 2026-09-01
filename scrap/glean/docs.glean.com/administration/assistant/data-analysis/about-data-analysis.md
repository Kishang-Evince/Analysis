---
url: "https://docs.glean.com/administration/assistant/data-analysis/about-data-analysis"
canonical: "https://docs.glean.com/administration/assistant/data-analysis/about-data-analysis"
title: "Data analysis overview"
description: "Learn how to analyze structured data, including CSV, XLSX, and JSON files, using Glean's data analysis capabilities in Assistant"
fetched_at: "2026-09-01T13:28:59.933Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean's Data Analysis for Structured Files feature in Glean enables users to analyze CSV, XLSX, and JSON files directly through the chat interface. This powerful capability helps users across finance, sales, support, and IT teams save significant time on ad hoc analyses.

### Example analysis capabilities[​](#example-analysis-capabilities "Direct link to Example analysis capabilities")

You can ask questions about your data in various ways:

### Dataset exploration

Example: "What columns does my data contain?"

### Column statistics

Example: Calculate averages, sums, and counts

### Data distribution

Examples:

-   Find top/bottom x values
-   Determine the range of values in a column
-   List all unique values in a column

### Data relationships

Example: "How does conversion change by lead source?"

### Time-series analysis

Example: "What product area has seen increased tickets compared to previous months?"

## Key features[​](#key-features "Direct link to Key features")

### Assistant UX

Analyze data from uploaded files or indexed files by tagging them or pasting their link in Assistant. Generate output files and engage in multi-turn conversations about your data.

-   **Uploaded files** are read directly from the file you provide, giving Assistant access to the full raw content within [per-file size limits](/administration/assistant/features/file-upload).
-   **Indexed files** accessed by link use Glean's indexed content for that file, which may be truncated for very large spreadsheets.

### API support

Developer platform users can access the [File Upload APIs documentation](https://developers.glean.com/api/client-api/chat/uploadchatfiles) on developers.glean.com.

### Security

Analysis is performed in a sandboxed environment for each user, ensuring security throughout the file lifecycle. For details, see the [security whitepaper](/administration/assistant/data-analysis/file-security).

## Supported file formats[​](#supported-file-formats "Direct link to Supported file formats")

### Spreadsheet files

-   XLS
-   XLSX
-   Google Sheets

### Text files

-   CSV
-   JSON

## Known limitations[​](#known-limitations "Direct link to Known limitations")

info

Before using the feature, be aware of these current limitations:

1

File upload limits

Up to 5 files of 64MB each are supported. Note that a single XLS/XLSX file can contain multiple tabs.

2

Data retention

Files and their metadata are retained while the chat session is present in history. Users can manage retention by disabling chat session history or manually deleting sessions.

3

Complex sheet handling

There is limited support for complex sheets with merged cells, hierarchical tables, charts, and diagrams. For indexed spreadsheets referenced by URL, see Crawler and indexing size limits for file-size considerations that can affect analysis completeness.

4

Model performance

Analytical accuracy on structured files — counts, filters, totals, and cohort analysis — is strongest in thinking mode. Fast mode uses a restricted toolset and may not reliably invoke Data Analysis for these operations.

5

Cross-file numerical aggregation

Data Analysis works on uploaded or tagged files within a single chat session. It doesn't support numerical aggregation across multiple indexed files (for example, summing a column across several spreadsheets stored in Google Drive).

Glean uses text-based retrieval and synthesis (RAG), not code execution across indexed files. To aggregate data from multiple sources, consolidate your data into a single file and upload it to the chat session for analysis.

## Best practices for accurate data analysis[​](#best-practices-for-accurate-data-analysis "Direct link to Best practices for accurate data analysis")

### Choose thinking mode for analytical questions[​](#choose-thinking-mode-for-analytical-questions "Direct link to Choose thinking mode for analytical questions")

Choose a [reasoning mode](/user-guide/assistant/glean-chat/#reasoning-modes) in Assistant to best answer your questions:

-   Use thinking mode for counts, filters, aggregations, and cross-column analysis. It's optimized for multi-step reasoning and benefits from recent improvements to how Assistant reads larger spreadsheet content.
    
-   Use fast mode for lightweight lookups or summaries where speed matters more than exhaustive accuracy. It's optimized for quick responses and may produce different or less complete answers on the same file.
    

### Upload files directly when possible[​](#upload-files-directly-when-possible "Direct link to Upload files directly when possible")

Uploading a CSV, XLSX, or JSON file directly in the composer gives Assistant access to the full raw file within the [per-file size limits](/user-guide/assistant/file-upload#upload-limits). Tagging an indexed link from a connected source — such as SharePoint or OneDrive — uses the indexed version of the file, which can be truncated for large or wide spreadsheets. This may lead to partial or inconsistent results when the analysis depends on data beyond what was indexed.

**When to upload vs. tag an indexed link:**

-   **Upload** for analytical questions — counts, sums, filters, joins, and trends — especially on larger or wider spreadsheets.
-   **Tag an indexed link** for lightweight lookups, summaries, or when the file is small and well-structured.

### Troubleshoot inconsistent results[​](#troubleshoot-inconsistent-results "Direct link to Troubleshoot inconsistent results")

If answers vary between sessions for the same file, try these steps:

1.  Switch to thinking mode and re-ask the question.
2.  If the file is from a connected source, upload it directly and compare results.

### Keep spreadsheets clean[​](#keep-spreadsheets-clean "Direct link to Keep spreadsheets clean")

Data analysis works best on tabular sheets with a clear header row and consistent columns. Merged cells, nested or irregular tables, and embedded charts can reduce accuracy.

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

### Enabling data analysis[​](#enabling-data-analysis "Direct link to Enabling data analysis")

note

The feature is enabled by default unless you have opted out of new features.

As a Glean admin, you can manage user access through:

1.  Navigate to **Admin console**.
2.  Go to **Platform → Assistant → Settings**.
3.  Select **Data Analysis**.
4.  Choose your preferred configuration options.

For a visual guide, watch the [Data Analysis Admin Self-Serve video](https://drive.google.com/file/d/10jQRs0cIvXYWeEn7sRPcjXrhN8hkUMEB/view?usp=sharing).

## Code interpreter security[​](#code-interpreter-security "Direct link to Code interpreter security")

Glean offers two versions of the code interpreter:

-   Native
-   OpenAI Code Interpreter

Customers using the universal Glean key or the Glean key for Azure use the OpenAI Code Interpreter. The security details for each version are outlined below.

### OpenAI Code Interpreter security[​](#openai-code-interpreter-security "Direct link to OpenAI Code Interpreter security")

-   **Sandbox isolation:** Each analysis runs in a dedicated, short-lived **sandbox** per user/session. Sandboxes are destroyed after inactivity or the session ends. Code and sandbox files do not persist across sessions.
-   **Glean retention defaults:** Files are retained while the chat session is present in history. In rare cases, files flagged for abuse may be retained for up to 30 days to support auditing. This is consistent with OpenAI's terms for modified abuse monitoring.
-   **Dedicated project:** Glean creates a dedicated OpenAI project per customer on the Glean-billed key. Each project uses a project-scoped service account and API key, which enforces strict project-level isolation for chats and files and prevents cross-customer visibility.

### Native code interpreter security[​](#native-code-interpreter-security "Direct link to Native code interpreter security")

For detailed information about our native code interpreter's security measures, refer to our [security whitepaper](/administration/assistant/data-analysis/file-security).
