---
url: "https://docs.glean.com/release-notes/releases/2026-06-03-june-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-06-03-june-release"
title: "June 03, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.987Z"
---
On this page

## User features[​](#user-features "Direct link to User features")

#### Store memories in Glean from any MCP-connected tool[​](#store-memories-in-glean-from-any-mcp-connected-tool "Direct link to Store memories in Glean from any MCP-connected tool")

Connected MCP host applications such as ChatGPT, Claude, Cursor, VS Code, and Copilot can now write memories back to Glean in addition to reading them. You can add, update, and delete memories from any MCP-connected tool, and those memories are stored in Glean with full source provenance. This means the context you build while working in your IDE or AI assistant is available everywhere Glean memory is used. Admins can enable or disable memory write operations per deployment in **Admin console → Platform → Glean MCP server**.

**How to access:** Memory write operations are enabled by default on the Glean MCP server. No additional setup is required.

[Learn more](https://docs.glean.com/administration/platform/mcp/create-mcp-servers#built-in-tools)

Assistant *ROAD-1261*

* * *

#### New Google and Microsoft actions[​](#new-google-and-microsoft-actions "Direct link to New Google and Microsoft actions")

Glean Assistant can now help you complete more work across Google Workspace, Microsoft 365, Slack, and Microsoft Teams, so you can move from answers to action without switching tools. You can draft emails, create docs and spreadsheets, and send messages in the apps your team already uses, helping you finish common workflows like status updates, stakeholder communications, and tracker updates faster. Admins must first configure the relevant action packs for Google, Microsoft 365, and Slack before these options appear for users.

**How to access:** Administrators must enable for your organization. Admins must enable the relevant action packs in **Admin console → Platform → Actions** before users can access these capabilities. To support Google Docs, Google Sheets, and Gmail drafts, set up Google actions and connect the Google Drive data source. To support Outlook, Word, Excel, and Microsoft Teams actions, set up Microsoft 365 actions and link them to your Microsoft 365 data source; some Microsoft environments will require admin consent before users can connect successfully.

[Learn more](https://docs.glean.com/administration/actions/setup-actions/m365-actions-setup)

Actions *ROAD-1194*

* * *

#### Update Salesforce opportunities from Glean Assistant[​](#update-salesforce-opportunities-from-glean-assistant "Direct link to Update Salesforce opportunities from Glean Assistant")

Sales teams can now update Salesforce opportunities directly from Glean Assistant using natural language, without switching into the Salesforce app. When a user asks Assistant to change key opportunity fields—such as amount, stage, close date, or forecast category—Assistant identifies the correct record, collects any missing details in a structured way, and writes the updates back to Salesforce while honoring the user's permissions. Assistant then confirms the change and links to the updated opportunity so sellers can review and move on to their next task faster.

**How to access:** Administrators must enable for your organization. To use Salesforce opportunity write actions, your organization must have the Salesforce data source connected in Glean with API access to Opportunities and related objects, using the standard Salesforce connector. In the Glean Admin console, go to **Platform → Actions** and ensure the Salesforce action pack and the Update Opportunity write action are enabled for your deployment. End users will need to authenticate their own Salesforce account in Glean when prompted, so Assistant can respect per-user Salesforce permissions for viewing and updating opportunities. Once configured, users can simply ask Glean Assistant to update an opportunity in plain language and confirm the proposed changes in chat.

[Learn more](https://docs.glean.com/actions/datasource/salesforce/sf-index)

Actions *ROAD-1156*

* * *

#### Editing for slides and image collections[​](#editing-for-slides-and-image-collections "Direct link to Editing for slides and image collections")

You can now edit slides and image collections by annotating exactly what you want changed and asking Glean to regenerate the result with AI. Mark up a single image or a full set, describe the change in plain language, and get updated visuals without starting from scratch.

**How to access:** Administrators must enable for your organization.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/image-generation)

Assistant *ROAD-1402*

* * *

#### Manually refresh interactive artifacts[​](#manually-refresh-interactive-artifacts "Direct link to Manually refresh interactive artifacts")

You can now manually refresh interactive content in Glean to update the underlying data while keeping the existing layout and design intact. This is especially useful for dashboards and other data-driven pages that need fresh information without rebuilding the page from scratch. Each refresh creates a new version and shows when the content was last refreshed.

**How to access:** Administrators must enable for your organization.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/html-artifacts)

Assistant *ROAD-1343*

* * *

#### Glean Assistant Meeting Notes[​](#glean-assistant-meeting-notes "Direct link to Glean Assistant Meeting Notes")

Glean Assistant Meeting Notes captures and transcribes your meetings, then generates an AI summary with key decisions and action items after the meeting. Transcripts and summaries are indexed in Glean and surfaceable through search and chat. It's designed to reduce the manual work of note-taking, speed up follow-ups, and help teams get answers to difficult questions without losing momentum in the conversation.

This is a desktop Mac-only feature available for Glean Key customers. Admins can control the rollout of this feature to their end users from **Admin console → Assistant → Meeting Notes**. The default setting lets Glean manage the rollout: "Meeting Notes" is off by default and will be turned on for users no earlier than June 8, 2026. We recommend starting with "On only for admins"; if you like it, you can turn it on for everyone in your organization at any time, or select "Off" to opt out. Your choice can be changed at any time and will not be overwritten. This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Administrators must enable for your organization. We enabled admin configuration on May 7, 2026. Admins will be able to opt in.

We'll notify admins on May 20, 2026 about the feature and that they can opt in. GA and billing start for customers who opt in starting May 21, 2026.

We will default enable anyone who did not disable during the notice period on June 8, 2026.

This applies only to desktop users on Mac.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/meeting-notes/transcription-and-consent)

Assistant *ROAD-769*

* * *

#### Azure DevOps repository, pull requests, and code indexing[​](#azure-devops-repository-pull-requests-and-code-indexing "Direct link to Azure DevOps repository, pull requests, and code indexing")

Glean now indexes Azure DevOps repositories, code files, commits, and pull requests, so engineering teams can search code and use Assistant to find relevant files, recent changes, and PR context in one place. This also adds permission-aware crawling for Azure DevOps code content using native project and repository ACLs.

**How to access:** Administrators must enable for your organization. In the Glean Admin console, open your Azure DevOps data source and review any setup warnings or validation alerts to make sure the service principal has been granted access to repositories. If you use Microsoft 365 identity mapping for Azure DevOps permissions, make sure your O365 connector is configured and healthy so indexed content appears correctly in search.

[Learn more](https://docs.glean.com/connectors/native/azure-devops/)

Connectors *ROAD-1246*

* * *

#### Glean Assistant can now query Snowflake with natural language[​](#glean-assistant-can-now-query-snowflake-with-natural-language "Direct link to Glean Assistant can now query Snowflake with natural language")

Glean Assistant can now query Snowflake directly so users can ask questions in natural language or run SQL against approved projects and datasets, without leaving Assistant. This makes Glean a front door to your Snowflake data warehouse so business users get governed, self-serve access to live data while data teams stay in control of what is exposed and how it is queried.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/administration/assistant/warehouse-data/connect-snowflake-to-glean-assistant)

Connectors *ROAD-1166*

* * *

#### Claude Opus 4.8 in Assistant and Agents[​](#claude-opus-48-in-assistant-and-agents "Direct link to Claude Opus 4.8 in Assistant and Agents")

Claude Opus 4.8 is now available in Glean Assistant and Agents. Opus 4.8 is Anthropic's latest premium model for tasks involving code generation and agentic workflows.

**How to access:** Glean-hosted customers can select Claude Opus 4.8 directly in Assistant and Agents where model choice is enabled. If your organization manages model availability centrally, admins can make Claude Opus 4.8 available to end users and agent builders through model configuration in Glean.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *ROAD-1465*

* * *

#### Gemini 3.5 Flash in Assistant and Agents[​](#gemini-35-flash-in-assistant-and-agents "Direct link to Gemini 3.5 Flash in Assistant and Agents")

Gemini 3.5 Flash is now available in Glean Assistant model choice and in the Agents model hub. Gemini 3.5 Flash offers significantly better cost efficiency than larger frontier models while maintaining strong reasoning for well-scoped agent tasks.

**How to access:** Glean Universal Model Key: Gemini 3.5 Flash appears automatically in the Assistant model choice dropdown and Agents model hub. Admins can exclude it via **Admin console → Platform → Models**.

Customer Key: Gemini 3.5 Flash is available via **Admin console → Platform → Models**.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *ROAD-1445*

* * *

#### Persistent permissions for tool use[​](#persistent-permissions-for-tool-use "Direct link to Persistent permissions for tool use")

You can now control exactly how Glean uses your connected tools with persistent permissions. Set any action to "Always Allow," "Ask," or "Block" — and your preference sticks across every session, whether you are in Assistant, Agents, or MCP. A new Connectors pane in your settings gives you a single place to see which apps you have connected, manage authentication, and fine-tune permissions for each tool individually.

[Learn more](https://docs.glean.com/actions/actions-overview)

Agents *ROAD-1368*

* * *

#### Dictation in Assistant composer[​](#dictation-in-assistant-composer "Direct link to Dictation in Assistant composer")

You can now use your voice to compose messages in Glean Assistant. Dictation is back with a redesigned experience and a significantly upgraded transcription model supporting 98 languages — with high-accuracy results for dozens including English, Spanish, Chinese, and many more. Tap the microphone icon in the composer on web, desktop, or mobile, speak naturally, and your words appear as editable text. Perfect for capturing long thoughts, drafting on the go, or working in your preferred language.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant *ROAD-1456*

* * *

#### Greenlist application URLs for functional buttons in HTML artifacts[​](#greenlist-application-urls-for-functional-buttons-in-html-artifacts "Direct link to Greenlist application URLs for functional buttons in HTML artifacts")

Interactive artifacts can now include functional buttons that link directly to your work applications — like Google Docs, Salesforce, Jira, or any other approved application. When you generate an interactive page with action buttons, those buttons actually take you to the tool where you need to act. Non-approved applications will still be accessible after a user clicks through a confirmation modal.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/html-artifacts)

Assistant *ROAD-1437*

* * *

#### Save chats started from the Glean browser extension sidebar in chat history[​](#save-chats-started-from-the-glean-browser-extension-sidebar-in-chat-history "Direct link to Save chats started from the Glean browser extension sidebar in chat history")

Chats started from the Glean browser extension sidebar can now be saved in chat history, making it easier to revisit in-context conversations across sessions. This reduces repeated questions and gives users a more consistent experience between the extension and the main Glean chat experience. It is intended for end users of the browser extension.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar)

Assistant *ROAD-1317*

* * *

#### Build, edit, and share spreadsheets in Glean Assistant[​](#build-edit-and-share-spreadsheets-in-glean-assistant "Direct link to Build, edit, and share spreadsheets in Glean Assistant")

Create and work with spreadsheets directly in Glean canvas. Upload a spreadsheet or ask Glean to generate one from scratch, then sort, filter, edit cells, and refine it through follow-up prompts without leaving the conversation. You can also export your sheet to Excel or copy it into other tools.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/spreadsheet-generation)

Assistant *ROAD-1300*

* * *

#### Support zip file analysis in Glean Assistant[​](#support-zip-file-analysis-in-glean-assistant "Direct link to Support zip file analysis in Glean Assistant")

You can now upload and analyze .zip files directly in Glean Assistant in thinking mode. Whether you're working with bundled documents, code packages, or compressed datasets, just drag and drop your zip file into the composer and start asking questions about its contents.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/assistant/features/file-upload)

Assistant *ROAD-1268*

* * *

#### See MCP usage and adoption in Insights[​](#see-mcp-usage-and-adoption-in-insights "Direct link to See MCP usage and adoption in Insights")

Admins can now see MCP usage insights in Glean, making it easier to understand adoption and activity across MCP-connected experiences. This gives admins clearer visibility into how people are using MCP, including usage metrics that teams had previously been tracking outside the product.

[Learn more](https://docs.glean.com/administration/insights/mcp-insights)

Embedded Integrations *ROAD-1126*

## Admin features[​](#admin-features "Direct link to Admin features")

#### LLM admin refresh for Glean Key customers[​](#llm-admin-refresh-for-glean-key-customers "Direct link to LLM admin refresh for Glean Key customers")

Admins get a clearer, more precise way to manage model availability for Glean Key deployments, including per-model toggles and surface-specific restrictions for Assistant and Agents. This improves governance for model access and makes the admin experience easier to understand and operate.

[Learn more](https://docs.glean.com/administration/llms)

Admin Capabilities *ROAD-1404*

* * *

#### MCP insights[​](#mcp-insights "Direct link to MCP insights")

Admins can now see how their organization is using Glean MCP directly in Insights, with visibility into adoption and activity across connected MCP hosts and tools. This helps teams understand which apps are driving value, identify active users, and track MCP usage without relying on manual reporting or backend logs. This feature is for admins only.

**How to access:** Open the Insights page in the Glean Admin experience to view MCP usage and adoption data. No additional setup is required beyond having Glean MCP enabled for your deployment. If MCP has not been enabled yet, first turn on the Glean OAuth Authorization Server under **Users and permissions → Third-party access (OAuth)**, then enable Glean MCP server under **Platform → Glean MCP server**.

[Learn more](https://docs.glean.com/administration/insights/mcp-insights)

Admin Capabilities *ROAD-1329*

* * *

#### Turn slide generation default on for all users[​](#turn-slide-generation-default-on-for-all-users "Direct link to Turn slide generation default on for all users")

Slide generation in Assistant will be enabled by default for all customers no earlier than June 8, 2026. To keep it off or limit access, select "Off" or "On only for admins". Your choice will be respected, and you can change it anytime. If you have already enabled slide generation "On", no action is needed.

If your company has a slide template configured, Glean will use it automatically. If not, Glean will take styling inspiration from your company's existing visual assets so decks still feel on-brand.

**How to access:** Admins can access this toggle by navigating to **Admin console → Assistant → Settings → Slide deck generation**.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/assistant/features/slide-deck-generation)

Assistant *ROAD-1377*
