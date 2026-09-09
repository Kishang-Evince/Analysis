---
url: "https://docs.glean.com/release-notes/releases/2025-07-16-july-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-07-16-july-release"
title: "July 16, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.030Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Create conversational agents with natural language[​](#create-conversational-agents-with-natural-language "Direct link to Create conversational agents with natural language")

Agent creators can now use the Use AI to generate a draft option to generate conversational agents from natural language instructions.

[Learn more](/agents/create-agent-natural-language)

Agents *FR-3542*

* * *

#### Reorder steps in the agent builder using drag & drop[​](#reorder-steps-in-the-agent-builder-using-drag--drop "Direct link to Reorder steps in the agent builder using drag & drop")

Agent creators can reorder steps in the agent builder by dragging and dropping them. Steps can also be moved between branches in the same manner.

[Learn more](/agents/concepts/agent-builder)

Agents *FR-3548*

* * *

#### Migration of apps and advanced prompts to Agents for remaining customers[​](#migration-of-apps-and-advanced-prompts-to-agents-for-remaining-customers "Direct link to Migration of apps and advanced prompts to Agents for remaining customers")

Since we made Glean Agents generally available on May 20, we have provided a transition period for admins to preview and decide when to launch Glean Agents for their deployment. The transition period will end on July 15, and we will automatically launch Glean Agents in all remaining deployments.

When Glean Agents are launched, all existing advanced prompts and apps will be automatically migrated to become Agents. The Prompt Library will then only contain simple prompts and we will offer users the ability to convert their simple prompt into an agent. We will begin showing a warning banner that the Prompt Library will be deprecated by Aug 5.

[Learn more](/release-notes/sunset/migrating-prompts-apps)

Agents *FR-3610*

* * *

#### Agents with chat triggers that use conversation starters containing placeholders will now display an input form[​](#agents-with-chat-triggers-that-use-conversation-starters-containing-placeholders-will-now-display-an-input-form "Direct link to Agents with chat triggers that use conversation starters containing placeholders will now display an input form")

Agents with chat triggers that use conversation starters containing placeholders (e.g., I would like to file PTO for \[\[start date\]\] to \[\[end date\]\]) now prompt users to fill in the required placeholders. This update restores the previous experience for conversation starters in apps.

[Learn more](/agents/concepts/triggers)

Agents *FR-3650*

* * *

#### Improvements to the quality of OpenAI web search[​](#improvements-to-the-quality-of-openai-web-search "Direct link to Improvements to the quality of OpenAI web search")

Glean has improved OpenAI web search performance by upgrading the action pack to use the OpenAI Responses API. This change will only impact -Glean Key customers- customers on their own key.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup)

Assistant *FR-3619*

* * *

#### Formatting improvements for Glean Assistant responses[​](#formatting-improvements-for-glean-assistant-responses "Direct link to Formatting improvements for Glean Assistant responses")

Glean Assistant responses use a more structured format, with dividers, headers, and tables to organize the information.

Assistant *FR-3648*

* * *

#### Keep track of what you’ve accomplished and prepare performance self-evaluations in Glean Assistant[​](#keep-track-of-what-youve-accomplished-and-prepare-performance-self-evaluations-in-glean-assistant "Direct link to Keep track of what you’ve accomplished and prepare performance self-evaluations in Glean Assistant")

Ask Glean Assistant questions like “What did I work on last week?” or “Help me prepare for my upcoming performance review,” and you’ll get an AI-generated summary of your key accomplishments-drawing from the Glean Personal Knowledge Graph, which connects your daily activities to higher-level tasks and initiatives.

[Learn more](/security/knowledge-graph)

Assistant *FR-3672*

* * *

#### Allow users to select toggle preference between Search & Chat[​](#allow-users-to-select-toggle-preference-between-search--chat "Direct link to Allow users to select toggle preference between Search & Chat")

Users can now set their default experience on the homepage to *Chat* or *Search* or *Sticky* (last used mode) based on how they use Glean. This new setting provides flexibility and lets them choose their preferred starting mode.

**How to access:** Select the user preference selector located in the user menu on the right-hand settings panel on the home page, and choose the default landing experience to *Chat* or *Search* or *Sticky* (last used mode).

[Learn more](/user-guide/advanced/customizing-home-page)

Workspace Settings *FR-3567*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Non-critical logs for AWS deployments[​](#non-critical-logs-for-aws-deployments "Direct link to Non-critical logs for AWS deployments")

We are relaunching non-critical AWS logging infrastructure to enable improved support and debugging for customers on AWS. Note that change may result in up to 2% increase in AWS infrastructure costs.

[Learn more](/administration/management/audit-logs/admin-audit-logs#accessing-audit-logs)

AWS *FR-3641*

* * *

#### Block invalid headers on AWS ALBs[​](#block-invalid-headers-on-aws-albs "Direct link to Block invalid headers on AWS ALBs")

For AWS customers, we have enabled a feature on the primary AWS ALB to block invalid headers. This is a security feature that should not have any noticeable impacts to Glean.

AWS *FR-3724*

* * *

#### Admins and agent moderators can filter the agent library to see agents shared with departments and everyone in their organization[​](#admins-and-agent-moderators-can-filter-the-agent-library-to-see-agents-shared-with-departments-and-everyone-in-their-organization "Direct link to Admins and agent moderators can filter the agent library to see agents shared with departments and everyone in their organization")

Admins and agent moderators will now see a “Shared with” filter in the Agent library. This allows them to filter the library to only see agents that are shared with the entire company or shared with a specific department. Users will not see the “Shared with” filter.

[Learn more](/administration/managing-agents/managing-agent-library)

Agents *FR-3639*

* * *

#### Allow admins to customize the embedded integrations (formerly Glean Assist) features in the admin console[​](#allow-admins-to-customize-the-embedded-integrations-formerly-glean-assist-features-in-the-admin-console "Direct link to Allow admins to customize the embedded integrations (formerly Glean Assist) features in the admin console")

Adds a new tab called Embedded Integrations (formerly Glean Assist) in the admin console for admins to customize Glean in Zendesk, Salesforce, and ServiceNow.

[Learn more](/administration/platform/embedded-integrations/)

Assistant *FR-2811*

* * *

#### Design updates to improve Glean Assistant experience (admin preview)[​](#design-updates-to-improve-glean-assistant-experience-admin-preview "Direct link to Design updates to improve Glean Assistant experience (admin preview)")

Glean Assistant is getting a design refresh, including Chat, intermediate steps, and citations.

Chat interface improvements include a light weight chat-bubble to make the experience more conversational.

Intermediate steps will now appear in a collapsed UI, without the previously prominent steps with borders. This allows users to see more of the actual chat response and remove unnecessary visual clutter.

Citations user experience has been improved to focus on clarity including:Clustering citations when there are more than three cited sources.Scrollable citation previews for easier navigation.“View sources” option is hidden when no sources are explicitly cited.Removed unused sources from citation drawerAdditional polish and refinements to improve overall citation presentation.

**How to access:** This is an admin preview.

Assistant *FR-3640*

* * *

#### Enhancements to agentic reasoning engine planning drive Assistant performance gains (Glean Key)[​](#enhancements-to-agentic-reasoning-engine-planning-drive-assistant-performance-gains-glean-key "Direct link to Enhancements to agentic reasoning engine planning drive Assistant performance gains (Glean Key)")

Advancements in the planning aspect of our agentic reasoning engine architecture have improved the quality of complex queries in Assistant. Overall, queries have seen a 1.1% improvement in completeness and approximately 3% improvement in correctness. These performance enhancements come with a 30% increase in latency at p25 and a 13% increase at p50.

Assistant *FR-3718*

* * *

#### Glean Assist is now called Embedded Integrations in the Glean admin console[​](#glean-assist-is-now-called-embedded-integrations-in-the-glean-admin-console "Direct link to Glean Assist is now called Embedded Integrations in the Glean admin console")

The Glean Assist tab is now called Embedded Integrations within the admin console. Admins can configure Glean in Zendesk, ServiceNow, and Service Cloud within this tab.

[Learn more](/administration/platform/embedded-integrations/)

Glean Everywhere *FR-3620*

* * *

#### Glean leverages the larger context window of GPT 4.1 to improve performance[​](#glean-leverages-the-larger-context-window-of-gpt-41-to-improve-performance "Direct link to Glean leverages the larger context window of GPT 4.1 to improve performance")

When necessary for improved quality, Glean fully leverages the larger 1 million token context window of GPT 4.1 model as opposed to being restricted to 128K tokens for improved quality. This impacts customers using the Glean key for Assistant.

Platform *FR-3546*

* * *

#### AWS WAF default blocking for the core rule set[​](#aws-waf-default-blocking-for-the-core-rule-set "Direct link to AWS WAF default blocking for the core rule set")

Glean has been working on improving the security of our AWS deployments. We are rolling out AWS WAF controls for all our AWS customers that have been tested and will harden the security of the Glean deployment. In this release, we are enabling by default the AWS Managed Rule Groups for Known Bad Inputs

**How to access:** Customers are opted in by default. Please reach out to your account team if you wish to be opted out.

[Learn more](/security/cloud-prem/aws/aws-waf)

WAF *FR-3575*

* * *

#### Estimate time needed to complete the initial data source crawl[​](#estimate-time-needed-to-complete-the-initial-data-source-crawl "Direct link to Estimate time needed to complete the initial data source crawl")

An estimate of the initial crawl time is added to the data source setup page in the admin console.

[Learn more](/connectors/crawling-faq#common-questions-about-crawling)

Workspace Settings *FR-3539*
