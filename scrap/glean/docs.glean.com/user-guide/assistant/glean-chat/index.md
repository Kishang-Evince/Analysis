---
url: "https://docs.glean.com/user-guide/assistant/glean-chat/"
canonical: "https://docs.glean.com/user-guide/assistant/glean-chat/"
title: "User guide overview"
description: "Ask questions, create content, analyze data, and get work done with Glean Assistant"
fetched_at: "2026-09-01T13:30:38.596Z"
---
On this page

Glean gives you a conversational interface to your company's knowledge. Ask questions, create documents and presentations, analyze data, and get work done, all grounded in what your organization knows. Every response is personalized to you based on your permissions, activity, and role.

![Glean user interface](/img/chat/glean-chat-ui.png)

For details on how Glean selects and combines knowledge sources, see [How Glean accesses information](/user-guide/assistant/how-glean-accesses-info).

## What you can do[​](#what-you-can-do "Direct link to What you can do")

You can use Glean to:

-   **Ask and find:** Get answers with [citations](/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) from your company's documents, messages, and data. When you type a keyword-style query, [search results appear inline](/user-guide/assistant/glean-chat/search-and-autocomplete#search-results-in-chat) so you can jump straight to the right document.
    
-   **Research:** Generate detailed, citation-rich reports that synthesize information from internal systems and the web. See [Deep Research](/user-guide/assistant/deep-research).
    
-   **Create content:** Draft, refine, and export documents using these tools:
    
    -   [Canvas](/user-guide/assistant/glean-chat/canvas) - draft and refine documents
    -   [Slide generation](/user-guide/assistant/slide-generation) - export documents as slides
    -   [Spreadsheet generation](/user-guide/assistant/spreadsheet-generation) - export documents as spreadsheets
    -   [HTML artifacts](/user-guide/assistant/html-artifacts) - export documents as interactive artifacts
    -   [Podcast artifacts](/user-guide/assistant/podcast-artifacts) - create podcasts
    -   [Image generation](/user-guide/assistant/image-generation) - generate images from natural-language prompts
-   **Work with code:** [Search across repositories](/user-guide/assistant/code-search) and [generate code](/user-guide/assistant/code-generation) with draft pull requests grounded in your organization's codebase.
    
-   **Query data:** Ask natural-language questions against [Databricks](/user-guide/assistant/query-databricks-data-in-glean-assistant) and [Snowflake](/user-guide/assistant/query-snowflake-data-in-glean-assistant) datasets without writing SQL.
    
-   **Capture meetings:** Record transcripts, summaries, decisions, and action items without adding a bot to the call. See [Meeting notes](/user-guide/assistant/meeting-notes/).
    
-   **Talk hands-free:** Have real-time [voice conversations](/user-guide/assistant/real-time-voice) on web, desktop, and mobile.
    
-   **Organize and share:** [Rename and queue chats](/user-guide/assistant/glean-chat/manage-chats), [search your chat history](/user-guide/assistant/glean-chat/search-past-chats), and [share conversations](/user-guide/assistant/chat-sharing) with teammates.
    

## Reasoning modes[​](#reasoning-modes "Direct link to Reasoning modes")

Glean is powered by an agentic engine that plans tasks step by step and adapts as it works. Choose a reasoning mode from the chat input to balance response speed, depth, and the type of work you want Glean to do:

-   **Adaptive:** Picks the right mode for you. It starts with a fast response and automatically switches to deeper reasoning when your question needs it or requires tools that Fast mode doesn't support. Adaptive is the default mode when it is available.
-   **Fast:** Provides quick answers for simple tasks. Tools from connected apps aren't available in this mode. Switch to **Thinking** if you need them.
-   **Thinking:** Uses more reasoning for complex tasks and searches more thoroughly across your company's knowledge. It works well for multi-step questions that benefit from citations and detailed responses and supports the full set of tools, including tools from connected apps.
-   **Deep research:** Generates in-depth, detailed reports for complex questions that require multi-source analysis. It searches your company's knowledge and the web, then synthesizes the results into a citation-rich report. Deep research is read-only and doesn't use tools that make changes in connected apps. See [deep research](/user-guide/assistant/deep-research) for details.

The modes available to you depend on your organization's configuration. Before you can use Deep research, an admin must turn it on. See [Enable or disable Deep Research](/administration/assistant/configuration/deep-research). You can switch modes at any time from the chat input, and your selection persists across queries.

If Assistant returns instructions instead of performing a connected-app action, and no **Connect** prompt appears, you're likely in Fast mode (or Adaptive on the fast path), where connected-app tools aren't loaded. This is not a permissions issue; switch to Thinking mode. See [Troubleshooting tools authentication](/troubleshooting/tools-authentication#assistant-returns-instructions-instead-of-running-an-action).

## Where to use Glean[​](#where-to-use-glean "Direct link to Where to use Glean")

You can access Glean from multiple surfaces:

-   **Web app:** Go to your organization's [Glean URL](https://app.glean.com/) or click **New chat** in the left navigation.
-   **Desktop app:** A dedicated app for macOS and Windows with quick-chat access from anywhere on your machine. See [Glean for Desktop](/user-guide/apps/glean-for-desktop).
-   **Mobile:** Use Glean on the go. See [Mobile](/user-guide/apps/chat-first-experience).
-   **Browser extension:** Access Glean from the sidebar on any webpage. See [Extension sidebar](/user-guide/apps/extension-sidebar).
-   **Glean companion:** A floating overlay that provides context-aware assistance as you browse. See [Glean companion](/user-guide/apps/glean-companion).
