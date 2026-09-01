---
url: "https://docs.glean.com/administration/protect/sensitive-findings/manage-reports"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/manage-reports"
title: "Manage reports"
fetched_at: "2026-09-01T13:29:14.287Z"
---
On this page

Glean Protect & Protect+

Reports let you scan indexed content across connected connectors to find broadly shared or externally exposed sensitive content based on criteria you define. Use them for point‑in‑time audits, exports to CSV, and investigations where you don't need ongoing dashboard workflows.

Reports are on-demand CSV exports for ad‑hoc audits and offline analysis on content that is already searchable. Policies are saved, scheduled rules that scan continuously and surface findings in the Sensitive findings dashboard for in‑product triage and remediation.

note

Sensitive findings reports only work on data that Glean crawls and indexes. They do not apply to data fetched live via federated fetch APIs (such as Slack Real-Time Search or other real-time integrations).

## Access and prerequisites[​](#access-and-prerequisites "Direct link to Access and prerequisites")

-   Access is restricted to admins with appropriate governance privileges (for example, Super Admin or Sensitive content moderator), as configured by your organization.
-   If you use Infotype scanning and your Glean deployment is on AWS, you must connect a Google Cloud DLP API key before running reports that include Infotypes.

## Where to find Reports[​](#where-to-find-reports "Direct link to Where to find Reports")

-   In the Admin Console, go to **Glean Protect → Reports**.

## Generate a report[​](#generate-a-report "Direct link to Generate a report")

Prerequisites

Only users with the Super Admin or Sensitive Content Moderator roles can create or view reports.

If you are running Glean on AWS and want to generate info type reports, your organization must have configured AWS for info type scanning with GCP.

1.  Go to **Glean Protect → Sensitive findings → Reports** and click **Create report**.
    
2.  Configure scope (connectors, time window, permission filters) and sensitive content criteria (see “Report configuration options” below).
    
3.  Define sensitive content. In this setp, describe the types of content that should be flagged as sensitive.
    
4.  Define the terms that should be excluded from the search.
    
5.  Click **Generate report**.
    
6.  Enter a name for the report and click **Generate report**. The report will appear in the Reports list with its status. When complete, download the CSV.
    

note

Reports are available for download for one year.

## Report configuration options[​](#report-configuration-options "Direct link to Report configuration options")

You can tailor a report to reduce noise and focus on real risk:

### Scope[​](#scope "Direct link to Scope")

-   **Connectors**: Specify whether the report needs to be created for all connectors in your organization, or only to selected connectors.
    
-   **Time period**: Select a time window for the documents to be searched (for example, created/updated/viewed in the past 30/90/365 days). You can specify any of the following options:
    
    -   **Past year (recommended)**: Optimize for faster report generation while covering the majority of documents.
    -   **All-time**: Expect slower report generation times.
    -   **Custom time period**: Specify the start and end date.
    -   **Last N days**: Specify the number of days.
-   Use Permissions to describe which documents a policy should consider, based on who can access them.
    
    1.  Choose one or more inclusion filters under **Search documents that are visible to**. Narrow down the scope of documents to scan based on how broadly shared it is. If any one of these conditions is met, we will include that document in our sensitive content search.
        
        -   “Visible to anyone in your organization” refers to documents that can be viewed by anyone at your company. For example, a Slack thread posted in a public channel or a Google Doc that can be searched and accessed by anyone at your company.
            
        -   “Visible to anyone on the internet” refers to documents that can be searched and accessed by individuals outside your organization (e.g. a Google Doc that can be viewed by “Anyone on the internet with the link”).
            
        -   “Visible to \[N\] people or more, internal or external to your organization” refers to documents that have been made accessible to at least N or more people. We prevent you from choosing a number that is too low (i.e. lower than 5 people) because documents accessible to four or fewer people generally present a lower risk and it may significantly increase the processing time.
            
        -   “Specific users” refers to documents that can be accessed by specific users mentioned in this field.
            
    2.  Optionally configure an Exclusion list under **Exclude documents that are only visible to** to skip scanning documents that are restricted to trusted users or groups. You can add a group, department, and/or individual users.
        

For more information, see [Exclusion permissions](/administration/protect/sensitive-findings/manage-reports#exclusion-permissions).

### Sensitive content criteria[​](#sensitive-content-criteria "Direct link to Sensitive content criteria")

Define sensitive content:

1.  **InfoType**: Specify the infoType of the data that needs to be scanned. For more information, see [Supported info types](/administration/protect/sensitive-findings/supported-info-types).
    
2.  **Terms**: Define a **Primary term** that needs to be flagged as sensitive findings. You can define 25 related terms per detector and 1000 related terms per policy.
    
    ### Primary term (Required)[​](#primary-term-required "Direct link to Primary term (Required)")
    
    This is the main term the system scans for.
    
    | Field | Details |
    | --- | --- |
    | **Primary Term** | Must be alphanumeric. Terms are matched case-insensitive. All non-alphanumeric characters (like commas, hyphens, and parentheses) are treated as spaces during the scan. |
    
    ### Related terms for precision[​](#related-terms-for-precision "Direct link to Related terms for precision")
    
    You can add additional sets of related terms to refine your matches and reduce false positives. The primary term is flagged as sensitive only after all the defined related term conditions are met.
    
    | Component | Description | Evaluation logic |
    | --- | --- | --- |
    | **Term set** (e.g., `loan, savings`) | A list of related words separated by commas. | **OR** relationship. Only the presence of *one* term from the set is required. |
    | **Term condition** (Two or more sets) | Multiple term sets evaluated together. | **AND** relationship. The presence of a match from *each* defined set is required for the primary term to be flagged. |
    
    ### Example: Primary term[​](#example-primary-term "Direct link to Example: Primary term")
    
    If your policy defines the **Primary term** as `Currency` and adds the following two **Related term sets**:
    
    -   **Related term set 1:** `loan, savings`
    -   **Related term set 2:** `USD, dollar`
    
    A primary term is flagged as sensitive only if the primary term **`Currency`** **is present** *AND* the document text satisfies the following logic: **((loan OR savings) AND (USD OR dollar))**.
    
    ### Limits[​](#limits "Direct link to Limits")
    
    -   Maximum **25** related terms can be defined per primary term.
    -   Maximum **1,000** related terms can be used per report.
3.  Define regular expressions for your policy.
    
    1.  Specify a name or an ID that can identify your regex. You can filter your findings report using this name or ID.
    2.  Specify a **Regex** that follow [RE2 Syntax](https://github.com/google/re2/wiki/Syntax).
    3.  You can also define **Related terms** to improve the precision.
    
    note
    

Related terms for the regex also uses the same logic and limits as terms. The system requires a regex and evaluates contextual rules using the same **AND/OR relationships** defined for related term sets. The regex is flagged as sensitive only after all the defined related term conditions are met. :::

### Example: Regex[​](#example-regex "Direct link to Example: Regex")

In this example, the system flags the content if the following criteria is met:

-   **Name** is Q3-Q4-Report
-   **Only if** the custom 8-digit pattern (`\d{8}`) for example, `EmpID: 45678901` is found
-   **AND** the context satisfies the following Boolean logic: `(budget OR forecasting OR finance) AND (Q3 OR Q4)`

### Excluded from search[​](#excluded-from-search "Direct link to Excluded from search")

-   Specify terms that should not be flagged in this report.

## Exclusion permissions: “Exclude documents that are only visible to”[​](#exclusion-permissions "Direct link to Exclusion permissions: “Exclude documents that are only visible to”")

note

Google Chat spaces are currently not compatible with exclusion logic.

In addition to inclusion filters, policies and reports also support a negative filter called the Exclusion list, which lets you skip scanning documents that are strictly limited to trusted users or groups.

-   If the document qualifies to be included in the exclusion list, it is skipped for that policy or report:
    -   No sensitive‑content detection is run for that document in the context of that configuration.
    -   No findings are generated for that document in the dashboard (for policies) or in the exported CSV (for reports).
-   If any viewer falls outside the Exclusion list, the document is treated as in‑scope (assuming it meets other inclusion filters and scope criteria) and is scanned as usual.

In the UI, this appears as **Exclude documents that are only visible to** \[Add a group, department, or user\]

-   **Users**: Individual Glean users
-   **Departments**: Internal departments / Glean groups (for example, HR, Finance, Engineering)
-   **External groups**: Groups defined in external systems (for example, Google Drive groups, OneDrive/SharePoint groups, Slack groups), exposed as external group entries with an associated connector instance

You can mix and match these entries in one list. For example, you can exclude documents that are only visible to “Finance department + CFO + `finance‑leadership@` external group” by adding all three to the Exclusion list.

### How org‑wide and link‑open access interact with exclusions[​](#how-orgwide-and-linkopen-access-interact-with-exclusions "Direct link to How org‑wide and link‑open access interact with exclusions")

Broadly shared permissions like “everyone in the organization” or “anyone with the link” are not excluded from the scan when Glean evaluates the Exclusion list:

-   If a document is visible to **everyone in your organization**, its viewer set necessarily includes people outside the Exclusion list, so it will **not** be excluded—even if some of those viewers are also on the list.
-   Similarly, if a document is visible to **anyone with the link** (anonymously searchable or accessible), it will not qualify for exclusion, because the Exclusion list cannot cover all possible viewers.

### Example scenario[​](#example-scenario "Direct link to Example scenario")

### Goal[​](#goal "Direct link to Goal")

Detect financial or HR documents when they are shared beyond HR or Finance, but avoid noisy findings for documents that are strictly limited to those teams.

### Configuration outline[​](#configuration-outline "Direct link to Configuration outline")

1.  **Define sensitive content**: Use InfoTypes, terms, and regex to detect the relevant PII or financial data (for example, employee IDs, salary data, bank account numbers).
2.  **Set inclusion permissions**: In **Search documents that are visible to**: Select options that target oversharing, such as:
    -   **Visible to anyone in your organization**, and/or
    -   **Visible to \[N\] people or more** (for example, N = 10).
3.  **Configure the Exclusion list**: In **Exclude documents that are only visible to**:
    -   Add the HR department and/or Finance department.
    -   Optionally add a small set of additional trusted users (for example, CFO, CHRO).

### Outcome[​](#outcome "Direct link to Outcome")

-   Documents that are only visible to HR/Finance and the trusted individuals are excluded from this policy or report and will not generate findings.
-   Documents where the same sensitive content is visible to other teams, contractors, or a broad internal audience (for example, org‑wide access or shared with many non‑HR users) remain in scope and will be flagged if they match your sensitive‑content rules.

### Exclusions vs Content hiding[​](#exclusions-vs-content-hiding "Direct link to Exclusions vs Content hiding")

-   Use Exclusion lists when you want to ignore trusted, tightly permissioned documents for a particular DLP policy or report, but you still want those documents to appear normally in Glean Search and Glean.
    
    -   Excluded documents still appear in Glean Search and Glean like any other document that matches their source permissions.
    -   Add users, departments, and external groups you consider safe (e.g., HR, Finance) to the list. This skips documents only visible to those specific principals.
    -   Documents visible to everyone in the organization or anyone with the link are never excluded by Exclusion lists; they always remain in scope for the configured policies and reports.
    -   Use the Sensitive Findings dashboard and report exports to refine your content rules. If you see noise from well-controlled documents, adjust your Exclusion list.
-   Use Content Hiding when you need to remove documents from Glean search and Glean (for example, due to regulatory or contractual reasons) regardless of any specific DLP policy.
    
    -   You can hide specific documents by uploading their Document IDs via CSV.
    -   Use visibility options such as `HIDE_ALL`, `HIDE_ALL_EXCEPT_OWNER`, or `HIDE_FROM_GROUPS`.

## Limits and behavior[​](#limits-and-behavior "Direct link to Limits and behavior")

-   Concurrency: You can generate up to 5 reports at a time.
-   Manage runs: From the Reports list, you can view status, see the parameters used, or cancel an in‑progress run.
-   Scheduling: For weekly, continuous, or near‑real‑time monitoring and in‑product remediation, use policies instead.

## Output and fields[​](#output-and-fields "Direct link to Output and fields")

-   Download format: CSV.
-   Typical fields include document identifiers and metadata, visibility signals, and matched sensitive content attributes to help triage and remediate. Exact columns may vary as capabilities evolve.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   Report isn’t starting or appears blocked
    
    -   Check if you already have multiple reports generating or queued (respect the concurrency limit).
    -   Confirm your role/permissions grant access to Sensitive findings and Reports.
-   No results or unexpected volume
    
    -   Narrow the time window, refine permission filters, or switch from broad terms to precise Info types / regex.
    -   Run smaller, data‑source‑specific scans to validate criteria before expanding.
-   Info types not matching
    
    -   If hosted on AWS, ensure your GCP DLP key is configured and [valid for Info type scanning](/administration/protect/sensitive-findings/aws-infotype) (terms/regex do not require this).

## Supported info types[​](#supported-info-types "Direct link to Supported info types")

See [Supported info types](/administration/protect/sensitive-findings/supported-info-types).

note

Last updated: November 2025
