---
url: "https://docs.glean.com/release-notes/sunset/"
canonical: "https://docs.glean.com/release-notes/sunset/"
title: "Product and feature retirements"
description: "Information about deprecated and sunset features in Glean"
fetched_at: "2026-09-01T13:29:54.877Z"
---
On this page

To keep improving Glean and deliver the best experience, we occasionally retire features. When that happens, we'll provide advance notice, share timelines, and recommend alternatives to ensure a smooth transition for admins and affected customers. Glean will use commercially reasonable efforts to notify customers at least 60 days in advance of feature retirements. Notifications may be made through the Glean application or to the customer emails on file.

For Supported LLMs, please see [LLM Administration](/administration/llms).

## Billing dashboard for customers on Glean Enterprise[​](#billing-dashboard-for-customers-on-glean-enterprise "Direct link to Billing dashboard for customers on Glean Enterprise")

**Announcement Date:** July 31, 2026

**Retirement Date:** September 1, 2026

For legacy Glean Enterprise customers, the billing dashboard in Admin Console → Usage has been disabled because it previously displayed usage metrics that don’t apply to the Enterprise plan and could be misinterpreted as billable overage. This change rolls out automatically; there is no impact to your existing contract, pricing, or feature access. For the next four weeks, admins who previously accessed the billing dashboard will see an in-product banner explaining why the dashboard has been removed.

## Embedded support integrations (formerly Glean Assist)[​](#embedded-support-integrations-formerly-glean-assist "Direct link to Embedded support integrations (formerly Glean Assist)")

**Announcement Date:** June 2026

**Retirement Date:** October 23, 2026

Glean is retiring the embedded support integrations previously known as Glean Assist. This retirement affects Glean in Zendesk and Glean in ServiceNow.

These embedded integrations provided AI-powered support workflows—including ticket summaries, resolution steps, and response drafting—directly inside third-party support tools.

Use agents in the Glean browser extension as the replacement for these workflows. The browser extension sidebar includes an Agents tab that supports Zendesk tickets and ServiceNow incidents and cases.

Existing embedded integration configurations remain available during the transition period. See the individual product pages for setup and configuration details:

-   [Glean in Zendesk](/administration/platform/embedded-integrations/glean-in-zendesk)
-   [Glean in ServiceNow](/administration/platform/embedded-integrations/glean-in-service-now)

[Learn more about agents in the browser extension](/user-guide/apps/extension-sidebar#agents)

## Slack Discovery API[​](#slack-discovery-api "Direct link to Slack Discovery API")

**Announcement Date:** March 9, 2026

**Retirement Date:** March 3, 2026

Glean discontinued use of the Slack Discovery APIs on March 3, 2026 and now supports Slack through a Real-Time Search–based integration. Customers using Slack connectors powered by the Discovery API must upgrade to the Slack RTS (Real-Time Search) connector to maintain Slack indexing and search functionality. Failure to upgrade may result in degraded or lost Slack search capabilities in Glean. Note that the Gleanbot Daily Digest in Slack is not supported with Slack RTS.

For details on what is currently supported and how to upgrade your Slack connector, see the [Slack Connector](/connectors/native/slack/) page.

[Learn more](/connectors/native/slack/)

## Agentic Engine V1 (Customer Key: Gemini)[​](#agentic-engine-v1-customer-key-gemini "Direct link to Agentic Engine V1 (Customer Key: Gemini)")

**Announcement Date:** December 22, 2025

**Retirement Date:** February 15, 2026

**Applicable to Customer Key Gemini Customers.**

Glean has upgraded to a more powerful agentic engine that can plan, iterate, and adapt on the fly, so it can take on more complex, end-to-end work. The Agentic engine powers the Glean platform, including but not limited to the Assistant and Agents.

Customers using Gemini via customer key must enable the new Agentic Engine V2 before the retirement date to avoid service disruptions. Going forward, new Assistant and Agent capabilities will be built exclusively on Agentic Engine 2, and no support or fixes will be provided for issues found in customers' Agentic Engine v1 environments.

No Action is required for Glean universal model key customers who were automatically migrated in October 2025. Please see the note below for customers using OpenAI and Claude models (ROAD-1070).

[Learn more](/user-guide/assistant/glean-chat/)

## Glean Assistant: Connector filtering and source removal[​](#glean-assistant-connector-filtering-and-source-removal "Direct link to Glean Assistant: Connector filtering and source removal")

**Announcement Date:** November 5, 2025

**Retirement Date:** December 4, 2025

The ability to filter specific sources in chat and the option to remove sources from existing Assistant responses are being removed to streamline the user experience and because the latest generation of Glean Assistant, powered by advanced LLMs like GPT-5 and Claude Sonnet 4.5, now provides more accurate, context-aware answers without requiring manual source selection. Users can continue to filter specific sources in search (ROAD-938).

[Learn more](/release-notes/sunset/assistant)

## Agentic Engine V1 (Customer Key: OpenAI & Claude)[​](#agentic-engine-v1-customer-key-openai--claude "Direct link to Agentic Engine V1 (Customer Key: OpenAI & Claude)")

**Announcement Date:** September 9, 2025

**Retirement Date:** January 31, 2026

**Applicable to Customer Key OpenAI and Claude Customers.**

Glean has upgraded to a more powerful agentic engine that can plan, iterate, and adapt on the fly, so it can take on more complex, end-to-end work. The Agentic engine powers the Glean platform, including but not limited to the Assistant and Agents.

Customers must enable the new Agentic Engine V2 before the retirement date to avoid service disruptions. Going forward, new Assistant and Agent capabilities will be built exclusively on Agentic Engine 2, and no support or fixes will be provided for issues found in customers' Agentic Engine v1 environments.

Customer Key Gemini Customers will be given at least 60 days' notice of the retirement of Agentic Engine V1 on Gemini, once Gemini is available on Agentic Engine V2.

No Action is required for Glean universal model key customers who were automatically migrated in October 2025.

[Learn more](/user-guide/assistant/glean-chat/)

## Simple Prompts, Advanced Prompts and Apps[​](#simple-prompts-advanced-prompts-and-apps "Direct link to Simple Prompts, Advanced Prompts and Apps")

**Announcement Date:** May 7, 2025

**Retirement Date:** Aug 5, 2025

As part of the rollout of Glean Agents, Glean has sunset the Prompt Library, which previously allowed users to create and run simple AI prompts in Assistant. All existing advanced prompts and apps will be automatically migrated to Agents, and admins have a transition window to manually convert simple prompts into Agents before the retirement date. After this date, the Prompt Library and remaining simple prompts will no longer be available. Customers should use Glean Agents for reusable AI workflows and templates going forward.

[Learn more](/release-notes/sunset/migrating-prompts-apps)
