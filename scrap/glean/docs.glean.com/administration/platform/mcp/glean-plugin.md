---
url: "https://docs.glean.com/administration/platform/mcp/glean-plugin"
canonical: "https://docs.glean.com/administration/platform/mcp/glean-plugin"
title: "Glean plug-in for coding hosts"
description: "Evaluate and prepare the Glean plug-in for Cursor, Claude Code, and Codex."
fetched_at: "2026-09-01T13:29:12.608Z"
---
On this page

The Glean plug-in gives Cursor, Claude Code, and Codex users access to Glean Skills and tools. It discovers eligible skills and tools dynamically and runs them through Glean's governed gateway. Installation differs by host, so use the host-specific deployment guide for the current setup path.

## Choose a task[​](#choose-a-task "Direct link to Choose a task")

[

### Deploy in Cursor

Prepare Glean access and validate the per-user Cursor installation before rollout.







](/administration/platform/mcp/glean-plugin-cursor)[

### Deploy in Claude Code

Add the marketplace and plug-in to a repository.







](/administration/platform/mcp/glean-plugin-claude-code)[

### Deploy in Codex

Prepare Glean and validate the per-user Codex installation before rollout.







](/administration/platform/mcp/glean-plugin-codex)[

### Manage access and security

Control tool and Skills access, approvals, and monitoring.







](/administration/platform/mcp/manage-glean-plugin)[

### Troubleshoot deployment

Resolve marketplace, authentication, permission, and tool availability issues.







](/administration/platform/mcp/troubleshoot-glean-plugin)[

### Use the Glean plug-in

Share installation, authentication, and usage guidance with users.







](/user-guide/mcp/glean-plugin)

## Supported hosts[​](#supported-hosts "Direct link to Supported hosts")

-   Cursor 3.8.11 or later
-   Claude Code
-   Codex

Claude Cowork and GitHub Copilot aren't supported.

## Decide whether the plug-in fits[​](#decide-whether-the-plug-in-fits "Direct link to Decide whether the plug-in fits")

The plug-in gives users access to Glean tools across the 300+ applications Glean supports, along with your organization's Skills, through a single installation. The alternative is curating a standard Glean MCP server for each team or use case.

Routing requests through Glean keeps:

-   Access permission-aware, so users can only search, read, and act on content they can already access in Glean
-   Administration centralized in Glean instead of separate configurations for each host or team
-   Write-action confirmation requirements in effect regardless of the host

The plug-in is a good fit when your users work in a supported host and need access to many Glean tools and Skills. It isn't optimized for a small, controlled subset of connector tools. For that use case, configure a [standard Glean MCP server](/administration/platform/mcp/create-mcp-servers) and choose the exact tools to expose.

Using the plug-in doesn't affect your Glean usage consumption.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you deploy the plug-in:

-   Enable the [Glean OAuth authorization server](/administration/oauth/authorization-server)
-   Configure [Dynamic Client Registration](/administration/oauth/dynamic-client-registration) according to your organization's OAuth policy
-   Enable the tools and Skills your users need and make them visible to the intended users or groups

### Configure Dynamic Client Registration[​](#configure-dynamic-client-registration "Direct link to Configure Dynamic Client Registration")

The plug-in authenticates through Glean's OAuth authorization server and registers itself using Dynamic Client Registration (DCR).

1.  In the **Admin console**, go to **Third-party access**.
2.  Open **Manage settings** for **Dynamic client registrations (DCR)**.
3.  Choose an option:
    -   **Allow any application** lets users register any application that supports DCR
    -   **Allow approved applications** restricts registration to an approved list. Include **Glean CLI** so the plug-in can register
4.  Click **Save**.

![Dynamic client registration settings in the Glean Admin console, with Allow any application selected.](/img/administration/mcp/glean-plugin/dcr-allow-any-application.png)

Dynamic client registration settings with Allow any application selected

If you choose **Allow approved applications**, select the lists that registration is restricted to.

![Allow approved applications expanded, with the Glean-managed and custom application lists selected.](/img/administration/mcp/glean-plugin/dcr-approved-applications.png)

Approved application lists for dynamic client registration

For more information about each option, see [Dynamic Client Registration](/administration/oauth/dynamic-client-registration).

## See also[​](#see-also "Direct link to See also")

-   [About Glean MCP server](/administration/platform/mcp/about)
-   [Glean MCP Gateway](/administration/platform/mcp/mcp-gateway)
-   [Deploy an MCP server with MDM](/administration/platform/mcp/mdm-mcp)
-   [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools)
