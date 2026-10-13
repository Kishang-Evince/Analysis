---
url: "https://docs.glean.com/administration/platform/mcp/built-in-glean-tools"
canonical: "https://docs.glean.com/administration/platform/mcp/built-in-glean-tools"
title: "Built-in Glean tools"
description: "Reference for the built-in Glean tools and managed toolsets you can add to an MCP server."
fetched_at: "2026-10-13T08:49:25.521Z"
---
On this page

Glean provides the following built-in tools that you can add to any MCP server. You can mix and match any combination of these tools based on your server's purpose.

Glean groups some built-in tools into **managed toolsets**, which you add as a single unit. Glean owns each managed toolset and updates the built-in tools it contains. You add the remaining built-in tools one at a time. See [More tools](#more-tools).

To add these tools to a server, see [Create and manage MCP servers](/administration/platform/mcp/create-mcp-servers). The tool picker shows only the tools your deployment supports.

## Artifacts[​](#artifacts "Direct link to Artifacts")

Add the **Artifacts** managed toolset to let users save locally produced content to their Glean Library and manage it from their MCP hosts. A host can land HTML, documents, and other output in the Library as an artifact with a stable link, instead of leaving it stranded in the host. The toolset includes:

-   `upload_artifact` — save locally produced content as a new artifact in the user's Library and return a shareable link
-   `update_artifact` — save a new version of an existing artifact
-   `share_artifact` — grant people view access by email to an artifact the user owns

Keep `search` and `read_document` enabled so users can find and retrieve existing content before they update it. Artifact tools run with each connected user's Glean permissions. The `share_artifact` tool is available only when [Chat Sharing](/administration/assistant/features/chat-sharing) is enabled.

## Memory[​](#memory "Direct link to Memory")

Add the **Memory** managed toolset to give hosts the user's long-term memories and personalization data from Glean Memory. It includes:

-   `memory` — read, add, update, and delete the user's memories
-   `memory_schema` — discover memory categories, payload schemas, storage limits, and filterable fields

Keep both tools together. A host that can write memories but can't read the schema doesn't know which categories and fields are valid.

## Image generation[​](#image-generation "Direct link to Image generation")

Add the **Image generation** managed toolset to let users generate and edit images from their MCP hosts and save them to their Glean Library. It includes:

-   `create_image` — generate a new image from a prompt, with an optional title and aspect ratio, and save it as an image artifact in the Library
-   `edit_image` — modify an existing image artifact from a natural-language instruction

Image tools run with each connected user's Glean permissions and image generation eligibility. A user who can't generate images in Glean doesn't get these tools, even when the toolset is enabled on the server. Image discovery uses `search` and `read_document`, so keep them enabled. For who can use image generation and how to turn it on, see [Image Generation in Glean](/user-guide/assistant/image-generation) and [Contextual images setup](/administration/assistant/features/contextual-images).

## Dynamic skills and tools[​](#dynamic-skills-and-tools "Direct link to Dynamic skills and tools")

The **Dynamic skills and tools** managed toolset lets a connected MCP host discover Glean Skills and call connected tools when it needs them. It keeps the host from loading every connected tool at the start of a session. The toolset includes:

-   `find_skills` finds Glean Skills that match the host's request.
-   `read_skill_files` reads the files for a Skill after the host finds it.
-   `run_tool` runs a connected tool selected by the Skill.

Select this toolset when users of the server need access to Glean Skills through MCP. Glean does not add it to every server automatically. Add it to each server that needs it.

## More tools[​](#more-tools "Direct link to More tools")

Add any of these built-in tools to a server on their own. You can also add `memory` and `memory_schema` individually, or together as the [Memory](#memory) managed toolset.

| Tool | Description |
| --- | --- |
| `search` | Search across your entire knowledge base with permission-aware results. |
| `chat` | Interactive conversations with Glean's AI assistant. |
| `read_document` | Retrieve specific documents by ID or URL. |
| `code_search` | Search your codebase and repositories. |
| `employee_search` | Find people and expertise in your organization. |
| `user_activity` | Retrieve the user's recent Glean activity to help summarize work, prepare status updates, or recover recently used documents. |
| `memory` | Read, add, update, and delete user memories and personalization. |
| `memory_schema` | Discover available memory categories, payload schemas, storage limits, and filterable fields. |
| `gmail_search` | Search Gmail messages and threads. |
| `meeting_lookup` | Find meeting recordings and notes. |
| `outlook_search` | Search Outlook emails and calendar. |
| `web_search` | Search the public web for information that isn't in your connected sources. |
| `gemini_web_search` | Search the web with Google Gemini. |
| `data_analysis` | Route analytical questions to the right BI tool or data warehouse. |
| `knowledge_graph_query` | Query the Knowledge Graph for entities and their relationships. |
| `knowledge_graph_schema` | Retrieve the Knowledge Graph schema, including entity types and predicates. |

## Deprecated tools[​](#deprecated-tools "Direct link to Deprecated tools")

Glean flags tools whose backing capability has been deprecated so you can move to a supported replacement. A deprecated tool stays visible in the server configuration and remains available to connected host applications, so it keeps working until you replace it. The deprecation flag and replacement guidance appear in the **Admin console**.

When a server includes a deprecated tool, the configuration shows a warning banner: "This MCP server includes deprecated tools. Use replacement tools when possible." Each deprecated tool is listed with its replacement, or with "No replacement tool listed" when none is available.

In the tool list, a deprecated tool shows a **Deprecated** badge. Hover over the badge to see the suggested replacement.

When you add external tools, Glean hides deprecated tools from the picker by default. To review them, turn on **Show deprecated tools**. Glean turns this on for you when the server you're editing already includes a deprecated tool, so you can find it and swap in the replacement.

## See also[​](#see-also "Direct link to See also")

-   [Create and manage MCP servers](/administration/platform/mcp/create-mcp-servers) to add these tools to a server
-   [Add agents as tools](/administration/platform/mcp/agents-as-tools) to expose Glean agents through MCP
-   [MCP server best practices](/administration/platform/mcp/best-practices) for choosing which tools to include
