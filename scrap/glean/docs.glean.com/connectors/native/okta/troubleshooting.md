---
url: "https://docs.glean.com/connectors/native/okta/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/okta/troubleshooting"
title: "Okta troubleshooting"
description: "Resolve common Okta connector setup, crawl, permissions, and data freshness issues."
fetched_at: "2026-09-01T13:29:36.749Z"
---
On this page

## Setup and permissions[​](#setup-and-permissions "Direct link to Setup and permissions")

### Setup fails with blank fields

Verify that single sign-on is configured and you are signed in as a super admin. Re-enter your Okta domain and try again.

### Crawl returns no users

Confirm the Glean Connector app has the `okta.users.read` scope and the Read-only Administrator role assigned.

### Missing manager or department data

These fields may require custom field mapping. Configure the appropriate Okta profile attribute mappings in the Glean admin console.

### Apps not appearing in search

Verify the Glean Connector app has the `okta.apps.read` scope granted. App crawls run daily by default.

### Okta groups are not visible

Verify that the Glean Connector app has:

-   `okta.groups.read` scope
-   Native groups enabled
-   Completed an identity crawl

The role picker includes native `OktaGroup_*` groups. Legacy `App_*` pseudo-groups and other Okta group types are not included.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

### Rate limit errors (429)

Okta rate limits vary by plan. Glean retries automatically with backoff. If persistent, contact [Glean Support](https://support.glean.com/hc/en-us/requests/new) to adjust crawl batch sizes.

### Stale people data

User crawls run every 3 hours by default. Check the crawl status in the Glean admin console to confirm crawls are completing successfully. For crawl schedules and restrictions, see [Crawl](/connectors/native/okta/restrictions).
