---
url: "https://docs.glean.com/connectors/native/asana/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/asana/troubleshooting"
title: "Asana troubleshooting and FAQs"
description: "Resolve common Asana connection, indexing, permission, and tools issues in Glean."
fetched_at: "2026-10-13T08:49:45.648Z"
---
On this page

This page covers issues most often reported on the Asana connector. For setup steps, see [Choose your Asana setup](/connectors/native/asana/choose-your-setup).

## Setup and authentication[​](#setup-and-authentication "Direct link to Setup and authentication")

### OAuth authorization fails[​](#oauth-authorization-fails "Direct link to OAuth authorization fails")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| Setup cannot complete after selecting **Connect**, or authorization returns an error. | You created an API app instead of an MCP app, or you did not distribute the app to the authorizing user's workspace. | Create an [Asana MCP app](/connectors/native/asana/new-setup#create-an-mcp-app), not a standard API app. Distribute the app to the workspace used by the authorizing user, then retry. |

### The redirect URL does not match[​](#the-redirect-url-does-not-match "Direct link to The redirect URL does not match")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| Asana rejects the OAuth request with a redirect or callback URL error. | You entered a redirect URL in Asana that differs from the Callback URL for this Glean deployment. | In the Asana app, open **OAuth** and compare the redirect URL with the [Callback URL instructions](/connectors/native/asana/new-setup#register-the-callback-url). The scheme, host, and path must match exactly. Do not reuse a callback URL from another Glean deployment or environment. |

### The app is unavailable to the workspace[​](#the-app-is-unavailable-to-the-workspace "Direct link to The app is unavailable to the workspace")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| Asana displays: *This app is not available to your Asana workspace or organization.* | You selected **Specific workspaces** but did not select a workspace, or the authorizing user belongs to a different workspace. | Open **Manage distribution** in Asana and review [workspace access](/connectors/native/asana/new-setup#configure-workspace-access). Select at least one workspace, save the change, and retry authorization. |

## Indexing and permissions[​](#indexing-and-permissions "Direct link to Indexing and permissions")

### Indexing fails[​](#indexing-fails "Direct link to Indexing fails")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| The initial crawl fails or no Asana content appears in search. | The access token is invalid, the indexing identity cannot access the required projects, or the Asana domain does not match the workspace name. | Review [indexing credentials](/connectors/native/asana/new-setup#step-2-set-up-indexing). Confirm that the token is valid, the token owner can access the required projects, and the domain exactly matches the workspace `name` field returned by the [Asana workspaces API](https://app.asana.com/api/1.0/workspaces?opt_pretty), including capitalization. |

### Private project content is missing[​](#private-project-content-is-missing "Direct link to Private project content is missing")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| Public or shared projects are searchable, but content from a private project is missing. | The indexing administrator or service account is not a member of the private project. | Add the indexing identity explicitly to the project. Glean can index only the Asana content that the indexing identity can access. See [enter the indexing credentials](/connectors/native/asana/new-setup#enter-the-indexing-credentials). |

## Tools and access[​](#tools-and-access "Direct link to Tools and access")

### Tools do not appear[​](#tools-do-not-appear "Direct link to Tools do not appear")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| Users cannot invoke Asana tools in Chat, Agents, or Glean MCP Server. | You set User access to **None**, disabled the tool for the relevant surface, or scoped the tool away from the user. | Review the connector's [Tools tab](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector), then check [per-tool enablement](/administration/tools/managing-tools/per-tool-enable-disable), [surface settings](/administration/tools/managing-tools/tools-chat-vs-agents), and [visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping). |

### A tool cannot access the expected data[​](#a-tool-cannot-access-the-expected-data "Direct link to A tool cannot access the expected data")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| A tool runs but returns no workspace, project, or task data that the user can see in another context. | The authenticated Asana user may not have access to the workspace, or you may have limited the tool through its surface or department settings. | Confirm that the authenticated Asana user can access the data, then review [surface settings](/administration/tools/managing-tools/tools-chat-vs-agents) and [visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping). Tool settings cannot grant access that the authenticated Asana user does not have in Asana. |

### A tool works in Agents but not in Chat[​](#a-tool-works-in-agents-but-not-in-chat "Direct link to A tool works in Agents but not in Chat")

| Symptoms | Cause | Fix |
| --- | --- | --- |
| An Asana tool is available in an agent but does not appear in Glean Chat. | You enabled the tool for **Agents** but not for **Chat**, or the tool does not support Chat. | Review [which surfaces the tool supports](/administration/tools/managing-tools/tools-chat-vs-agents) and enable the **Chat** setting when it is available. The **Admin console** may label Chat as **Assistant** in some views. |

## FAQs[​](#faqs "Direct link to FAQs")

### Which Asana setup should I use?

The setup path depends on your Glean deployment date, not when you personally connect Asana. Start with [Choose your Asana setup](/connectors/native/asana/choose-your-setup) to compare the New setup and Previous setup paths.

### Does connecting Asana for tools also configure indexing?

No. In [New setup](/connectors/native/asana/new-setup), the Connect step authorizes Asana's MCP server for live fetch and tools. The separate Set up indexing step uses an access token and Asana domain for search indexing.

### Who authorizes Asana tools?

With interactive authorization, each user authenticates with Asana before using tools. If your setup page offers **Cross App Access**, your identity provider issues each user's token instead, so users are not asked to connect an Asana account. Asana limits access to the workspaces and data available to the authenticated user. Tool visibility settings can narrow availability, but they cannot grant additional Asana permissions. See [Manage tools](/connectors/native/asana/new-setup#manage-tools).

### How do I configure tools after setup?

Finish the initial connector setup, edit the Asana connector, and open the [Tools tab](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector). Use **Advanced settings** to configure individual tools, surfaces, and visibility. See the [Tools overview](/administration/tools/) for the broader configuration model.

### Why isn't Glean associating all underlying tasks with a requested project?

Asana project-to-task association has a known limitation. Results may vary in Glean Assistant and Glean Agents.

Still not resolved? Contact [Glean Support](https://support.glean.com) with the exact Asana error message, the affected workspace, and whether the issue occurs during setup, indexing, or tool use.
