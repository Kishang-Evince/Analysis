---
url: "https://docs.glean.com/user-guide/mcp/artifacts"
canonical: "https://docs.glean.com/user-guide/mcp/artifacts"
title: "Save artifacts to your Library with MCP"
description: "Upload content your AI host produces to your Glean Library as an artifact, update it, and share it from an MCP host"
fetched_at: "2026-10-13T08:51:33.027Z"
---
On this page

When an AI host such as Claude, Cursor, or ChatGPT produces content like an HTML dashboard or a document, that output usually stays trapped in the host with no stable link and no way to share it. Glean's MCP artifact tools let you save that content to your Glean Library as an artifact, so it gets a stable URL, respects your permissions, and appears in search for the people you share it with.

## How artifact tools work[​](#how-artifact-tools-work "Direct link to How artifact tools work")

The **Artifacts** toolset adds three tools that a connected host can call on your behalf:

-   `upload_artifact` — saves content the host produced to your Library as a new artifact and returns a shareable link
-   `update_artifact` — saves a new version of an existing artifact at the same Library URL
-   `share_artifact` — grant people view access by email to an artifact you own

These tools save content the host already produced. They don't generate new content from a prompt. To generate images, see [Generate images with MCP](/user-guide/mcp/image-generation).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A host connected to a Glean MCP server — see [Configure the Glean MCP server](/user-guide/mcp/end-user-configuration).
-   The **Artifacts** toolset on that server, which your admin adds when they [create or edit an MCP server](/administration/platform/mcp/built-in-glean-tools#artifacts).
-   `search` and `read_document` enabled on the server so the host can find and read an artifact before it updates one. The default Glean MCP server includes both tools.
-   [Chat Sharing](/administration/assistant/features/chat-sharing) enabled for your organization to use `share_artifact`.

## Save content to your Library[​](#save-content-to-your-library "Direct link to Save content to your Library")

Ask the host to produce the content, then ask it to save the result to Glean. The host calls `upload_artifact` and returns the Library link.

```
Build an HTML status dashboard for the Q3 launch, then use Glean to save it to my Libraryand give me the link.
```

The artifact is created in your **Library** with you as the owner. `upload_artifact` supports documents and interactive artifacts such as HTML.

## Update an existing artifact[​](#update-an-existing-artifact "Direct link to Update an existing artifact")

Have the host read the current version immediately before it makes a change, so it preserves everything outside your requested edit. For a link that ends with `/library/{artifact-id}`, the artifact ID that `update_artifact` needs is the final segment.

```
Use Glean to read https://app.glean.com/library/{artifact-id}.Add a "Risks" section at the end, keep everything else unchanged, and save it back to the same artifact.
```

The host calls `read_document`, makes the change, and passes the artifact ID and updated content to `update_artifact`. The update creates a new version at the same Library URL.

Preserve the current content

For documents and other text-based content, `update_artifact` replaces the full body. Ask the host to read the current version immediately before editing and preserve everything outside the requested change.

`update_artifact` rejects an update when someone saves another change after the tool reads the current version and before it saves yours. It doesn't compare against a version from an earlier `read_document` call, so it doesn't detect a change saved between those two calls.

## Share an artifact[​](#share-an-artifact "Direct link to Share an artifact")

When your organization enables Chat Sharing, ask the host to share an artifact you own. The host calls `share_artifact` to grant view access to the people you name by email.

```
Use Glean to share https://app.glean.com/library/{artifact-id} with taylor@example.com and jordan@example.com.
```

## Permissions and sharing[​](#permissions-and-sharing "Direct link to Permissions and sharing")

Your MCP connection uses your Glean identity and permissions:

-   `search` and `read_document` return only content you can view
-   `upload_artifact` saves new content to your **Library**, with you as the owner
-   `update_artifact` requires you to own the artifact
-   `share_artifact` requires you to own the artifact and grants view access by email when your organization enables sharing

An MCP host can't use these tools to bypass Glean permissions.

## Troubleshoot artifacts[​](#troubleshoot-artifacts "Direct link to Troubleshoot artifacts")

### The artifact tools are missing

Ask your admin to add the **Artifacts** toolset to the MCP server. Refresh the available tools or reconnect the server in your host after the configuration changes.

### Sharing isn't available

Confirm that your organization enables [Chat Sharing](/administration/assistant/features/chat-sharing). `share_artifact` is available only when sharing is on.

### An update is denied

Confirm that you're signed in to the expected Glean account and own the artifact. You can read content shared with you, but you can't change it through `update_artifact`.

## See also[​](#see-also "Direct link to See also")

-   [Use Canvas content with MCP](/user-guide/mcp/canvas) — read and edit Canvas content from a host
-   [Generate images with MCP](/user-guide/mcp/image-generation) — create and edit images from a host
-   [Library](/user-guide/assistant/assistant-library) — where your saved artifacts live
-   [Create MCP servers](/administration/platform/mcp/create-mcp-servers) — admin setup for the Artifacts toolset
