---
url: "https://docs.glean.com/administration/platform/mcp/glean-plugin-cursor"
canonical: "https://docs.glean.com/administration/platform/mcp/glean-plugin-cursor"
title: "Deploy the Glean plug-in in Cursor"
description: "Prepare Glean access and validate the per-user Cursor plug-in installation before rollout."
fetched_at: "2026-09-01T13:29:12.768Z"
---
On this page

Prepare your Glean environment for Cursor, then validate the plug-in with a pilot user before sharing the setup instructions with your organization.

The current Cursor setup is per user. Administrators configure and govern Glean access, but each user installs the Glean plug-in from the Cursor Marketplace.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin:

-   Ensure that you have Cursor version 3.8.11 or later
-   Complete the [Glean plug-in prerequisites](/administration/platform/mcp/glean-plugin#prerequisites)
-   Confirm that pilot users have a Glean account and access to the tools and Skills they need

note

Earlier Cursor versions prevent human-in-the-loop approval for write tools from functioning properly. Upgrade to make sure tool approvals and file edits work securely.

## Prepare Glean for Cursor[​](#prepare-glean-for-cursor "Direct link to Prepare Glean for Cursor")

1.  Enable the [Glean OAuth authorization server](/administration/oauth/authorization-server).
2.  Configure [Dynamic Client Registration](/administration/oauth/dynamic-client-registration). If you allow only approved applications, include **Glean CLI**.
3.  Enable the tools and Skills your users need and make them available to the intended users. See [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin).

## Validate with a pilot user[​](#validate-with-a-pilot-user "Direct link to Validate with a pilot user")

Run the complete setup with a pilot user before rolling it out more broadly:

1.  In Cursor, open **Cursor Settings → Marketplace**.
2.  Search for **Glean**, then click **Add to Cursor**.
3.  Confirm that `/glean_run` is available in Cursor chat.
4.  Complete the Glean authentication flow when prompted.
5.  Ask Cursor to search for content the pilot user can access in Glean.
6.  Confirm that:
    -   The search succeeds and respects the pilot user's Glean permissions
    -   The expected tools and Skills are available
    -   Cursor asks the user for approval before a write tool runs

For current Cursor requirements and installation steps, see [Glean Plugin for Cursor](https://developers.glean.com/guides/mcp/cursor) on the Developer Portal.

## Roll out to users[​](#roll-out-to-users "Direct link to Roll out to users")

Share [Set up the Glean plug-in in Cursor](/user-guide/mcp/glean-plugin-cursor) with your users. Each user installs the plug-in and authenticates with their own Glean account.

For the standard Glean MCP remote server path, see [Deploy an MCP server with MDM](/administration/platform/mcp/mdm-mcp). MDM deployment is separate from the plug-in path.

## See also[​](#see-also "Direct link to See also")

-   [Set up the Glean plug-in in Cursor](/user-guide/mcp/glean-plugin-cursor)
-   [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin)
-   [Troubleshoot Glean plug-in deployment](/administration/platform/mcp/troubleshoot-glean-plugin)
