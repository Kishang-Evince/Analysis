---
url: "https://docs.glean.com/user-guide/mcp/canvas"
canonical: "https://docs.glean.com/user-guide/mcp/canvas"
title: "Use Canvas content with MCP"
description: "Read and edit Glean Canvas content from an MCP host."
fetched_at: "2026-10-13T08:51:33.013Z"
---
On this page

Use Glean's MCP tools to bring existing Canvas content into another AI app and save changes back to the same item in Glean. Each successful edit creates a new version while keeping the Library URL unchanged.

note

Work with Canvas content through the MCP tools, using `search` and `read_document` to find and read it. Canvas content isn't exposed as an MCP resource through `resources/list`. The tool names use `artifact` for content saved from Canvas to **Library**.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   [Connect your host to a Glean MCP server](/user-guide/mcp/end-user-configuration).
-   Confirm that the server exposes `search` and `read_document` (the default Glean MCP server includes both tools).
-   For edit or sharing access, ask your admin to add the **Artifacts** toolset to the server, which includes `upload_artifact`, `update_artifact`, and `share_artifact`. The available tools can vary based on your organization's sharing settings.
-   Confirm that you own the Canvas content if you plan to edit or share it. People with view access can read the content but can't change it through MCP.

Admins and MCP Server Moderators can add the toolset when they [create or edit an MCP server](/administration/platform/mcp/built-in-glean-tools#artifacts).

## Read Canvas content[​](#read-canvas-content "Direct link to Read Canvas content")

Use the Library URL when you know which Canvas item you need:

1.  Open the content in Canvas or **Library** and click **Share → Copy link**. Most links end with `/library/{artifact-id}`. Meeting notes links end with `/library/notes/{meeting-notes-id}`.
2.  Give the URL to your MCP host and ask it to use Glean to read the content.
3.  Continue your task in the host. The host uses `read_document` to retrieve the latest version as context.

For example:

```
Use Glean to read this Canvas content and use it as context for my next request:https://app.glean.com/library/{artifact-id}
```

If you don't have the URL, ask the host to use `search` to find the item by title, creator, or topic, then use `read_document` on the result. Content shared by link without search visibility won't appear in search, so provide its Library URL directly.

## Edit Canvas content[​](#edit-canvas-content "Direct link to Edit Canvas content")

Have the host read the latest version immediately before it makes a change. For links that end with `/library/{artifact-id}`, the artifact ID required by `update_artifact` is the final segment.

Meeting notes links are different. The final segment in `/library/notes/{meeting-notes-id}` isn't an artifact ID. After the host uses `read_document` on the link, use the returned artifact ID for the notes or summary you want to update.

For example:

```
Use Glean to read https://app.glean.com/library/{artifact-id}.Update the executive summary to include the launch date, keep all other sections unchanged,and save the update to the same Canvas content.
```

The host calls `read_document`, makes the requested change, and passes the artifact ID and updated content to `update_artifact`. The edit creates a new version at the same Library URL.

`update_artifact` supports documents, email drafts, messages, interactive artifacts (HTML), meeting notes, images, spreadsheets, and slides.

Preserve the current content

For documents and other text-based content, `update_artifact` replaces the full body. Ask the host to read the current version immediately before editing and preserve everything outside the requested change.

`update_artifact` rejects an update if someone saves another change after the tool reads the current version and before the tool saves your update. It doesn't compare the update with the version from an earlier `read_document` call, so it doesn't automatically detect a change saved between those calls.

## Permissions and sharing[​](#permissions-and-sharing "Direct link to Permissions and sharing")

Your MCP connection uses your Glean identity and permissions:

-   `search` and `read_document` return only content that you can view
-   `update_artifact` requires you to own the Canvas content
-   `upload_artifact` saves new content to your **Library**, with you as the owner
-   `share_artifact` requires you to own the Canvas content and grants view access when your organization enables sharing

An MCP host can't use these tools to bypass Canvas permissions. Your organization must also enable [Chat Sharing](/administration/assistant/features/chat-sharing) to use `share_artifact`.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### The artifact tools are missing

Ask your admin to add the **Artifacts** toolset to the MCP server. Refresh the available tools or reconnect the server in your host after the configuration changes.

### Search doesn't find the Canvas content

Provide the Library URL directly. If `read_document` still can't retrieve it, confirm that you have permission to view the item.

### An edit is denied

Confirm that you're signed in to the expected Glean account and own the item. You can read content shared with you, but you can't change it through `update_artifact`.

## See also[​](#see-also "Direct link to See also")

-   [Canvas](/user-guide/assistant/glean-chat/canvas)
-   [Library](/user-guide/assistant/assistant-library)
-   [Using the Glean MCP Server](/user-guide/mcp/usage)
-   [Create MCP servers](/administration/platform/mcp/create-mcp-servers)
