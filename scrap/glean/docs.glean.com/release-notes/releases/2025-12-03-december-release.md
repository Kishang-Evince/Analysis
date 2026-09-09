---
url: "https://docs.glean.com/release-notes/releases/2025-12-03-december-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-12-03-december-release"
title: "December 3, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.001Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Autocomplete document suggestions from within Chat[​](#autocomplete-document-suggestions-from-within-chat "Direct link to Autocomplete document suggestions from within Chat")

Assistant now features real-time document autocomplete suggestions as you type in Chat. As you begin entering keywords or phrases, Glean automatically surfaces a list of relevant documents-matched by title, content, and metadata-directly below the chat composer. You can click a suggestion to insert it into your message or open the document, making it faster and easier to reference or navigate to key information without leaving the chat. This enhancement streamlines document discovery and improves productivity for users who rely on chat for everyday work. This change was be enabled Nov 20 for customers with a Chat-first Assistant experience Dec 4 for all other customers and enabled for Managed Rollout beta customers

[Learn more](/user-guide/assistant/glean-chat/search-and-autocomplete)

Agents *ROAD-1006-MR*

* * *

#### Changes to Glean Assistant: Retiring datasource filtering and source removal[​](#changes-to-glean-assistant-retiring-datasource-filtering-and-source-removal "Direct link to Changes to Glean Assistant: Retiring datasource filtering and source removal")

Glean Assistant will retire two features: the ability to filter specific sources in chat and the option to remove sources from existing Assistant responses. These features are being removed to streamline the user experience and because the latest generation of Glean Assistant, powered by advanced LLMs like GPT-5 and Claude Sonnet 4.5, now provides more accurate, context-aware answers without requiring manual source selection. With improvements in Assistant, users can simply describe what they need in natural language-including whether it should focus on or exclude a specific data source-and Assistant will automatically execute. Users can continue to filter specific sources in search. Change date: December 4, 2025 Learn more @ /release-notes/sunset/assistant

[Learn more](/release-notes/sunset/assistant)

Assistant *ROAD-938-MR*

**How to access:** Customers in our Managed Feature Beta may have additional controls.

* * *

#### Suggest Deep Research via follow-up questions in Thinking Mode[​](#suggest-deep-research-via-follow-up-questions-in-thinking-mode "Direct link to Suggest Deep Research via follow-up questions in Thinking Mode")

Glean Assistant now proactively suggests using Deep Research when relevant through contextual follow-up questions in Thinking Mode chat sessions. When a user’s query would benefit from deeper, multi-source synthesis, Assistant will surface a prompt inviting them to use Deep Research. This makes it easier to discover and benefit from Deep Research, helping users access more comprehensive, citation-rich analysis directly when needed and improving satisfaction and outcomes for complex research tasks. To learn more about Deep Research pricing for flex credits, please visit our pricing documentation: /glean-enterprise-flex-pricing.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/assistant/deep-research)

Assistant *ROAD-796*

**How to access:** Administrators must enable for your organization. Administrators can enable via self-serve in the Admin Console (Assistant → Deep Research) for all users or specific users.

* * *

#### Support for Zoom meeting transcripts and a history view in the home page calendar widget[​](#support-for-zoom-meeting-transcripts-and-a-history-view-in-the-home-page-calendar-widget "Direct link to Support for Zoom meeting transcripts and a history view in the home page calendar widget")

Glean now supports the ability to search and analyze Zoom meeting transcripts, making it easier to find and revisit important meeting discussions. For past Zoom meetings, you can now generate summaries directly from the calendar widget on your Glean home page. This feature streamlines the process of reviewing and sharing key meeting takeaways.

[Learn more](/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts)

Search *ROAD-1001*

**How to access:** Administrators must enable for your organization.

* * *

#### More streamlined user experiences in Agents[​](#more-streamlined-user-experiences-in-agents "Direct link to More streamlined user experiences in Agents")

Users can enjoy more control, visibility and clarity when using Agents: Flexible scheduling: Run agents on your cadence-hourly or multiple times per week-just like recurring meetings. Note that scheduling is available for only the agents that the creators opted in to allow running on a schedule. Actionable alerts: Get email notifications when an agent run fails, including the reason and one-click actions to rerun or re-authenticate.

[Learn more](/agents/concepts/schedule-triggers)

Agents *ROAD-977*

* * *

#### Enterprise graph actions include search and chat history to gain insights[​](#enterprise-graph-actions-include-search-and-chat-history-to-gain-insights "Direct link to Enterprise graph actions include search and chat history to gain insights")

Glean Agents include actions to retrieve and analyze insights from users’ past search and chat queries. These actions provide agents with structured access to historical search and chat behavior, enabling a deeper understanding of recurring user interests over time. By surfacing these insights, agents can deliver more personalized, context-aware responses and help users identify patterns in their information-seeking activities.

[Learn more](/tools/glean/retrieve-chat-insights)

Agents *ROAD-939*

* * *

#### Deep Research improvements powered by GPT 5.1 and Agentic Engine[​](#deep-research-improvements-powered-by-gpt-51-and-agentic-engine "Direct link to Deep Research improvements powered by GPT 5.1 and Agentic Engine")

Deep Research is now more comprehensive, more actionable, and better at following instructions thanks to improvements from GPT 5.1 and Glean's Agentic Engine. The Agentic Engine breaks down tasks, executes these tasks in parallel, and adapts as it executes. This feature is available to customers on the Glean Universal Key and the Glean Key for Azure OpenAI. It's available in both GCP and AWS. As part of this launch, we've reduced the credit cost of Deep Research. Please visit our official pricing documentation for more information.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/assistant/deep-research)

Assistant *ROAD-919*

**How to access:** Turn on Deep Research for your users: Deep Research is turned off by default. Administrators can enable via self-serve in the Admin Console (Assistant → Deep Research) for all users or specific users. Once enabled, users can access Deep Research from the menu below Glean Chat.

* * *

#### Index and Search by custom attributes in the SharePoint connector[​](#index-and-search-by-custom-attributes-in-the-sharepoint-connector "Direct link to Index and Search by custom attributes in the SharePoint connector")

Glean now indexes and can search custom SharePoint attributes in Glean. This enhancement makes it easier to find documents and site pages based on metadata fields unique to your organization, helping you surface the most relevant information faster. With support for custom attributes, teams can tailor their search experience to match their business processes and data structures.

[Learn more](/tools/glean/company-search)

Connectors *ROAD-912*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Agent Management: Disable agents[​](#agent-management-disable-agents "Direct link to Agent Management: Disable agents")

Glean now equips admins with robust controls to proactively manage agent usage. Admins can review usage details in the billing console and, if needed, manually disable specific agents to avoid further credit usage.

[Learn more](/administration/managing-agents/agent-access)

Admin Capabilities *ROAD-789*

* * *

#### Admin quota management for Deep Research[​](#admin-quota-management-for-deep-research "Direct link to Admin quota management for Deep Research")

Admin quota management controls are now available for Deep Research, allowing admins to set per‑user monthly query limits directly in the Admin Console. By default, each user will have 10 Deep Research queries per month, and admins can raise or lower this at any time. This gives you tighter control of usage and FlexCredit spend with minimal impact on adoption. For details, see the Deep Research guide (/user-guide/assistant/deep-research) and your Flex pricing documentation.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/assistant/deep-research)

Assistant *ROAD-1007*

**How to access:** To access Deep Research, administrators must first enable the feature in the Admin Console. Once enabled, users can access Deep Research from the menu below Glean Chat.

* * *

#### Streamlining access to Admin Insights[​](#streamlining-access-to-admin-insights "Direct link to Streamlining access to Admin Insights")

We’re streamlining how you access Insights about your Glean instance. You can continue to access Insights from the left navigation; to keep things focused, we’re removing duplicate entry points on the Chat surface.

[Learn more](/administration/insights/overview#accessing-the-insights-page)

Assistant *ROAD-1000*

* * *

#### Glean data analysis performance improvements for Azure OpenAI, AWS Bedrock, and GCP Vertex customer keys[​](#glean-data-analysis-performance-improvements-for-azure-openai-aws-bedrock-and-gcp-vertex-customer-keys "Direct link to Glean data analysis performance improvements for Azure OpenAI, AWS Bedrock, and GCP Vertex customer keys")

Glean data analysis tool sees improved performance running on the latest version of the Agentic Engine. The data analysis tool is invoked when uploading or tagging structured data files. This is available for all customers on your own Azure OpenAI, Bedrock, or Vertex AI keys. Please see the documentation for more details.

[Learn more](/administration/assistant/data-analysis/about-data-analysis)

Assistant *ROAD-775*

**How to access:** You can turn the feature on or off via the admin console by going to Settings -> Assistant -> Data Analysis.

* * *

#### Sensitive Content Policies: User Customizable IDs for Regexes[​](#sensitive-content-policies-user-customizable-ids-for-regexes "Direct link to Sensitive Content Policies: User Customizable IDs for Regexes")

Admins can now assign user-defined, stable IDs to each regex in Glean Protect+ sensitive content policies. These customizable IDs make it easier to trace and manage which regex triggered a finding, even as policy configurations change. This enhancement improves auditing and streamlines compliance workflows for organizations with complex data loss prevention (DLP) requirements.

[Learn more](/administration/protect/sensitive-findings/manage-reports)

Protect *ROAD-791*

* * *

#### Refine sensitive findings policies with related terms and Boolean logic (AND/OR)[​](#refine-sensitive-findings-policies-with-related-terms-and-boolean-logic-andor "Direct link to Refine sensitive findings policies with related terms and Boolean logic (AND/OR)")

Admins can now further refine sensitive findings policies and reports by combining primary matches (regex or terms) with related terms using AND/OR logic. A primary match is flagged as sensitive only when the specified related terms are present. This allows for more precise rules to align with your organization's definitions of sensitive data, improving detection accuracy and reducing false positives.

[Learn more](/administration/protect/sensitive-findings/manage-policies)

Protect *ROAD-778*

* * *

#### Sensitive findings dashboards aggregate results at a per-document level[​](#sensitive-findings-dashboards-aggregate-results-at-a-per-document-level "Direct link to Sensitive findings dashboards aggregate results at a per-document level")

Glean’s sensitive findings dashboard now aggregates at the document level rather than by individual policy violation, letting administrators review all findings and actions-hide, unhide, and severity analysis-for each document in one place. Support for AWS will follow shortly Glean ID: ROAD-1021

[Learn more](/administration/protect/sensitive-findings/view-policy-findings)

Protect *ROAD-754*
