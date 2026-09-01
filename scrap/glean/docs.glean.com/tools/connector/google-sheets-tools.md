---
url: "https://docs.glean.com/tools/connector/google-sheets-tools"
canonical: "https://docs.glean.com/tools/connector/google-sheets-tools"
title: "Google Sheets tools"
description: "Use Google Sheets tools in Glean to read, write, format, and manage spreadsheets directly from agents and workflows."
fetched_at: "2026-09-01T13:30:01.901Z"
---
On this page

With Google Sheets tools, you can read, update, format, and manage spreadsheets directly from Glean without switching to Google Sheets.

Google Sheets tools are part of the broader Google tool suite.

When building a workflow agent, the Google Sheets tools are available within the **Plan and Execute** step. For agents with **auto mode**, the Google Sheets tools are available for all steps. This lets the agent dynamically determine when to read or update spreadsheets to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Google Sheets tools are enabled as a unified bundle.

The following tools are included:

### Reading data[​](#reading-data "Direct link to Reading data")

-   Batch get: Reads values from one or more ranges in a Google Sheets spreadsheet.
-   Get sheet names: Retrieves the names of all sheets in a spreadsheet.
-   Get spreadsheet info: Returns metadata about a spreadsheet, including its title, sheets, and properties.
-   Lookup spreadsheet row: Searches for a specific row in a spreadsheet based on column values.
-   Find worksheet by title: Locates a specific sheet within a spreadsheet by its title.

### Writing data[​](#writing-data "Direct link to Writing data")

-   Batch update: Writes values to one or more ranges in a Google Sheets spreadsheet.
-   Upsert rows: Inserts new rows or updates existing rows in a spreadsheet based on matching criteria.
-   Clear values: Removes values from a specified range in a spreadsheet without deleting the cells.
-   Create spreadsheet column: Adds a new column to an existing sheet in a spreadsheet.

### Sheet management[​](#sheet-management "Direct link to Sheet management")

-   Add sheet: Creates a new sheet within an existing spreadsheet.
-   Update sheet properties: Modifies properties of a sheet, such as its title or grid dimensions.
-   Copy sheet to spreadsheet: Copies a sheet from one spreadsheet to another.

### Formatting[​](#formatting "Direct link to Formatting")

-   Format cell: Applies formatting to cells in a spreadsheet, such as font style, background color, or number format.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Google Sheets tools support several common workflow patterns:

-   Data aggregation: An agent can gather data from multiple sources and write it into a structured spreadsheet for reporting or analysis.
-   Pipeline tracking: A workflow can upsert rows in a tracking spreadsheet each time a deal stage changes in your CRM, keeping records current without duplicates.
-   Automated report generation: An agent can create new sheets, add columns, and populate data on a recurring schedule for team dashboards.
-   Cross-spreadsheet consolidation: A workflow can look up rows in one spreadsheet and copy relevant sheets to a summary spreadsheet for stakeholders.
-   Data cleanup: An agent can find rows matching specific criteria, clear outdated values, and update cells with corrected information.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   You must have administrative access to the Glean **Admin console**.
-   Your organization must have an existing Google Drive connector configured in Glean.
-   You must have access to the Google Cloud Console to enable the required APIs and configure OAuth credentials.
-   The Google Sheets API and Google Drive API must be enabled in your Google Cloud Console.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the tools: In Glean, go to **Admin console** → **Platform** → Tools and add **Google Sheets extension tools** from the template library.
2.  Select the connector instance: Link the tools to your existing **Google Drive** connector instance.
3.  Configure authentication: Google Sheets tools use OAuth user authentication.
    -   **Central**: Use the Glean-managed Google OAuth app when it's available in your environment.
    -   **Custom OAuth app**: If using a customer-managed app, register it in the Google Cloud Console, enable the Google Sheets API and Google Drive API, configure the OAuth consent screen, and enter the client credentials in Glean.
4.  Save the tools after authentication is complete.
5.  Enable the tools for users: Use **Edit settings** under **Enable Tools** to make the tools available to the relevant users and supported Glean surfaces.

note

Google Sheets tools use OAuth user authentication exclusively. Domain-wide Delegation is not supported for Google Sheets extension tools.

For detailed setup steps, see [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Google account?

Yes.

Google Sheets tools use OAuth user authentication, so each user must authenticate with their own Google account before using the tools.

### Can I enable only some Google Sheets tools from the pack?

Yes. Admins can enable tools based on what they want to make available.

### What Google APIs need to be enabled?

You must enable the Google Sheets API and Google Drive API. Both APIs are required for spreadsheet operations.

### Can I use Domain-wide Delegation for Google Sheets tools?

No.

Google Sheets extension tools require OAuth user authentication. Domain-wide Delegation isn't supported for these tools. Each user authenticates individually.

### Where are changes saved?

All reads and writes happen against the spreadsheet in the signed-in user's Google Drive or any spreadsheet they have access to. New sheets and columns are added to the target spreadsheet directly.
