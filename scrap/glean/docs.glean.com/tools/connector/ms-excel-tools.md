---
url: "https://docs.glean.com/tools/connector/ms-excel-tools"
canonical: "https://docs.glean.com/tools/connector/ms-excel-tools"
title: "Microsoft Excel tools"
description: "Use Microsoft Excel tools in Glean to read, update, and organize Excel workbooks, worksheets, ranges, and comments."
fetched_at: "2026-09-01T13:30:04.413Z"
---
On this page

Microsoft Excel extension tools enable Glean to interact directly with Excel workbooks.

This allows users to read spreadsheet data, update ranges, manage worksheets, and perform common workbook operations without switching between applications.

Excel tools are a key component of the broader Microsoft 365 tool suite.

When building a workflow agent, the Excel tools are available within the *Plan and Execute* step and for building agents with auto mode, Excel tools are available for all the steps. This allows the agent to dynamically determine when to list files, comments, get sessions, range to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Excel tools are enabled as a unified bundle.

The following tools are included:

### Workbook and session management[​](#workbook-and-session-management "Direct link to Workbook and session management")

-   List files: Retrieves available Excel files so users can identify the workbook they want to work with.
-   Get session: Opens or retrieves the active workbook session needed for supported Excel operations.
-   Close session: Closes an Excel workbook session after the requested work is complete.

### Worksheet management[​](#worksheet-management "Direct link to Worksheet management")

-   List worksheets: Shows the worksheets available within a workbook.
-   Add worksheet: Creates a new worksheet in an existing Excel workbook.
-   Update worksheet: Updates worksheet properties such as the worksheet name.

### Range and cell operations[​](#range-and-cell-operations "Direct link to Range and cell operations")

-   Get range: Retrieves the contents of a specified range in a worksheet.
-   Update range: Writes new values into a specified worksheet range.
-   Clear range: Removes values from a specified range without deleting the worksheet.
-   Insert range: Inserts new cells into a worksheet range while preserving surrounding data.
-   Merge cells: Merges a specified group of cells into a single cell.

### Comments[​](#comments "Direct link to Comments")

-   List comments: Retrieves comments associated with the workbook or worksheet context for review.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Integrating tools into Glean workflows provides several high-value automation opportunities:

-   Spreadsheet-based reporting: An agent can retrieve a workbook range, summarize the latest values, and update a reporting sheet with refreshed metrics.
-   Finance and operations updates: A workflow can write new planning inputs into a specific worksheet range without requiring a user to manually edit the spreadsheet.
-   Workbook organization: An agent can create a new worksheet for a project or reporting cycle and rename existing worksheets to keep files organized.
-   Data cleanup and review: A user can clear outdated values, insert new rows or columns, merge header cells, and review comments while staying in Glean.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   Administrative access to the Glean admin console.
-   Microsoft 365 tools and extension tools must already be set up in your Glean environment.
-   Access to the Microsoft Entra ID portal to grant admin consent or configure a custom OAuth app.
-   If using a custom OAuth app, it must be set to *multitenant*. Single-tenant apps are not supported.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the pack: Navigate to **Admin console** → **Platform** → Tools and add **Microsoft Excel extension tools** from the template library.
2.  Configure authentication: Microsoft 365 tools use **user OAuth**.
    -   *Managed app*: Use the Glean-managed application for simplified setup.
    -   *Custom OAuth App*: If using a custom app, it must be registered as a multi-tenant application.
3.  Complete the one-time admin connection: After creating the pack, a Glean admin must complete a one-time connection before other users can reliably use the tools in your environment.
4.  Make the pack available to users: Use **Edit settings** under the **Enable tools** section to make the tools visible for all users or specific users within supported Glean experiences.

important

If you use Microsoft Excel extension tools, a Glean admin must complete a one-time connection after the pack is created before other users can reliably use the tools in your environment.

For detailed setup steps, see [Microsoft 365 tools and extension tools setup](/administration/tools/setup-tools/m365-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Why are Excel tools missing from the workflow builder?

Tool availability can vary by surface. While Excel tools are supported in Glean and supported agent experiences, they may not appear in some workflow building surfaces.

### Why do users see an Admin Approval request?

This occurs when your Microsoft Entra ID tenant requires explicit admin approval for the permissions requested by the Excel tools. An admin must grant consent in the Entra ID portal.

### Can I enable only some Excel tools?

Yes. Admins can enable a subset of Excel tools based on what they want to make available.

### Do users need their own Excel access to use these tools?

Yes. Because Microsoft Excel tools use User OAuth, each user must authenticate with their own Microsoft account to use the tools.

### What happens if my custom OAuth app is single-tenant?

Single-tenant apps are not supported for Microsoft Excel extension tools. If you use a custom OAuth app, it must be registered as a multi-tenant application.
