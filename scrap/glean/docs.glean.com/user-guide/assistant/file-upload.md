---
url: "https://docs.glean.com/user-guide/assistant/file-upload"
canonical: "https://docs.glean.com/user-guide/assistant/file-upload"
title: "Upload files in Assistant"
description: "Upload and analyze local files in Glean — documents, spreadsheets, presentations, code files, images, and archives."
fetched_at: "2026-09-01T13:30:38.571Z"
---
On this page

File upload lets you upload and analyze local files directly in Glean, Public Knowledge, and Apps. You can query, summarize, and generate content from uploaded files without adding them to a connector. Upload limits vary based on the model your organization uses.

note

File upload must be enabled by your admin. If you don't see the upload option, contact your admin. For setup details, see [File upload setup](/administration/assistant/features/file-upload).

info

File content and metadata are stored in your chat sessions and are retained while the chat session is present in your history.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

File upload must be enabled by your admin. If you don't see the upload option, contact your admin. For setup details, see [File upload setup](/administration/assistant/features/file-upload).

## How to upload files[​](#how-to-upload-files "Direct link to How to upload files")

Upload up to 5 files directly from your local computer, with each file up to 64 MB. Limits vary by model. See [Upload limits](#upload-limits).

## Supported file formats[​](#supported-file-formats "Direct link to Supported file formats")

### Document files

-   PDF
-   DOC
-   DOCX
-   DOTX and DOTM (Word templates)
-   ODT (OpenDocument Text)
-   Pages

### Email files

-   EML
-   MSG (Outlook)

### Spreadsheet Files

-   XLS
-   XLSX
-   ODS (OpenDocument Spreadsheet)
-   Numbers

info

Macro-enabled Excel files (`.xlsm`) are not supported for direct upload to Glean for analysis. To analyze one, save it as `.xlsx` first.

### Presentation Files

-   PPT
-   PPTX
-   POTX and POTM (PowerPoint templates)
-   Key

### Text Files

-   CSV
-   JSON
-   XML
-   TXT
-   RTF
-   VTT
-   NDJSON
-   MD (Markdown)
-   ICS (Calendar)
-   TSV
-   TOML
-   INI
-   ENV
-   Properties
-   CFG / CONF
-   HAR (HTTP Archive)

### Web Files

-   HTML
-   XHTML
-   CSS
-   SCSS
-   SASS

### Code Files

-   Java
-   Python
-   JavaScript
-   TypeScript
-   JSX
-   TSX
-   C++
-   C
-   Jupyter Notebooks
-   SQL
-   Shell Scripts
-   Go
-   YAML
-   Log Files
-   Ruby
-   Swift
-   Kotlin
-   Scala
-   PHP
-   Perl
-   R
-   Lua
-   Dart
-   Haskell
-   Elixir
-   Erlang
-   Clojure
-   Groovy
-   Objective-C
-   And other text-based code files

### Image Files

-   JPG/JPEG
-   PNG
-   WebP
-   HEIC/HEIF
-   TIFF/TIF

### Archive Files

-   ZIP (`.zip`)

Other archive formats are also accepted: `.tar`, `.tar.gz` / `.tgz`, `.tar.bz2`, `.gz`, and `.bz2`.

info

Archive files are analyzed in the Agent Sandbox and are only available in Thinking mode. See [Analyze archive files](#analyze-archive-files) for requirements, limits, and security details.

## What you can do[​](#what-you-can-do "Direct link to What you can do")

### Query in real time[​](#query-in-real-time "Direct link to Query in real time")

Query the text content of uploaded files immediately after upload for instant analysis.

### See document metadata[​](#see-document-metadata "Direct link to See document metadata")

The chat displays document metadata, including title and file type, for easy reference.

### Manage files[​](#manage-files "Direct link to Manage files")

1

Delete before querying

You can delete uploaded files before submitting your first query. After you submit a query, files can only be removed by deleting the chat session history.

2

Retention

File content and metadata are retained while the chat session is present in your history.

## Upload limits[​](#upload-limits "Direct link to Upload limits")

The maximum file size and number of files per session depend on the model your organization uses:

| Model | File limit | Size limit |
| --- | --- | --- |
| 128K models | 5 files | 64 MB |
| 32K models | 4 files | 32 MB |
| 8K models | 2 files | 16 MB |

info

Minimum file size for upload is 1 KB.

## Analyze archive files[​](#analyze-archive-files "Direct link to Analyze archive files")

You can upload and analyze `.zip` archives directly in Glean. This is useful for working with bundled documents, code packages, or compressed datasets. Drag and drop a `.zip` file into the composer, then ask questions about its contents. Other archive formats are also accepted: `.tar`, `.tar.gz` / `.tgz`, `.tar.bz2`, `.gz`, and `.bz2`.

Unlike other uploads, archives aren't parsed and indexed up front. Instead, Glean opens them in the [Agent Sandbox](/security/agent-sandbox-ptc) — a virtual computer with a file system, shell, and code interpreter — and inspects or extracts only the files needed to answer your question.

### Requirements[​](#requirements "Direct link to Requirements")

Archive analysis runs in the Agent Sandbox, so both of the following must be true:

-   **Agent Sandbox is turned on** for your organization. If it isn't, contact your admin.
-   **The chat is in Thinking mode.** You can't add archives in Fast mode, and switching a chat to Fast mode removes any staged archive files.

info

Archive analysis runs in the Agent Sandbox and may be subject to [usage-based pricing](/glean-enterprise-flex-pricing).

### Archive limits[​](#archive-limits "Direct link to Archive limits")

| Limit | Default |
| --- | --- |
| Archive (compressed) file size | 64 MB |
| Total uncompressed contents | 256 MB |

Archives count toward the per-session file limit for your model, shown in [Upload limits](#upload-limits). To protect against zip bombs, Glean also rejects archives with an unusually high compression ratio.

### Security restrictions[​](#security-restrictions "Direct link to Security restrictions")

Glean validates every archive before processing and rejects it if it contains any of the following:

-   Executable or script files (for example, `.exe`, `.dll`, `.so`, `.sh`, `.bat`, or `.msi`)
-   Nested archives, that is, another archive inside the archive
-   Password-protected or encrypted entries
-   Symbolic or hard links
-   Entries with unsafe paths, such as a path that points outside the archive

Glean scans archives for malware, the same as for other file uploads.

## Security and privacy[​](#security-and-privacy "Direct link to Security and privacy")

### Security

-   Files are parsed and scanned for malware before storage.
-   Malware-infected files trigger upload errors.

### Access controls

-   Uploaded files can only be downloaded by the original uploader or by users who have access to the associated [shared chat session](/user-guide/assistant/chat-sharing).
-   Files are not publicly accessible, even if the chat session was previously marked as public.

## Limitations[​](#limitations "Direct link to Limitations")

-   Video and audio files are not supported. Files outside the supported types above cannot be uploaded.
-   For scanned PDFs, Optical Character Recognition (OCR) must be enabled to work properly. If you experience issues, contact your admin or Glean support.
-   For analytical queries (row counts, filtered counts, aggregations) on large spreadsheets referenced from a connected source such as SharePoint or OneDrive, uploading the file directly typically produces more accurate results than referencing the file by URL. See [Data Analysis: Overview](/administration/assistant/data-analysis/about-data-analysis#best-practices-for-accurate-data-analysis) for guidance.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Why can't I download a file from a shared chat?

Uploaded files can only be downloaded by the original uploader or by users who have been granted access to the shared chat session. If you get an access-denied error when trying to download a file, confirm that you have access to the chat session the file was uploaded to. See [Chat Sharing](/user-guide/assistant/chat-sharing) for details on sharing permissions.

### Can uploaded files be accessed by anyone with a link?

No. Files are not publicly accessible even if the chat session was previously marked as public. Access is always restricted to the original uploader and users with access to the associated shared chat session.

### Can I upload files through the API?

Developer platform customers can upload files through the Glean API. Refer to the API documentation for details.

## See also[​](#see-also "Direct link to See also")

-   [Chat Sharing](/user-guide/assistant/chat-sharing) - Share Assistant conversations with teammates
-   [File upload setup](/administration/assistant/features/file-upload) - Admin setup and configuration guide
