---
url: "https://docs.glean.com/administration/protect/sensitive-findings/manage-policies"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/manage-policies"
title: "Manage policies"
fetched_at: "2026-09-01T13:29:14.245Z"
---
On this page

Glean Protect+

A policy is a configurable set of rules that defines how sensitive content is detected, monitored, and managed within your organization's data ecosystem. Policies specify criteria such as:

-   The types of information to detect (e.g., predefined info types, custom terms, regular expressions)
-   The scope of connectors
-   Frequency
-   Exclusions

Each policy enables administrators to establish and automate protection measures tailored to organizational needs, ensuring compliance with data protection requirements and reducing the risk of unauthorized data exposure. You can manage policies through the sensitive findings, which provides tools for policy creation, enforcement, and continuous monitoring of violations.

**Note**: Policies differ from Reports in that Policies are scheduled, ongoing scans with in‑product triage in the Sensitive findings dashboard. Reports are ad‑hoc, one‑time CSV exports for offline review.

note

Sensitive findings policies only work on data that Glean crawls and indexes. They do not apply to data fetched live via federated fetch APIs (such as Slack Real-Time Search or other real-time integrations).

## Policy scope[​](#policy-scope "Direct link to Policy scope")

Your policy’s scope determines what information Glean will review. The scope can be configured using the following criteria:

-   **Connectors**: Specify whether the policy applies to all connectors in your organization, or only to selected repositories or platforms.
-   **Time period**: Choose the range of document activity (such as when a document was viewed, created, or modified) that the policy will review.
-   **Permissions**: Set parameters for which documents are included based on user or group access levels (e.g., documents visible to all users, specific roles, or external collaborators).

## Permissions[​](#permissions "Direct link to Permissions")

Use Permissions to describe which documents a policy should consider, based on who can access them.

1.  Choose one or more inclusion filters under **Search documents that are visible to**. Narrow down the scope of documents to scan based on how broadly shared it is. If any one of these conditions is met, we will include that document in our sensitive content search.
    
    -   “Visible to anyone in your organization” refers to documents that can be viewed by anyone at your company. For example, a Slack thread posted in a public channel or a Google Doc that can be searched and accessed by anyone at your company.
        
    -   “Visible to anyone on the internet” refers to documents that can be searched and accessed by individuals outside your organization (e.g. a Google Doc that can be viewed by “Anyone on the internet with the link”).
        
    -   “Visible to \[N\] people or more, internal or external to your organization” refers to documents that have been made accessible to at least N or more people. We prevent you from choosing a number that is too low (i.e. lower than 5 people) because documents accessible to four or fewer people generally present a lower risk and it may significantly increase the processing time.
        
    -   “Specific users” refers to documents that can be accessed by specific users mentioned in this field.
        
2.  Optionally configure an Exclusion list under **Exclude documents that are only visible to** to skip scanning documents that are restricted to trusted users or groups. You can add a group, department, and/or individual users.
    

For more information, see [Exclusion permissions](/administration/protect/sensitive-findings/manage-reports#exclusion-permissions).

## Sensitive content[​](#sensitive-content "Direct link to Sensitive content")

The sensitive content you define determines what types of information Glean’s sensitive insights feature will detect. You can specify sensitive data in multiple ways:

-   Defining specific info types, or by selecting them from a recommended list. Info types include things like credit card numbers, date of birth, SSN, and more. For more information, see [Supported info types](/administration/protect/sensitive-findings/supported-info-types).
-   Entering custom terms, which Glean will attempt to find matches for. Terms are specific words or phrases that match important company information, like employee IDs or job titles.
-   Defining rules using regular expressions to match specific data formats or keywords. Regular expressions help you find custom types of sensitive information that follow a flexible format, like record numbers or user IDs. We use the [re2 syntax](https://github.com/google/re2/wiki/syntax) for these expressions.

This configurable approach allows you to create policies that accurately identify a broad range of sensitive content, supporting any compliance and organizational needs you may have.

You can also adjust your policy to exclude content that is not sensitive, but may otherwise turn up in your findings. For example, if you set a policy to report email addresses as sensitive, you may wish to exclude a sample user ([sample-user@example.com](mailto:sample-user@example.com)).

## Severity analysis[​](#severity-analysis "Direct link to Severity analysis")

Severity analysis applies Glean’s Sensitive Content Model to eligible findings produced by a policy and classifies them as **High**, **Medium**, **Low**, or **False positive**, with a human-readable explanation of the rating. This helps Sensitive Content Moderators (SCMs) focus on actionable risks and cut down on noise from false positives such as test credentials or properly shared employee data. In typical deployments, the model helps reduce noise from low-severity findings (like test data and documents shared with the appropriate audience) by 60-80%.

When severity analysis is enabled on a policy, Glean evaluates each scanned document using a combination of signals:

-   Document findings, surrounding content
-   Document type and category
-   Who the document is shared with, and their departments
-   Permission graph and broader user context

Severities are assigned as follows:

-   **High**: documents that are overshared and truly sensitive
-   **Medium**: documents the model is uncertain about
-   **Low**: documents the model is confident contain only test data or are appropriately shared
-   **False positive**: documents where every finding is a detector misfire and likely not a true instance of the identified InfoType.

After Protect applies a policy with severity analysis turned on, each document's detail view includes an **Analysis Report** tab that shows the assigned severity for every finding alongside the supporting reasoning. The **Sensitive issues** dashboard includes a **Severity** filter so you can triage **High** severity issues first.

Use the thumbs-up and thumbs-down controls on each analysis to provide feedback. This feedback stays within your deployment and is never used to train models for other customers.

### Cost[​](#cost "Direct link to Cost")

Severity analysis uses an LLM to perform classification - Gemini on GCP deployments and Claude on AWS deployments. For every unique document and policy pair with analyzable info types, a fixed amount of LLM tokens is consumed. Approximate costs are:

-   **GCP**: ~$12 per 10,000 documents
-   **AWS**: ~$75 per 10,000 documents

While actual costs can vary based on document size and how much context caching applies, these figures represent the upper end of the estimate. Weekly policy runs are capped at approximately 40,000 findings analyzed per week. Any remaining findings are picked up in subsequent runs.

info

No content extracted from your documents leaves your cloud instance, and your data is never used for model training. Document content and metadata are sent to the cloud-specific LLM provider (Gemini on GCP, Claude on AWS) solely for the purpose of severity classification.

### Configure severity analysis[​](#enable-severity-analysis "Direct link to Configure severity analysis")

**Enable document analysis** is turned on by default for every new policy. This applies whether you create the policy from scratch or start with a template. The out-of-the-box templates for PII, credentials, and financial data still supply predefined detection settings. They don't determine whether severity analysis starts selected. Existing policies keep their saved severity analysis setting.

To turn off severity analysis for a new policy, clear **Enable document analysis** before you click **Create policy**. To change the setting for an existing policy, edit the policy and select or clear **Enable document analysis**. Severity analysis supports both continuous and weekly policies.

## Frequency[​](#frequency "Direct link to Frequency")

All policies run on a recurring schedule. You can adjust how often policies run depending on your needs. For the highest priority sensitive content, you will likely want to set a continuous frequency to ensure that any findings are identified and addressed promptly. For lower priority sensitive content, you may wish to run on a weekly basis.

note

Since there are certain events/connector that do not feed into continuous report scanning, there will be a periodic (weekly) scan that will run on the same continuous report to pick up all documents to be scanned that were not picked up by the continuous scan.

## Create a policy[​](#create-a-policy "Direct link to Create a policy")

Create a policy to start generating findings.

caution

**Prerequisites**

You must be a super admin or have the sensitive content moderator role enabled to create and view policies. If you're running Glean on AWS and want to generate infotype policies, your organization must have configured AWS for infotype scanning with GCP.

1.  Navigate to the [**Admin Console → Glean Protect → Sensitive findings** page, then select the **Policies** tab](https://app.glean.com/admin/sensitivefindings/policies).
2.  Click **Create policy**. You can create a policy from scratch or start with a template.

info

Policy templates provide predefined configurations and descriptions of what the policy detects. You must select your connectors for scanning before saving the policy.

3.  Define your policy’s scope:
    
    1.  Choose a connector or scope your policy to all connectors in Glean
    2.  Define a time period your policy will apply to
    3.  Select the permissions or the viewership of the documents (ie: anyone in the organization, anyone on the internet, specific users. etc.)
4.  Define sensitive content:
    
    1.  **InfoType**: Specify the infoType of the data that needs to be scanned. For more information, see [Supported info types](/administration/protect/sensitive-findings/supported-info-types).
        
        You can customize the **likelihood threshold** for each info type within a policy. This controls how confident the system must be before flagging a match as sensitive.
        
        -   **High** (default): Only flag matches with high confidence. Best for reducing false positives.
        -   **Medium**: Flag matches with medium or higher confidence. Consider enabling this for highly sensitive info types where broader coverage is important.
        -   **Low**: Flag all potential matches, including low confidence. This option may result in more false positives and should be used with caution.
        
    2.  **Terms**: Define a **Primary term** that needs to be flagged as sensitive findings. You can also define **Related terms** to improve the precision.
        
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
        
        > Related terms for the regex also uses the same logic and limits as terms. The system requires a regex and evaluates contextual rules using the same **AND/OR relationships** defined for related term sets. The regex is flagged as sensitive only after all the defined related term conditions are met.
        
        ### Example: Regex[​](#example-regex "Direct link to Example: Regex")
        
        In this example, the system flags the content if the following criteria is met:
        
        -   **Name** is Q3-Q4-Report
        -   **Only if** the custom 8-digit pattern (`\d{8}`) for example, `EmpID: 45678901` is found
        -   **AND** the context satisfies the following Boolean logic: `(budget OR forecasting OR finance) AND (Q3 OR Q4)`
        
5.  **Excluded from search**: Specify terms that should not be flagged by this policy and be excluded from the sensitive findings search.
    
6.  **Enforcement**: Define the enforcement policy to determine the default action the system takes when a document is flagged by this policy.
    
    | Action | Description | Visibility outcome |
    | --- | --- | --- |
    | **Keep Visible** | The document remains fully visible on Glean. | The document is visible to all users who have the original permissions to view it. |
    | **Hide from All** | The document is hidden from all users across Glean. | No user, regardless of original permissions, will see the document in Glean's search results or Glean responses. |
    
7.  **Frequency**: Set frequency for this policy to scan documents for sensitive content.
    
8.  Click the **Create policy** button to save your policy.
    

## Policy health warnings for regex expressions[​](#policy-health-warnings-for-regex-expressions "Direct link to Policy health warnings for regex expressions")

Glean detects when a policy’s regular expressions (regex) are likely misconfigured and surfaces a policy health warning in the **Sensitive findings** → **Policies** dashboard. This warning is non-blocking and indicates potential issues that require administrative attention.

### Detection criteria for problematic regex policies[​](#detection-criteria-for-problematic-regex-policies "Direct link to Detection criteria for problematic regex policies")

The system identifies problematic regex policies through three primary indicators:

-   High match count
-   Trivial matches
-   Mixed trivial and useful matches (mostly empty/small)

### Where warnings appear[​](#where-warnings-appear "Direct link to Where warnings appear")

When Glean detects a problematic regex pattern for a policy:

-   **Dashboard view:** The policy shows a non-blocking warning (using a yellow dot) on the policy dashboard or list view, indicating a configuration issue.
-   **Policy details:** A banner at the top of the policy details page summarizes that one or more regex patterns are generating suspicious or unhelpful matches and prompts the administrator to review the configuration. Click **Go to issue(s)** to view the exact issue.
-   **Visibility:** Warnings are attached to the policy, not to individual runs, so you see them whenever you view that policy while the issue is active.

### How to resolve the warnings[​](#how-to-resolve-the-warnings "Direct link to How to resolve the warnings")

Administrators must manually review policies with warnings, as there is no automatic filtering of problematic policies.

1.  **Inspect the warning:** Open the policy details and review the banner at the top of the page, which summarizes the issue.
2.  **Inspect patterns:** Inspect your regex patterns and take necessary action as appropriate to refine the logic.
    
3.  **Save the policy:** Saving the policy clears the existing warning, even if the regex was not changed. The policy remains active and can continue to run.
4.  **Monitor future runs:** If the configuration still behaves like a bad detector, Glean raises a new warning after a future run detects the same problematic behavior again.

## Archive a policy[​](#archive-a-policy "Direct link to Archive a policy")

Active policies run on a recurring basis. When you no longer need a policy, you can archive it. Archived policies no longer scan and no longer generate findings. Any content that is hidden will be made available.

To archive a policy:

1.  Navigate to the [**Admin Console → Glean Protect → Sensitive findings** page, then select the policies tab](https://app.glean.com/admin/sensitivefindings/policies).
2.  Select the menu icon on the right side of the policy you wish to archive.
3.  Select the **Archive** option.

note

Archived policies are automatically deleted after 3 months.

## Restore a policy[​](#restore-a-policy "Direct link to Restore a policy")

You can restore an archived policy within 3 months of archiving. Once restored, they will begin generating findings in accordance with their frequency.

To restore a policy:

1.  Navigate to the [**Admin Console → Glean Protect → Sensitive findings** page, then select the policies tab](https://app.glean.com/admin/sensitivefindings/policies).
2.  Select the **Restore** button for the policy you wish to restore.

note

Please note that only the following connectors are supported for continuous policies: Aha, Airtable, Asana, Bitbucket, Box, Confluence, Egnyte, Google Chat, Google Drive, Gitlab, Github, Google Groups, Google Sites, Greenhouse, Guru, Jira, Lessonly, Lever, Miro, Microsoft Teams, O365 Onedrive, O365 Sharepoint, Pagerduty, Quip, Slack, Seismic, Trello, WordPress, and Zendesk

## Supported info types[​](#supported-info-types "Direct link to Supported info types")

See [Supported info types](/administration/protect/sensitive-findings/supported-info-types).

note

Last updated: November 2025
