---
url: "https://docs.glean.com/connectors/native/asana/about"
canonical: "https://docs.glean.com/connectors/native/asana/about"
title: "Asana overview"
description: "Learn what the Asana connector indexes, how permissions work, and how Asana tools are authorized in Glean."
fetched_at: "2026-10-13T08:49:45.076Z"
---
On this page

Connect Asana to Glean to search across tasks, comments, and projects. Glean enforces Asana user access permissions for indexed content. You can also connect Asana's MCP server for live fetch and read and write tools.

To configure the connector, see [Choose your setup](/connectors/native/asana/choose-your-setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Ingest Asana tasks, comments, and project metadata for enterprise search.
-   Enforce user-level Asana permissions for indexed content.
-   Exclude specific projects from search with project redlisting.
-   Receive activity updates through Asana webhooks for supported workspace and project resources after the initial crawl. Scheduled crawls cover everything else.
-   Use Asana's MCP server for live fetch and read and write tools. With interactive authorization, each user authenticates with Asana, and Asana limits that user's actions to the workspaces and data they can access. With Cross App Access, the identity provider issues each user's token instead.

Glean uses the indexing connection only to read Asana data. Asana tools can change data when you enable the tool and the authenticated Asana user has permission to perform the action.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Tasks | Indexed tasks, including tasks without a project when that crawling is enabled |
| Comments | Comments attached to supported tasks |
| Projects | Project metadata for display and faceting |
| Attachments | Attachment name, type, and link on a task, without the file itself |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   `/api/1.0/projects`: Crawls project data.
-   `/api/1.0/tasks`: Crawls task data.
-   `/api/1.0/users`, `/api/1.0/teams`, and `/api/1.0/organizations`: Supports identity mapping and permission enforcement.
-   `/api/1.0/workspaces`: Provides workspace context for scoping.
-   `/api/1.0/events`: Captures activity on indexed tasks in a project.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tasks | Yes | Yes | Yes | Yes | On change | Yes | Tasks in a project use project webhooks and incremental crawls. Tasks without a project follow a separate path with no webhook coverage. |
| Comments | Yes | Yes | Yes | Yes | On change | Yes | Glean indexes comments only for supported tasks. |
| Projects | Yes | Yes | Yes | Yes | On change | Yes | Glean crawls projects unless you redlist them. |

-   Full crawl frequency depends on your Glean configuration and corpus size. Large Enterprise instances may require multi-day initial crawls.
-   Asana applies two webhook limits: 1,000 webhooks per resource, counting any `/events` streams on that resource, and 10,000 active webhooks per token. Glean registers webhooks on the workspace and on eligible projects using one of the configured Asana indexing tokens, and an administrator can disable webhook registration for your deployment. Asana filters task, subtask, and story events out of workspace-level webhooks, so the workspace webhook reports membership, team, and project changes rather than individual task changes. Tasks that do not belong to a project therefore receive no webhook updates, and scheduled crawls pick up those changes instead.
-   Glean detects changes to tasks in a project by comparing each task's last modified time against the previous crawl. For tasks without a project, Glean queries Asana's task search API instead, which requires a premium Asana workspace and carries a lower rate limit, so these updates can lag behind.

## Tools and permissions[​](#tools-and-permissions "Direct link to Tools and permissions")

The New setup Connect step authorizes access to Asana's MCP server for live fetch and tools. Choose the authorization method shown on the setup page:

-   With interactive authorization, create an Asana MCP OAuth app, not a standard API app, and use its client credentials in the Glean setup page. Each user then authenticates with Asana.
-   With Cross App Access, configure the identity provider and Asana MCP app so the identity provider issues each user's token. Users are not asked to connect an Asana account.

MCP OAuth apps do not use configurable scopes. In either mode, Asana limits access to the workspaces and data available to the authenticated user.

After setup, open the connector's **Tools** tab to review the available read and write tools. Use **Advanced settings** to enable tools and set access for each surface:

-   **Chat**
-   **Agents**
-   **Glean MCP Server**

Changes to Advanced settings apply immediately.

## Limitations[​](#limitations "Direct link to Limitations")

-   Glean crawls tasks that do not belong to any project by default, but this depends on Asana's task search API, which requires a premium Asana workspace. Permission handling for tasks without a project is also limited, so an administrator can turn this crawling off for your deployment. Contact [Glean Support](https://support.glean.com) to check or change the behavior.
-   For private projects, add the Glean administrator or service account to the project explicitly.
-   Glean does not support or index portfolios, forms, or messages.
-   Glean indexes attachment names, types, and links on a task, but does not index attachment file contents.
-   Glean ingests only the Asana custom task fields named `priority` and `status`, and exposes them as search facets. Glean does not index other custom fields.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Asana setup](/connectors/native/asana/choose-your-setup)
-   [New setup](/connectors/native/asana/new-setup)
-   [Previous setup](/connectors/native/asana/setup)
