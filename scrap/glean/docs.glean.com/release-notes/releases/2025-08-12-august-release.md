---
url: "https://docs.glean.com/release-notes/releases/2025-08-12-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-08-12-august-release"
title: "August 12, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.188Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Sunsetting of the prompt library[​](#sunsetting-of-the-prompt-library "Direct link to Sunsetting of the prompt library")

As part of the rollout of Glean Agents, we have sunset the Prompt Library. Users will no longer be able to access or create simple prompts. Admins will be able to download a backup of all simple prompts from the Admin Console.

[Learn more](/release-notes/sunset/migrating-prompts-apps)

Assistant *FR-3225*

* * *

#### Assistant supports Jira Search with JQL action[​](#assistant-supports-jira-search-with-jql-action "Direct link to Assistant supports Jira Search with JQL action")

Glean Assistant now lets users ask deeper questions about Jira data using natural language, including sorting and filtering records. Assistant interprets the user's natural language query into Jira JQL to answer the user’s question, using the Search Jira Action in the Jira Action Pack. You can ask Glean a question that includes hints that the answer lives in Jira, e.g. “From Jira, what are the open issues assigned to me?” Please note that first time users of the action will have to OAuth to allow Glean to connect to Jira.

Glean will automatically enable the Search Jira Action for customers as it will improve Assistant response quality. We recommend that admins leave this action on for better Jira querying in Assistant, and encourage them to reach out to their account team if they have questions or concerns.

**How to access:** Administrators must enable for your organization. Admin > Actions > Jira Actions

[Learn more](/administration/tools/setup-tools/jira-tools-setup)

Assistant *FR-3565*

* * *

#### Web search enabled by default for all Glean customers[​](#web-search-enabled-by-default-for-all-glean-customers "Direct link to Web search enabled by default for all Glean customers")

Web search is enabled for all Glean customers unless explicit instructions provided to not enable it. For customers who have not yet set up web search, Brave and OpenAI will be provided as default search providers, both of which offer zero data retention. For customers who have enabled OpenAI or Gemini, Brave will additionally be enabled.

[Learn more](/tools/glean/web-search#configuration)

Assistant *FR-3738*

* * *

#### Glean is deprecating the Discover tab in the extension sidebar[​](#glean-is-deprecating-the-discover-tab-in-the-extension-sidebar "Direct link to Glean is deprecating the Discover tab in the extension sidebar")

Due to limited usage of the discover tab in the browser extension sidebar and our intentions to simplify the product, we are deprecating this tab's availability. Users will only see the Chat and Search tabs in the sidebar once deprecated.

[Learn more](/user-guide/apps/extension-sidebar)

Glean Extension *FR-3763*

* * *

#### Improve Agent discovery on Glean Homepage[​](#improve-agent-discovery-on-glean-homepage "Direct link to Improve Agent discovery on Glean Homepage")

We’ve added a “Discover Agents” section to the Glean homepage for all users to help them locate and use agents more effectively.

[Learn more](/administration/management/appearance/home-page#cards)

Glean Home *FR-3733*

* * *

#### Agents in Search results page[​](#agents-in-search-results-page "Direct link to Agents in Search results page")

Agents are now returned in Glean Search results for queries that correspond to relevant agents. Additionally, users can filter Agent results by using the operator app:agents in Search.

**How to access:** This feature is released to all customers who have Agents deployed.

[Learn more](/user-guide/search/how-to-search-in-glean)

Search *FR-3568*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Check the last crawl time of a document based on its URL[​](#check-the-last-crawl-time-of-a-document-based-on-its-url "Direct link to Check the last crawl time of a document based on its URL")

Admins can now use the access verification tab in Protect to enter a document URL or ID and view its last crawled time, last indexed time, visibility, and check user-specific access permissions.

[Learn more](/get-started/review/crawling-and-learning#check-the-crawling-and-indexing-status)

Admin Capabilities *FR-3576*

* * *

#### Support for custom date ranges in Glean insights[​](#support-for-custom-date-ranges-in-glean-insights "Direct link to Support for custom date ranges in Glean insights")

Glean Insights now offers the ability to download data based on a custom date range, giving admins and Insights moderators more flexibility in how they analyze adoption data.

[Learn more](/administration/insights/overview#flexible-time-periods)

Admin Capabilities *FR-3608*

* * *

#### Sunsetting of Bing for web search and automated migration of customers to Brave and OpenAI providers[​](#sunsetting-of-bing-for-web-search-and-automated-migration-of-customers-to-brave-and-openai-providers "Direct link to Sunsetting of Bing for web search and automated migration of customers to Brave and OpenAI providers")

Bing will retire its Search APIs from the Azure Marketplace on August 11, 2025. To ensure continued service, we will automatically migrate all customers currently using Bing to the Brave and OpenAI action packs—both of which feature zero data retention. This migration will start on July 16, 2025, and is expected to be completed by August 8, 2025.

[Learn more](/tools/glean/web-search#configuration)

Assistant *FR-3613*

* * *

#### Enhancements to agentic reasoning engine planning drive Assistant performance gains (Customer Key)[​](#enhancements-to-agentic-reasoning-engine-planning-drive-assistant-performance-gains-customer-key "Direct link to Enhancements to agentic reasoning engine planning drive Assistant performance gains (Customer Key)")

For customers using their own LLM Key: Advancements in the planning aspect of our agentic reasoning engine architecture have improved the quality of complex queries in Assistant. Overall, queries have seen a 1.1% improvement in completeness and approximately 3% improvement in correctness. These performance enhancements come with a 30% increase in latency at p25 and a 13% increase at p50. ~30% token usage increase for the large model and ~70% token usage decrease for the small model.

Note: This was released previously for customers using Glean Key in FR-3718

Assistant *FR-3737*
