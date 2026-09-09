---
url: "https://docs.glean.com/connectors/native/jira/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/jira/troubleshooting"
title: "Troubleshooting and FAQ"
description: "Common issues and questions for the Jira Cloud and Jira Data Center connectors."
fetched_at: "2026-09-01T13:29:33.541Z"
---
On this page

This page covers common issues and frequently asked questions for the Jira Cloud and Jira Data Center connectors. Use the Troubleshooting section to diagnose and resolve specific problems, and the FAQ section for answers about connector behavior, supported content, and known limitations.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Missing content[​](#missing-content "Direct link to Missing content")

Issues from certain Jira projects are missing from Glean

**Symptoms**

-   Issues from one or more Jira projects don't appear in search results.
-   Other projects are indexed correctly.
-   Connector status shows as healthy.

**Likely causes**

-   The Glean app or service account lacks Browse Projects permission for the affected project.
-   The project uses an Issue Security Scheme and the Glean app is not included in the relevant security level.
-   A project allowlist is configured and excludes this project.

**Fixes**

-   In Jira, confirm the Glean app (Cloud) or service account (Data Center) has at least **Browse Projects** on the missing project.
-   In Jira, open the project's Issue Security Scheme and add the Glean app or integration user to the applicable security level.
-   In **Admin console → Connectors → Jira → Settings**, check for a project allowlist and add the missing project, then trigger a re-crawl.

→ See [JIRA\_7](/troubleshooting/error-codes/jira/jira-7) (Cloud) or [JIRA\_2](/troubleshooting/error-codes/jira-onprem/jira-2) (Data Center) for the full resolution steps

Jira Service Management request types are not appearing in Glean

**Symptoms**

-   Standard Jira issues are indexed correctly.
-   Jira Service Management (JSM) request types in a specific project are missing from search.
-   No errors appear in the connector health view.

**Likely causes**

-   The JSM request types have no portal group assigned in Jira.
-   The Glean app does not have access to the JSM project.

**Fixes**

-   In Jira Service Management, open the affected project, go to **Project Settings → Request Types**, and confirm each request type is assigned to at least one portal group; unassigned request types are not indexed.
-   Verify the Glean app has Browse Projects and Service Desk Team permissions on the JSM project.

Custom fields from Jira issues are not appearing in Glean

Glean handles Jira custom fields in separate ways, and the fix depends on what you need. For details, see [Custom fields](/connectors/native/jira#custom-fields).

**Symptoms**

-   A Jira custom field's value is missing from Glean Assistant or agent answers.
-   A custom field you expect to filter on does not show up as a facet.

**Fixes**

-   **Value missing from Assistant or agents.** The field must be greenlisted. In **Admin console → Connectors → Jira → Manage data → Inclusion rules**, add the field ID to **Custom fields to be included**, then trigger a full re-crawl. See [Custom fields](/connectors/native/jira#custom-fields).
-   **Field missing as a facet.** Supported types (text, single-select, user, number, date, date-time, and labels) are faceted automatically. If a supported field is still missing, confirm the field is visible to the Jira connector and trigger a full re-crawl. Object and array-of-object fields, such as Assets or CMDB fields, do not appear as facets; greenlist them to pass the raw value to Assistant and agents instead.

note

Object fields and arrays of objects, such as Assets or CMDB fields, have limited support. They do not appear as facets, and greenlisting one stores its raw value only. If a field of this type is not appearing after configuration, contact [Glean Support](https://support.glean.com) with the field IDs and field types.

### Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

All users see an error like `user is not in any doc type access group: JIRA:jira-software-users` and cannot access Jira in Glean

**Symptoms**

-   Multiple users report Jira is not listed under their connectors in Glean.
-   Searching for Jira content returns no results or an access error.
-   Users confirmed they have access in Jira itself.
-   The issue affects all users, not just one or two.

**Likely causes**

-   The connector's credentials have expired or timed out, causing the identity sync to stop.
-   The identity crawl has not run since a recent permission or membership change.

**Fixes**

-   In **Admin console → Connectors → Jira**, check the connector health status; if credentials are flagged as invalid or unhealthy, re-authenticate and wait for the next identity crawl to complete.
-   In **Admin console → Connectors → Jira → Crawl History**, check whether the most recent identity crawl succeeded; if it failed or is stale, trigger a new one manually.

→ See [JIRA\_3](/troubleshooting/error-codes/jira/jira-3) or [JIRA\_11](/troubleshooting/error-codes/jira/jira-11) for the full resolution steps

note

When Jira credentials fail, all users lose access simultaneously because identity data stops syncing. Re-authenticating the connector restores access after the next successful identity crawl - typically within a few hours. If the issue persists after re-authentication, contact [Glean Support](https://support.glean.com).

A user can still see a Jira issue in Glean after being removed from the project

**Symptoms**

-   A user was removed from a Jira project.
-   The user can still find issues from that project in Glean search.
-   The issue persists more than 24 hours after the permission change in Jira.

**Likely causes**

-   The identity crawl has not yet completed since the permission change.
-   On Jira Data Center, the permission rebuild may be delayed by a long-running full crawl.

**Fixes**

-   In **Admin console → Connectors → Jira → Crawl History**, check whether the most recent identity crawl succeeded; if it failed or is stale, trigger a new one manually.
-   Contact [Glean Support](https://support.glean.com) with the affected user's email, the project key, an example issue URL, and the time the permission was changed in Jira.

note

Permission changes in Jira are reflected in Glean after the next successful identity crawl. For urgent removals, triggering an identity crawl manually from the Admin console is the fastest path to resolution.

### Authentication and setup[​](#authentication-and-setup "Direct link to Authentication and setup")

The connector shows a credential failure or **SEVERE** health alert

**Symptoms**

-   The Jira connector health page shows a **SEVERE** or failed status for credentials.
-   Jira search results stop returning in Glean or in Assistant.
-   The error persists across multiple days.

**Likely causes**

-   Admin access was removed from the Glean service account in Jira.
-   The service account password or API token was rotated without updating Glean.
-   For Jira Data Center: the tool token used for Jira tools in Assistant has gone stale.

**Fixes**

-   In Jira, confirm the Glean app (Cloud) or service account (Data Center) still has the required permissions; restore admin access and re-authenticate the connector from **Admin console → Connectors → Jira**.
-   In **Admin console → Connectors → Jira**, update the credentials with the new API token or password and save.
-   Re-authenticate the connector; if Jira tools specifically are failing, contact [Glean Support](https://support.glean.com) to reset the tool token.

The connector is stuck in **Activating** or shows an authentication error after initial setup

**Symptoms**

-   Jira connector status stays in **Activating** after setup.
-   Error messages indicate invalid credentials or insufficient permissions.

**Likely causes**

-   The Glean crawler app (Cloud) was not successfully installed on the Jira instance.
-   The service account (Data Center) lacks Jira Administrators global permission.
-   OAuth authorization was completed in the wrong Jira workspace in the browser.

**Fixes**

-   In Jira, go to **Settings → Apps** and confirm the Glean Crawler app is installed and active.
-   In Jira Data Center, confirm the service account has the **Jira Administrators** global permission, or follow the non-admin setup guide.
-   Sign out of all Jira sessions, then re-authorize from **Admin console → Connectors → Jira**.

→ See [JIRA\_6](/troubleshooting/error-codes/jira/jira-6) or [ATLASSIAN\_1](/troubleshooting/error-codes/atlassian/atlassian-1) for the full resolution steps for Cloud errors. For Data Center errors, see [JIRA\_2](/troubleshooting/error-codes/jira-onprem/jira-2), [JIRA\_4](/troubleshooting/error-codes/jira-onprem/jira-4), or [JIRA\_5](/troubleshooting/error-codes/jira-onprem/jira-5)

### Crawl behavior[​](#crawl-behavior "Direct link to Crawl behavior")

Jira links in Glean search results point to the wrong URL

**Symptoms**

-   Clicking a Jira issue in Glean search opens the wrong host or returns a 404.
-   The URL shown in Glean uses a different subdomain than the Jira URL your users normally visit (for example, `jirarest.company.com` instead of `jira.company.com`).

**Likely causes**

-   The Base URL in the connector setup is set to the internal REST API endpoint instead of the user-facing Jira UI host.

**Fixes**

-   In **Admin console → Connectors → Jira → Settings**, update the **Base URL** to the URL your users use to access Jira in their browser (for example, `https://jira.company.com`).

→ See [JIRA\_1](/troubleshooting/error-codes/jira-onprem/jira-1) (Data Center) or [ATLASSIAN\_1](/troubleshooting/error-codes/atlassian/atlassian-1) (Cloud) for the full resolution steps

note

On some Jira Data Center installations, the REST API endpoint and the user-facing UI are on different hosts. If updating the Base URL causes crawl errors, contact [Glean Support](https://support.glean.com) - your setup may require custom URL routing configuration.

The initial Jira Data Center crawl is taking an unexpectedly long time

**Symptoms**

-   The full crawl has been running for many days or weeks.
-   Some Jira content appears in Glean but older issues are still missing.
-   Incremental crawls cannot proceed while the full crawl is in progress.

**Likely causes**

-   The Jira Data Center instance has a very large number of issues with no crawl date filter set.
-   Crawler resource contention from the Jira Data Center server.

**Fixes**

-   In **Admin console → Connectors → Jira → Settings**, set a **Crawl Start Date** to limit the initial crawl to more recent issues; once the initial crawl completes, you can widen the date range in subsequent full crawls.
-   Contact [Glean Support](https://support.glean.com) to review crawler configuration and QPS limits for your Jira Data Center instance.

## FAQ[​](#faq "Direct link to FAQ")

Does Glean require admin-level permissions for the Jira connector?

**Jira Cloud:** Yes, admin-level permissions are currently required. The Glean crawler app needs the `ADMIN` scope to access issue security schemes and user group memberships.

**Jira Data Center:** A non-admin setup is supported. It uses a dedicated service account with reduced permissions and a custom plugin endpoint. Contact [Glean Support](https://support.glean.com) to enable the non-admin configuration for your Jira Data Center instance.

Which versions of Jira Data Center does Glean support?

Glean supports all actively maintained versions of Jira Data Center. Glean automatically selects the correct plugin version when you install from the Atlassian Marketplace:

| Jira DC version | Glean plugin version |
| --- | --- |
| Below 9.0 | 1.6.1 or earlier |
| 9.0 – 9.x | 1.7.0 |
| 10.0 and above | 2.0.0 or later |

Does Glean support Jira Service Management?

Yes. The Jira connector indexes Jira Service Management request types and forms in addition to standard Jira issues and projects. No separate connector configuration is needed - the same app installation covers both Jira Software and Jira Service Management. Request types must be assigned to a portal group in Jira to be indexed.

How does Glean handle Jira issue security schemes?

Glean respects Jira issue security schemes. Issues restricted to specific security levels are only visible in Glean to users who have access to those levels in Jira. On Jira Cloud, the crawler app must have admin permission to read the security scheme configuration. On Jira Data Center, the non-admin setup uses a dedicated plugin endpoint for this instead.

Can Glean connect to both Jira Cloud and Jira Data Center for the same organization?

Yes, but each instance requires a separate connector configuration. Set up one Jira connector instance for Cloud and a separate one for Data Center in **Admin console → Connectors**. The two instances are indexed independently.

Does Glean support OAuth for Jira Data Center?

Yes, OAuth is supported for Jira Data Center, including both refreshable and long-lived tokens. However, OAuth for Jira Data Center is not available through the self-serve setup in the Admin console. Contact [Glean Support](https://support.glean.com) to enable OAuth authentication for your Jira Data Center instance.
