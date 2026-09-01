---
url: "https://docs.glean.com/tools/connector/google"
canonical: "https://docs.glean.com/tools/connector/google"
title: "Google Tools"
fetched_at: "2026-09-01T13:30:01.618Z"
---
On this page

The Google Agent tool enables an agent to programmatically interact with the following Google Workspace services:

-   Gmail
-   Google Docs
-   Google Drive
-   Google Sheets

You can use this tool to create agents to automate, retrieve, or manipulate data in Google apps as part of broader workflows. Depending on the specific configuration, this can include:

-   Creating a Google Sheet
-   Adding rows to a Google Sheet
-   Creating a Google Doc
-   Drafting an email in Gmail
-   Creating and organizing files and folders in Google Drive
-   Sharing files and managing permissions in Google Drive

## Usage Examples[​](#usage-examples "Direct link to Usage Examples")

-   **Trigger-based updating of a Google Sheet**: Every time a Salesforce opportunity moves to a "closed lost" status, an agent can read the most recent transcript and add it to a spreadsheet.

## Configuration[​](#configuration "Direct link to Configuration")

caution

**Prerequisites**

An admin must have set up the Google connector and created a Google tools with domain-wide delegation permissions. Please follow the instructions in [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

1.  In the Agent Builder, select the required Google tools by navigating to **Select Step → Tools → By connector → Google → Select Google tool**.
2.  For the “Add rows to Spreadsheet” tool, you will need to additionally select the spreadsheet and sheet name to be updated.
3.  Add step instructions and save.

Test each tool in a sandbox environment to confirm connectivity and correct data handling.
