---
url: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/troubleshooting"
title: "Autodesk Construction Cloud troubleshooting and FAQs"
description: "Resolve common ACC connector setup and content issues, and read answers to frequently asked questions."
fetched_at: "2026-09-01T13:29:22.548Z"
---
On this page

## Setup and authorization[​](#setup-and-authorization "Direct link to Setup and authorization")

### Authorization fails[​](#authorization-fails "Direct link to Authorization fails")

**Symptoms:**

-   The OAuth authorization flow fails or returns an error.
-   The setup flow cannot complete the Autodesk authorization step.

| Likely cause | Remediation |
| --- | --- |
| **Insufficient setup permissions:** The user completing setup is not an ACC Account Administrator. | Complete setup as a user who is an ACC Account Administrator. |
| **App not authorized as Custom Integration:** The Autodesk app is not authorized as a Custom Integration in the target ACC account. | Authorize the Autodesk app as a Custom Integration in the target ACC account. |
| **Credential or callback mismatch:** The callback URL, Client ID, or Client Secret do not match the APS app that you created. | Confirm the callback URL, Client ID, and Client Secret match the APS app that you created. |
| **Missing APIs or scopes:** The required Autodesk APIs and scopes are not enabled. | Enable the required Autodesk APIs and scopes on the APS app. |

### No ACC accounts appear after authorization[​](#no-acc-accounts-appear-after-authorization "Direct link to No ACC accounts appear after authorization")

**Symptoms:**

-   After authorization, Glean shows no ACC accounts to select.

| Likely cause | Remediation |
| --- | --- |
| **Admin lacks account access:** The Autodesk admin does not have access to any eligible ACC accounts. | Authorize with an Autodesk admin who has access to the ACC accounts you want to index. |
| **App not added as Custom Integration:** The APS app was not added as a Custom Integration in the target account. | Add the APS app as a Custom Integration in the target ACC account. |
| **Scopes not granted:** The required scopes were not granted during authorization. | Reauthorize and grant the required scopes during the OAuth flow. |

## Missing content[​](#missing-content "Direct link to Missing content")

### Some projects are missing[​](#some-projects-are-missing "Direct link to Some projects are missing")

**Symptoms:**

-   Specific ACC projects do not appear in Glean.

| Likely cause | Remediation |
| --- | --- |
| **Admin cannot access the projects:** The authorized ACC admin does not have access to those projects. | Confirm the authorized ACC admin can access the missing projects. |
| **Inactive projects:** The projects are not active. | Confirm the projects are active. |
| **Product modules not enabled:** The required product modules are not enabled on those projects. | Enable the required product modules on those projects. |

### Missing sheet content[​](#missing-sheet-content "Direct link to Missing sheet content")

**Symptoms:**

-   Sheet content does not appear in search results.

Limitation

Only published sheets are indexed. Draft sheets are not indexed in this release.

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Some users do not see expected content[​](#some-users-do-not-see-expected-content "Direct link to Some users do not see expected content")

**Symptoms:**

-   Users can't find ACC content they expect to have access to.

| Likely cause | Remediation |
| --- | --- |
| **Not a project member:** The users are not members of the relevant ACC projects. | Confirm the users are members of the relevant ACC projects. |
| **Missing product access:** The users do not have the required product access, such as Build or Docs. | Grant the users the required product access, such as Build or Docs. |
| **Crawl incomplete:** The initial crawl has not completed successfully. | Confirm the initial crawl has completed successfully. |

note

Some ACC content uses a conservative visibility model:

-   Issues may not be visible to every user who can see them in ACC if they are not directly associated with the issue.
-   Early-stage submittals can be visible to a narrower set of participants than later-stage submittals.
-   Closed submittals may be visible more broadly or more narrowly depending on your deployment configuration.

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Stale data[​](#stale-data "Direct link to Stale data")

**Symptoms:**

-   Recently updated ACC content does not appear in Glean.

| Likely cause | Remediation |
| --- | --- |
| **Object-type recrawl latency:** Some ACC object types rely on broader recrawls than others, so updates can take longer to appear. | If recently updated content has not appeared after a reasonable interval, check connector health in the Glean Admin console. |

## FAQs[​](#faqs "Direct link to FAQs")

### Does one connector instance support multiple ACC accounts?

No. Each connector instance connects to one ACC account. Create a separate connector instance for each ACC account that you want to index.

### Do I need to create an Autodesk app?

Yes. Create an Autodesk Platform Services app and authorize it for the ACC account that you want Glean to index.

### Are attachments indexed?

Glean indexes supported attachments for RFIs, Issues, Submittals, and published Sheets when Autodesk APIs make that content available.

### Are project members searchable in Glean?

No. Member data is used for identity and permissions, not as standalone Autodesk Construction Cloud search documents.

### Are draft sheets indexed?

No. Only published sheets are indexed in this release.

### Are Schedule, Meetings, and Specifications indexed?

No. These objects are not supported in this release.

### Who should set up the connector?

A Glean admin and an ACC Account Administrator should complete setup. The same person can do both if they hold both roles.
