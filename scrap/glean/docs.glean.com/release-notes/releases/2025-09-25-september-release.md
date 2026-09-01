---
url: "https://docs.glean.com/release-notes/releases/2025-09-25-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-09-25-september-release"
title: "September 25, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.324Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Gemini BigQuery Analytics with Context action supports Looker and Looker Studio[​](#gemini-bigquery-analytics-with-context-action-supports-looker-and-looker-studio "Direct link to Gemini BigQuery Analytics with Context action supports Looker and Looker Studio")

In Agents, users will be able to query BigQuery data using natural language via Looker and Looker Studio. These queries will be powered by the [Gemini for Google Cloud Conversational Analytics API](https://cloud.google.com/gemini/docs/conversational-analytics-api/overview).

**How to access:** Administrators must enable for your organization.

[Learn more](/tools/connector/googlecloud)

Actions *FR-3994*

* * *

#### Scheduled Triggers: Run agents on schedules[​](#scheduled-triggers-run-agents-on-schedules "Direct link to Scheduled Triggers: Run agents on schedules")

Glean Agents now support scheduled triggers, enabling agents to run automatically on a set schedule (such as daily, weekly, or monthly) without user intervention. This enhancement allows users and teams to automate recurring tasks, receive timely updates, and standardize business processes—improving productivity and reducing manual effort. Common use cases include intelligent reminders, delegation trackers, and weekly work reports, all available as templates in the agent library.

**How to access:** Administrators must enable for your organization. Admins can turn on the scheduled triggers by going to Admin console → Platform → Agents → Scheduled triggers.

[Learn more](/agents/concepts/schedule-triggers)

Agents *FR-3221*

* * *

#### Glean Assistant is now your personal agent[​](#glean-assistant-is-now-your-personal-agent "Direct link to Glean Assistant is now your personal agent")

The Assistant is getting major upgrades, including a new all-knowledge mode that merges enterprise and real-time data in one query while giving users the option to choose between faster responses or deeper thinking based on their needs. The system uses an updated agentic engine with adaptive planning that proactively solicits user clarification, accepts user feedback, and refines its responses to deliver higher-quality results.

**How to access:** Administrators must enable for your organization. The Assistant refresh launched as a managed rollout on Sept 9. Admins can enable this for their users before October 30th via the Admin Portal.

[Learn more](http://docs.glean.com/user-guide/assistant/glean-chat/)

Assistant *FR-4123*

* * *

#### Conduct comprehensive research in Glean Assistant[​](#conduct-comprehensive-research-in-glean-assistant "Direct link to Conduct comprehensive research in Glean Assistant")

Deep Research is an AI agent in Glean Assistant that conducts comprehensive research across internal data sources and the web, analyzes that data, and synthesizes the insights into a detailed, citation-rich report. It’s designed for complex, multi-source questions and supports seamless export to Google Docs, OneDrive, Gmail, Outlook, and Slack. This feature is subject to usage-based pricing. For details, please contact [pricing@glean.com](mailto:pricing@glean.com). This feature is only available for customers on GCP or AWS and the Glean Key. Customer Key availability planned for Q4.

**How to access:** Administrators must enable for your organization. Turn on Deep Research for your users: Deep Research is turned off by default. Administrators can enable via self-serve in the Admin Console (Assistant → Deep Research) for all users or specific users. Once enabled, users can access Deep Research from the menu below Glean Chat.

[Learn more](/user-guide/assistant/deep-research)

Assistant *FR-2972*

* * *

#### Enumeration queries in GleanChat[​](#enumeration-queries-in-gleanchat "Direct link to Enumeration queries in GleanChat")

Glean has improved the quality of enumerate queries in Agentic Engine by 33% and in Agentic engine 2 additionally by 19% on internal evals. On external evals we have seen a similar 19% improvement in quality from Agentic Engine to Agentic Engine 2. In Agentic Engine 2, we additionally are able to better display the enumerate responses in assistant by leveraging a scrollable table format.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *FR-2329*

* * *

#### Glean in slack now with agentic engine & adaptive planning[​](#glean-in-slack-now-with-agentic-engine--adaptive-planning "Direct link to Glean in slack now with agentic engine & adaptive planning")

Bring the power of adaptive planning to Glean in Slack. The Glean Slack app now supports agentic engine 2, enabling Glean to autonomously plan, use tools, and execute multi-step actions directly within Slack threads. Users can ask complex questions or request help in Slack channels or DMs, and Glean will proactively reason through multi-step workflows—researching, gathering context, and following through on tasks so work keeps moving. This improves response quality and enables more advanced automation for both channel conversations and private sidebar interactions.

**How to access:** Enabled with agentic engine (Ref FR-4123)

[Learn more](/user-guide/assistant/glean-chat/)

Embedded Integrations *FR-4103*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Assistant Insights tab to get more detailed insights[​](#assistant-insights-tab-to-get-more-detailed-insights "Direct link to Assistant Insights tab to get more detailed insights")

Assistant tab on Insights has been revamped to provide richer insights on overall and department level usage of Glean Assistant within your company.

[Learn more](/administration/insights/assistant-insights)

Admin Capabilities *FR-4172*

* * *

#### Admin Self-Serve for Auto-Runnable Actions[​](#admin-self-serve-for-auto-runnable-actions "Direct link to Admin Self-Serve for Auto-Runnable Actions")

Admins can now choose which actions run automatically in the background from Actions > \[action pack\] > Configure in the admin console. Enable trusted automations—like sending a Slack message or creating a Google Doc—without user approval, while keeping sensitive actions under explicit confirmation. This enables admins to balance automation with security based on the organization's needs.

[Learn more](/agents/concepts/schedule-triggers)

Actions *FR-4168*

* * *

#### API support for adaptive planning[​](#api-support-for-adaptive-planning "Direct link to API support for adaptive planning")

Glean Assistant now offers API support for adaptive planning, powered by the new agentic engine. This upgrade enables more flexible, iterative reasoning in chat and API workflows, allowing the Assistant to proactively clarify user intent, accept feedback, and refine responses for higher-quality results. Users benefit from improved answer quality on complex, multi-step queries, with the system leveraging advanced planning to deliver more accurate and context-aware responses.

**How to access:** Glean Cloud-Prem AWS customers should reach out to their account representative to enable.

[Learn more](https://developers.glean.com/api/client-api/chat/chat)

Developer Experience *FR-4113*

* * *

#### Support for AWS IAM permissions boundaries[​](#support-for-aws-iam-permissions-boundaries "Direct link to Support for AWS IAM permissions boundaries")

Glean AWS deployment customers can now create a permissions boundary to further constrain Glean's IAM permissions. This allows customers to limit the maximum permissions required for Glean to operate in AWS, which improves the security of the deployment.

**How to access:** Glean Cloud-Prem AWS customers should reach out to their account representative to enable.

[Learn more](/security/cloud-prem/aws/)

Platform Capabilities *FR-4012*
