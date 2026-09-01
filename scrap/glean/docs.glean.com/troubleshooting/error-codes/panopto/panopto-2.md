---
url: "https://docs.glean.com/troubleshooting/error-codes/panopto/panopto-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/panopto/panopto-2"
title: "PANOPTO_2"
description: "PANOPTO_2 Error Code"
fetched_at: "2026-09-01T13:30:29.074Z"
---
On this page

## Issue: Search Engine Feature or API Access Error[​](#issue-search-engine-feature-or-api-access-error "Direct link to Issue: Search Engine Feature or API Access Error")

This error occurs during connector setup validation when Glean verifies that the `SearchIndexSync` endpoint is accessible. Access to this endpoint is required for incremental crawls to detect and index content updates.

### Possible causes[​](#possible-causes "Direct link to Possible causes")

-   The **Search Engine** feature is disabled within your Panopto site settings.
-   The Panopto administrator account used to authorize the Glean connector is not authorized to access the **Search Index Connector API**.

## Resolution[​](#resolution "Direct link to Resolution")

To fix this issue:

1.  Log in to Panopto with an Administrator account.
2.  Click the **gear icon** in the bottom-left corner to access system settings.
3.  Navigate to **Settings** → **Search Engine Settings**.
4.  Under **User to Access Index Connector API**, enter the username of the Panopto administrator account that was used to authorize the Glean connector.
5.  Click **Save**.
6.  Return to the Glean Admin UI and retry the connector setup validation.

If the error persists, contact [Glean Support](https://support.glean.com) for further assistance.
