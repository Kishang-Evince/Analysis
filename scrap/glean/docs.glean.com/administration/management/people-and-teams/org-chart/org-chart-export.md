---
url: "https://docs.glean.com/administration/management/people-and-teams/org-chart/org-chart-export"
canonical: "https://docs.glean.com/administration/management/people-and-teams/org-chart/org-chart-export"
title: "Export Org Chart data"
description: "Learn how to export organizational chart data to CSV files in Glean's admin interface"
fetched_at: "2026-09-01T13:29:09.532Z"
---
On this page

You can export organizational chart data to CSV files and provide structured employee information for analysis or integration with other systems.

![Org chart with the Export button in the toolbar](/img/administration/management/people-and-teams/org-chart/org-chart-export/bacffd41767be5d64dcfdf1367f4186b.png)

## Export process[​](#export-process "Direct link to Export process")

### Access export options[​](#access-export-options "Direct link to Access export options")

Export is available to administrators from the Org Chart toolbar, alongside the zoom and settings controls. The export process follows these steps:

1

Select a starting point

Navigate to the person whose organizational data you want to export.

2

Initialize the export

Click **Export** to open the export configuration drawer.

3

Configure export options

Choose your export parameters:

-   **Direct reports only**: Export only the selected person's direct reports. Leave it off to export all reports.
-   **Exclude contractors**: Omit contractors from the export.

4

Generate the export

Click **Export** in the drawer to download the CSV file to your local machine.

## Exported data fields[​](#exported-data-fields "Direct link to Exported data fields")

The CSV export includes the following employee fields:

### Standard fields

-   Email address
-   Full name
-   Preferred name
-   Department
-   Job function
-   Location
-   Employee type
-   Job title
-   Role type

info

Any custom fields configured in your Glean instance are appended to the export after the standard fields.

### Use the export[​](#use-the-export "Direct link to Use the export")

The exported CSV file provides a structured view of your organizational hierarchy that you can use for:

-   Organization analysis
-   Team planning
-   System integrations
-   Reporting purposes

The file downloads directly to your default download directory in CSV format, making it easy to process further in spreadsheet applications or other tools.
