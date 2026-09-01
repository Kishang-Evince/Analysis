---
url: "https://docs.glean.com/release-notes/releases/2025-11-19-november-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-11-19-november-release"
title: "November 19, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.841Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Draft and iterate written content with Glean Canvas[​](#draft-and-iterate-written-content-with-glean-canvas "Direct link to Draft and iterate written content with Glean Canvas")

Introducing Glean Canvas Announced at Glean:LIVE in September, Glean Canvas is a new co-authoring experience that makes it easy to create polished documents with AI. Canvas opens directly from chat when you ask to draft or edit content, giving you a dedicated side-by-side editor where you can work alongside AI. Canvas enables full-document drafting from natural language prompts and offers flexible editing through both direct manipulation in the editor and conversational requests. You can highlight any section and ask AI to refine just that part, with full version history and undo/redo to track all changes. All sources remain linked throughout your editing process, and AI matches your tone and writing style for personalized output. When you're finished, you can export documents directly to Google Docs or Gmail with one click. Canvas is designed for individual authoring and editing workflows. We're starting with these core capabilities to gather feedback and refine the experience before expanding to additional collaboration features.

[Learn more](/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-743-MR*

* * *

#### Allow pinning of Search and Chat at a user level[​](#allow-pinning-of-search-and-chat-at-a-user-level "Direct link to Allow pinning of Search and Chat at a user level")

You can now pin your preferred default between Search and Chat on the Glean Home Page. This lets you choose which experience—Search or Chat—appears first when you open Glean, making it easier to start your workflow the way you like. Pinning is available at the individual user level, so everyone can personalize their own experience for faster access to the tools they use most.

[Learn more](/user-guide/advanced/customizing-home-page)

Glean Home *ROAD-793-MR*

* * *

#### Support for GPT 5.1 in the model hub for customers on Azure OpenAI[​](#support-for-gpt-51-in-the-model-hub-for-customers-on-azure-openai "Direct link to Support for GPT 5.1 in the model hub for customers on Azure OpenAI")

GPT-5.1 support is available for customers using the Azure OpenAI customer key in the model hub for agents.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/llms)

Agents *ROAD-1022*

* * *

#### GPT 5.1 is available in the model hub for agents[​](#gpt-51-is-available-in-the-model-hub-for-agents "Direct link to GPT 5.1 is available in the model hub for agents")

GPT-5.1 is added to the model hub for agents and is supported for universal key customers and customer keys on OpenAI direct.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/llms)

Agents *ROAD-1005*

* * *

#### Switch from Thinking to Fast mode mid-query and retry queries with Fast/Thinking modes[​](#switch-from-thinking-to-fast-mode-mid-query-and-retry-queries-with-fastthinking-modes "Direct link to Switch from Thinking to Fast mode mid-query and retry queries with Fast/Thinking modes")

3rd Generation Glean Assistant now lets users seamlessly switch between Fast and Thinking modes during sessions. If a response in Thinking mode is taking too long, users can select "Skip to a faster answer" to get a quicker answer. After a response is complete, users can also retry their query in either Fast or Thinking mode, making it easier to compare results and choose the best approach for their needs. This update streamlines the chat experience, giving users more control and flexibility when troubleshooting or researching.

**How to access:** Administrators must enable for your organization.

[Learn more](/user-guide/assistant/glean-chat)

Assistant *ROAD-783*

* * *

#### Enhance button moves within the Instructions field[​](#enhance-button-moves-within-the-instructions-field "Direct link to Enhance button moves within the Instructions field")

Agent builders can now refine prompts for the Wait for User Input step using the Enhance button. As a part of this update, Enhance button has moved inside the Instructions field. Users can hover over an icon to see a tooltip, click the icon to improve the instructions, and an Undo appears right after if you want to revert. These updates make editing faster and cleaner while keeping familiar Enhance/Undo behavior consistent across steps.

[Learn more](/agents/)

Actions *ROAD-966*

* * *

#### Search across past chats in Glean Assistant[​](#search-across-past-chats-in-glean-assistant "Direct link to Search across past chats in Glean Assistant")

Glean Assistant now lets users search across their past chat conversations and agent runs, making it easier to find previous discussions and decisions without manual scrolling. This feature helps users quickly recover links, revisit important threads, and stay in flow by surfacing relevant chat history where they already work. Note: The current release supports searching by chat titles only; searching within chat message bodies is not yet available.

**How to access:** To use chat history search, open Glean Chat and look for the search bar in your chat history panel. Enter keywords to filter your past chat threads and agent runs by title.

[Learn more](/user-guide/assistant/glean-chat/search-past-chats)

Assistant *ROAD-800*

* * *

#### Improvements to Assistant follow-up questions[​](#improvements-to-assistant-follow-up-questions "Direct link to Improvements to Assistant follow-up questions")

Glean is improving the quality of follow-up questions to be more conversational. This release supports Direct OpenAI Glean Key customers on GPT only. Customer Key/other models will be supported in a future release (Ref: ROAD-1024).

[Learn more](/user-guide/assistant/glean-chat/)

Assistant *ROAD-786*

* * *

#### Assistant adapts to your unique, personalized writing style[​](#assistant-adapts-to-your-unique-personalized-writing-style "Direct link to Assistant adapts to your unique, personalized writing style")

Glean Assistant now automatically adapts to your unique writing style using your existing written content across your apps. Without any setup, Assistant learns your tone, structure, and expression patterns to generate content that sounds authentically like you. Whether drafting emails, documents, or other content, Assistant mirrors your individual writing characteristics while maintaining professional quality—transforming AI assistance into a personalized writing partner that preserves your authentic voice.

[Learn more](https://www.glean.com/product/personal-graph)

Assistant *ROAD-744*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Configure actions during data source setup[​](#configure-actions-during-data-source-setup "Direct link to Configure actions during data source setup")

Access and configure actions directly from the data source setup flow via clear “Go to setup” links. This new experience introduces an optional Actions step in the datasource setup UI, making it easier for admins to discover and enable relevant pre-built actions and (soon) MCP tools for select apps—all while configuring the datasource, without context switching. This streamlines the admin experience, providing a faster, single point of setup for both data connections and platform actions.

[Learn more](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector)

Admin Capabilities *ROAD-839*

* * *

#### Delegate agent management to a Departmental Agent Moderator role[​](#delegate-agent-management-to-a-departmental-agent-moderator-role "Direct link to Delegate agent management to a Departmental Agent Moderator role")

Glean now supports a Departmental Agent Moderator role, enabling organizations to delegate agent sharing and management responsibilities at the department level. Departmental Moderators have owner-level control over agents created by members of their assigned department(s), allowing them to view, edit, share, and delete these agents. They can share agents with individuals and departments, but cannot share agents to the entire company. This enhancement provides large organizations with more granular governance, reduces privacy risks, and helps prevent clutter in the agent library by limiting broad sharing to privileged roles.

[Learn more](/administration/managing-agents/agent-access)

Agents *ROAD-787*
