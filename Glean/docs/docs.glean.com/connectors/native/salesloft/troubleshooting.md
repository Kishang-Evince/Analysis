---
url: "https://docs.glean.com/connectors/native/salesloft/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/salesloft/troubleshooting"
title: "Salesloft troubleshooting and FAQs"
description: "Resolve Salesloft connector authentication, permissions, missing-content, and freshness issues."
fetched_at: "2026-10-13T08:50:14.138Z"
---
On this page

This page covers common Salesloft connector setup, authentication, permission, and crawl issues. For setup steps, see the [Salesloft setup guide](/connectors/native/salesloft/setup).

## Setup and authentication[​](#setup-and-authentication "Direct link to Setup and authentication")

### Salesloft authorization fails[​](#salesloft-authorization-fails "Direct link to Salesloft authorization fails")

**Symptoms:**

-   Glean cannot authorize the Salesloft connector.
-   Validation reports `SALESLOFT_1` or says that the access token is invalid, expired, or missing.
-   Validation reports that the token cannot access the Salesloft team endpoint.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Incorrect Client ID or Client Secret:** The credentials in Glean do not match the Salesloft private application. | Copy the **Application ID (Client ID)** and **Secret (Client Secret)** from Salesloft and enter them again in the Glean connector settings. Then click **Save** and **Authorize**. |
| **Wrong grant type:** The application uses an OAuth grant other than **Client Credentials**. | Create or update the Salesloft application to use the **Client Credentials** grant. |
| **Insufficient Salesloft access:** The account that created the application cannot access the team endpoint or the records you need to index. | Create the private application with a Salesloft **Super Admin** or **Team Admin** account, or an equivalent account with workspace-wide access. Then update the credentials in Glean and authorize again. |
| **Missing `team:read` scope:** The token cannot read Salesloft team metadata. | Add `team:read` to the private application, save the application, and authorize the connector again. |

For the validation error and resolution steps, see [SALESLOFT\_1](/troubleshooting/error-codes/salesloft/salesloft-1).

### Salesloft authorization succeeds but records are missing[​](#salesloft-authorization-succeeds-but-records-are-missing "Direct link to Salesloft authorization succeeds but records are missing")

**Symptoms:**

-   Validation succeeds, but one or more record types do not appear after a crawl.
-   People or accounts appear, but activity emails, calls, notes, tasks, meetings, or cadences do not.

| Likely cause | Fix / Remediation |
| --- | --- |
| **A required scope is missing:** The private application does not include the scope for the missing record type. | Compare the application scopes with the complete list in [Salesloft setup](/connectors/native/salesloft/setup#step-1-create-a-private-application-in-salesloft). Add the missing scope, save the application, and authorize Glean again. |
| **The application creator has limited access:** The access token reflects the permissions of the account that created the application. | Create the application with workspace-wide access and update the connector credentials. |
| **The record type is outside the connector scope:** The connector supports People, Accounts, Cadences, Activity emails, Activity calls, Notes, Tasks, and Meetings. | Confirm that the missing data belongs to one of the supported types. The connector does not index custom Salesloft fields or other Salesloft modules. |
| **The record has a missing relationship:** Some secondary records require an associated person, or an account for notes, before Glean can resolve their inherited permissions. | Confirm that the Salesloft record has the required association, then allow the next relevant crawl to process it. |

### Activity-email subjects or bodies are missing[​](#activity-email-subjects-or-bodies-are-missing "Direct link to Activity-email subjects or bodies are missing")

The connector requests activity-email `subject` and `body` values with the `email_contents` and `email_bodies` scopes. Add both scopes to the private application, save the application, and authorize Glean again.

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### A user cannot see a Salesloft record[​](#a-user-cannot-see-a-salesloft-record "Direct link to A user cannot see a Salesloft record")

**Symptoms:**

-   A user can access a record in Salesloft but cannot find it in Glean.
-   A user can find some Salesloft records but not a specific person, account, cadence, activity, note, task, or meeting.

| Likely cause | Fix / Remediation |
| --- | --- |
| **The record owner or associated owner is missing from Glean:** Glean cannot resolve the Salesloft owner to a Glean identity. | Confirm that the owner's email and Salesloft user record are present, then allow the hourly identity crawl and the next applicable content crawl to run. |
| **The Salesloft team access mode limits the record:** People and accounts can use owner or group-and-subordinate access rather than organization-wide access. | Check the Salesloft team access settings and the user's owner or group membership. Identity and group membership data is synchronized hourly; updated content is synchronized approximately every five minutes, and full content crawls run at least weekly. |
| **A related record inherits access:** Activity emails, calls, tasks, and meetings inherit access from their associated person; notes can inherit access from an associated person or account. | Check the related record's person or account permissions rather than only its author or attendee. |
| **The application creator cannot access the record:** Glean uses the private application's workspace access for crawling. | Create the application with an account that can access the required records, then update and reauthorize the connector. |

Glean derives access from Salesloft ownership, groups, built-in roles, custom roles, team access modes, and cadence-sharing rules. Metadata such as a task author, call participant, or meeting attendee does not independently grant access.

## Crawl and freshness issues[​](#crawl-and-freshness-issues "Direct link to Crawl and freshness issues")

### Changes in Salesloft are not appearing in Glean[​](#changes-in-salesloft-are-not-appearing-in-glean "Direct link to Changes in Salesloft are not appearing in Glean")

**Symptoms:**

-   A newly created or updated record is not searchable.
-   A record still shows older information.
-   A deleted record remains in Glean.

| Likely cause | Fix / Remediation |
| --- | --- |
| **The five-minute incremental crawl has not run:** Content crawls use Salesloft's `updated_at[gt]` filter. | Check the connector status and allow the next incremental crawl to complete. |
| **A full reconciliation is required:** Full crawls reconcile records that incremental crawls did not capture and remove records that Salesloft no longer returns. | Allow the weekly full crawl to complete. |
| **Identity or access metadata changed:** Users, groups, roles, and team access settings use separate hourly full crawls. | Allow the next identity crawl and the next content crawl to complete. |
| **Salesloft API limits or a temporary failure slowed processing:** Glean could not complete one or more requests. | Check the connector status and allow a later crawl to retry. Contact Glean Support if the issue continues. |

The connector uses scheduled polling and does not use Salesloft webhooks. Identity and group membership data is synchronized hourly. Updated content is synchronized approximately every five minutes, and full content crawls run at least weekly. The time required for a permission change to appear in Glean depends on the type of change. Your deployment can use different crawl periods from the defaults in [Salesloft overview](/connectors/native/salesloft/about#crawling-and-update-frequency).

## FAQs[​](#faqs "Direct link to FAQs")

### Does the connector use OAuth user consent?

No. Salesloft uses a private application with the OAuth 2.0 Client Credentials grant. Glean mints a workspace access token from the Client ID and Client Secret after you click **Authorize** in the Admin console.

### Which Salesloft data does the connector index?

Glean indexes People, Accounts, Cadences, Activity emails, Activity calls, Notes, Tasks, and Meetings. See [Salesloft overview](/connectors/native/salesloft/about#supported-objects) for the fields and permissions for each type.

### Does the connector use Salesloft webhooks?

No. The connector uses scheduled polling: content incrementals run every five minutes by default, full content crawls run weekly, and identity data runs hourly.

### Why does a user see fewer records in Glean than in Salesloft?

Glean reconstructs access from Salesloft ownership, groups, roles, team access modes, and cadence-sharing rules. Confirm that the user's Salesloft identity, group membership, and the record's owner or association have reached Glean through the relevant identity and content crawls.

### Does the connector index custom Salesloft fields?

No. The connector indexes the selected fields and content described in [Salesloft overview](/connectors/native/salesloft/about). Salesloft custom fields are not mapped into indexed content or facets.

## See also[​](#see-also "Direct link to See also")

-   [Salesloft overview](/connectors/native/salesloft/about)
-   [Salesloft setup](/connectors/native/salesloft/setup)
-   [SALESLOFT\_1](/troubleshooting/error-codes/salesloft/salesloft-1)
