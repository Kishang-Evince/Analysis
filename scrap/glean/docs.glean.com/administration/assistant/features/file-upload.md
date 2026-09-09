---
url: "https://docs.glean.com/administration/assistant/features/file-upload"
canonical: "https://docs.glean.com/administration/assistant/features/file-upload"
title: "File upload"
description: "Enable file upload so users can upload and analyze local files in Glean Assistant."
fetched_at: "2026-09-01T13:29:00.211Z"
---
On this page

File upload lets users upload and analyze local files directly in Glean, Public Knowledge, and Apps - querying, summarizing, and generating content from them. This page covers how to enable file upload and the security and retention behavior admins should know. For end-user instructions and supported formats, see the [file upload user guide](/user-guide/assistant/file-upload).

## Enable file upload[​](#enable-file-upload "Direct link to Enable file upload")

To enable file upload for all users:

1.  Navigate to the Glean section in workspace Settings.
2.  Locate the **File Upload** toggle.
3.  Enable the feature.

info

File upload is disabled by default for existing customers (as of GA on 9/24) but enabled by default for new customers.

## Security and data handling[​](#security-and-data-handling "Direct link to Security and data handling")

-   Files are parsed and scanned for malware before storage. Malware-infected files trigger upload errors.
-   File content and metadata are stored in users' chat sessions and retained while the chat session is present in history.
-   Uploaded files can only be downloaded by the original uploader or users with access to the associated [shared chat session](/user-guide/assistant/chat-sharing). Files are not publicly accessible, even if the chat session was previously marked public.
-   Custom data retention policies for file uploads are not supported beyond your configured chat history retention. To delete files and metadata sooner, ask users to disable chat session history or manually delete chat sessions.
-   Optical Character Recognition (OCR) must be enabled for scanned PDFs to work properly. Contact Glean support if you experience issues.

## Archive files and the Agent Sandbox[​](#archive-files-and-the-agent-sandbox "Direct link to Archive files and the Agent Sandbox")

Users can upload and analyze `.zip` and other archive files, but archive analysis runs in the [Agent Sandbox](/security/agent-sandbox-ptc) and is only available in Thinking mode. Agent Sandbox must be turned on for your organization, and archive analysis may be subject to [usage-based pricing](/glean-enterprise-flex-pricing). For archive limits and security restrictions, see the [file upload user guide](/user-guide/assistant/file-upload#analyze-archive-files).

## See also[​](#see-also "Direct link to See also")

-   [File upload user guide](/user-guide/assistant/file-upload) - End-user documentation, supported formats, and limits
-   [Data Analysis for Spreadsheets](/administration/assistant/data-analysis/about-data-analysis)
-   [File Creation and Export](/administration/tools/setup-tools/google-tools-setup) to cloud storage services (GDrive, OneDrive)
