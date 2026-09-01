---
url: "https://developers.glean.com/api/client-api/governance/overview"
canonical: "https://developers.glean.com/api/client-api/governance/overview"
title: "Governance API Overview | Glean Developer"
description: "The Governance API enables administrators to create and manage data governance policies, generate compliance reports, and maintain oversight of content access and usage within your organization."
fetched_at: "2026-09-01T13:22:54.013Z"
---
On this page

The Governance API enables administrators to create and manage data governance policies, generate compliance reports, and maintain oversight of content access and usage within your organization. Ensure data security and regulatory compliance through comprehensive governance controls. Configure in the Glean UI under Admin → Governance. You can also configure the same using the APIs provided. Each policy or report scans every indexed document according to its settings and surfaces any violations for review.

## Authorization[​](#authorization "Direct link to Authorization")

To call the policy and report endpoints, create a **Client API token** with scope `DATA_GOVERNANCE`. The token must belong to a user who can access the Sensitive Content pages (for example, a Super Admin or Sensitive Content Moderator).

For content-hiding endpoints, generate a token with scope `CONTENT_HIDING`. The associated user must be able to edit visibility overrides, typically a Super Admin.

See [Authentication](/api-info/client/authentication/overview) for detailed steps.

## Difference between policies and reports[​](#difference-between-policies-and-reports "Direct link to Difference between policies and reports")

A report runs a one-off scan and lets you download violations as a CSV when it finishes.

Policies support two schedules—`WEEKLY` and `CONTINUOUS`. A policy adds an interactive dashboard where you can review findings, archive items, and optionally hide flagged documents.

Note: Policy and report APIs share many request fields. Ensure any shared fields use consistent values within the same payload.

## APIs[​](#apis "Direct link to APIs")

Governance APIs fall into three groups: **policy**, **report**, and **content-hiding** endpoints.

Both policies and reports share a common configuration object, **config**. This has certain fields that need not be populated while submitting a report or policy to be created as they are only meant to be populated on return. Namely, the config **version**, **createdAt** and **createdBy** will automatically be set without needing to be passed.

### Policy APIs[​](#policy-apis "Direct link to Policy APIs")

With these endpoints, you can perform CRUD operations on policies. Policies created/edited through these would reflect in the Sensitive Findings section under the Admin > Governance section in the Glean UI.

### Report APIs[​](#report-apis "Direct link to Report APIs")

Only creating a one-time report is supported via API for reports. You can get the report's scan status to check if it has completed and download its violation CSV. For any of the other features such as updating, other frequencies, etc., please use policies.

Reports created using this endpoint will appear in the "Sensitive Content Reporting" section under Admin > Governance in the UI.

### Content hiding APIs[​](#content-hiding-apis "Direct link to Content hiding APIs")

Content hiding works by setting "visibility overrides" to a particular document. These overrides can come from different sources, such as: 

1.  Existing policies that might flag a document meeting its requirements if "auto-hide" is enabled.
    
2.  If it is manually hidden by a user. Different users are treated as different sources.
    
3.  If a document is present in the CSV for hiding it.
    

On manually hiding, the document will have a visibility override set with source type "user". On manually unhiding, the document will be unhidden from all sources (not just the user source). All its visibility overrides will be removed and the document will be visible on Glean.

## Use Cases

### Policy Management

Create, update, and enforce data governance policies to ensure compliance with organizational and regulatory requirements.

### Compliance Reporting

Generate detailed compliance reports and audit trails to demonstrate adherence to data governance policies and regulations.

### Access Control

Monitor and control data access patterns to ensure sensitive information is only accessed by authorized personnel.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | [`/rest/api/v1/governance/data/findings/exports`](/api/client-api/governance/listfindingsexports) | [Lists findings exports](/api/client-api/governance/listfindingsexports)
Lists all DLP findings exports.

 |
| POST | [`/rest/api/v1/governance/data/findings/exports`](/api/client-api/governance/createfindingsexport) | [Creates findings export](/api/client-api/governance/createfindingsexport)

Creates a new DLP findings export job.

 |
| DELETE | [`/rest/api/v1/governance/data/findings/exports/{id}`](/api/client-api/governance/deletefindingsexport) | [Deletes findings export](/api/client-api/governance/deletefindingsexport)

Deletes a DLP findings export.

 |
| GET | [`/rest/api/v1/governance/data/findings/exports/{id}`](/api/client-api/governance/downloadfindingsexport) | [Downloads findings export](/api/client-api/governance/downloadfindingsexport)

Downloads a DLP findings export as a CSV file.

 |
| GET | [`/rest/api/v1/governance/data/policies`](/api/client-api/governance/listpolicies) | [Lists policies](/api/client-api/governance/listpolicies)

Lists policies with filtering.

 |
| POST | [`/rest/api/v1/governance/data/policies`](/api/client-api/governance/createpolicy) | [Creates new policy](/api/client-api/governance/createpolicy)

Creates a new policy with specified specifications and returns its id.

 |
| GET | [`/rest/api/v1/governance/data/policies/{id}`](/api/client-api/governance/getpolicy) | [Gets specified policy](/api/client-api/governance/getpolicy)

Fetches the specified policy version, or the latest if no version is provided.

 |
| POST | [`/rest/api/v1/governance/data/policies/{id}`](/api/client-api/governance/updatepolicy) | [Updates an existing policy](/api/client-api/governance/updatepolicy)

Updates an existing policy.

 |
| GET | [`/rest/api/v1/governance/data/policies/{id}/download`](/api/client-api/governance/downloadpolicycsv) | [Downloads violations CSV for policy](/api/client-api/governance/downloadpolicycsv)

Downloads CSV violations report for a specific policy id. This does not support continuous policies.

 |
| POST | [`/rest/api/v1/governance/data/reports`](/api/client-api/governance/createreport) | [Creates new one-time report](/api/client-api/governance/createreport)

Creates a new one-time report and executes its batch job.

 |
| GET | [`/rest/api/v1/governance/data/reports/{id}/download`](/api/client-api/governance/downloadreportcsv) | [Downloads violations CSV for report](/api/client-api/governance/downloadreportcsv)

Downloads CSV violations report for a specific report id.

 |
| GET | [`/rest/api/v1/governance/data/reports/{id}/status`](/api/client-api/governance/getreportstatus) | [Fetches report run status](/api/client-api/governance/getreportstatus)

Fetches the status of the run corresponding to the report-id.

 |
| GET | [`/rest/api/v1/governance/documents/visibilityoverrides`](/api/client-api/governance/getdocvisibility) | [Fetches documents visibility](/api/client-api/governance/getdocvisibility)

Fetches the visibility override status of the documents passed.

 |
| POST | [`/rest/api/v1/governance/documents/visibilityoverrides`](/api/client-api/governance/setdocvisibility) | [Hide or unhide docs](/api/client-api/governance/setdocvisibility)

Sets the visibility-override state of the documents specified, effectively hiding or un-hiding documents.

 |
