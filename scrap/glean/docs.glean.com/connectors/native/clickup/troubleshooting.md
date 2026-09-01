---
url: "https://docs.glean.com/connectors/native/clickup/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/clickup/troubleshooting"
title: "ClickUp troubleshooting and FAQs"
description: "Common issues and frequently asked questions for the Glean ClickUp connector."
fetched_at: "2026-09-01T13:29:24.398Z"
---
On this page

This page covers issues most often reported on the ClickUp connector, followed by [frequently asked questions](#faqs). For setup steps, see [ClickUp setup](/connectors/native/clickup/setup).

## Connectivity and setup issues[​](#connectivity-and-setup-issues "Direct link to Connectivity and setup issues")

If the **Save** or **Authorize** tool fails while configuring ClickUp in the Admin Console:

-   **Verify account access:** Ensure you are completing the OAuth flow with a ClickUp account that has permissions for the intended workspace(s).

If problems persist, capture the error message and contact Glean Support with your ClickUp workspace ID and connector configuration details.

## Missing ClickUp results[​](#missing-clickup-results "Direct link to Missing ClickUp results")

If users cannot find ClickUp tasks or docs they expect to see:

-   **Check User Authentication:** Confirm the user has completed their own ClickUp OAuth flow within Glean. Because MCP connectors use **per-user OAuth**, Glean cannot query ClickUp on a user’s behalf until they authenticate.
-   **Verify ClickUp Permissions:** Ensure the user has direct access to the relevant workspaces, folders, or tasks within ClickUp. The connector only returns records that ClickUp’s APIs expose for that specific user’s token.
-   **Refresh the connection:** If access roles were recently changed in ClickUp, the user may need to re-authenticate. The connector will automatically prompt for a new OAuth flow if it encounters a "401 Unauthorized" or "403 Forbidden" response.

## Broad or incomplete search results[​](#broad-or-incomplete-search-results "Direct link to Broad or incomplete search results")

If search results are too broad or difficult to navigate, use a more specific query that includes:

-   Task or document titles
-   Assignee names
-   Workspace context

## FAQs[​](#faqs "Direct link to FAQs")

### Does the ClickUp connector crawl or index data into Glean?

No. The ClickUp connector is implemented as an MCP live‑mode connector. It uses federated search and fetch against the ClickUp MCP server and does not run a crawler, document processor, or full/incremental indexing pipeline for ClickUp content in Glean.

### Which ClickUp objects can I search?

The connector supports tasks and ClickUp Docs as primary objects and can also surface other MCP‑exposed asset types such as whiteboards, dashboards, attachments, and chat messages where available, all subject to ClickUp permissions for the signed‑in user.

### How are permissions enforced?

Glean uses the current user’s ClickUp OAuth token for all MCP calls. ClickUp determines what the user can see based on workspace membership and roles, and Glean surfaces only those tasks and docs that the ClickUp APIs return for that user, so results remain permission‑aware and aligned with ClickUp’s own access controls.

### What happens when a ClickUp token expires or permissions change?

When the connector encounters 401/403 responses from the ClickUp MCP server, it invalidates the cached token and prompts the user to complete the OAuth flow again, ensuring that subsequent calls use a fresh token with up‑to‑date permissions.

### Can I filter ClickUp results in Glean?

Not currently. Glean does not currently support ClickUp-specific filters in search.

## See also[​](#see-also "Direct link to See also")

-   [ClickUp overview](/connectors/native/clickup/about)
-   [ClickUp setup](/connectors/native/clickup/setup)
