---
url: "https://docs.glean.com/release-notes/releases/2025-08-27-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-08-27-august-release"
title: "August 27, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.399Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Create Jira tickets with Glean actions[​](#create-jira-tickets-with-glean-actions "Direct link to Create Jira tickets with Glean actions")

Streamline engineering and related workflows by automatically creating Jira issues, speeding up resolution and increasing efficiency.

Note: This complements the existing Jira Service Management (JSM) capabilities to create JSM tickets from within Slack.

**How to access:** Administrators must enable for your organization.

[Learn more](/tools/connector/jira/)

Actions *FR-3204*

* * *

#### Agent LLM Model selector now more easily accessible[​](#agent-llm-model-selector-now-more-easily-accessible "Direct link to Agent LLM Model selector now more easily accessible")

Model choice plays a critical role in agent performance. Previously, changing the model required navigating through multiple screens to access the advanced settings for each step — making it cumbersome for builders and admins to update. We've now moved the model selector directly into the agent step configuration settings, making it more visible and easier to use. This change simplifies model customization for each step, giving customers more control with less friction.

[Learn more](/administration/llms#supported-models)

Agents *FR-3810*

* * *

#### GPT-5 in LLM model hub[​](#gpt-5-in-llm-model-hub "Direct link to GPT-5 in LLM model hub")

Customers can now use GPT-5 to build agents with Glean.

Note: At this time, GPT-5 is only available through OpenAI directly and not via Azure.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/llms)

Agents *FR-3873*

* * *

#### Move "Agents" nav item to top level navigation bar[​](#move-agents-nav-item-to-top-level-navigation-bar "Direct link to Move \"Agents\" nav item to top level navigation bar")

Agents is now a top‑level item in Glean’s left navigation menu, making it easier to find and launch.

[Learn more](/agents/introduction)

Agents *FR-3888*

* * *

#### Assistant supports Salesforce Search with SOQL action[​](#assistant-supports-salesforce-search-with-soql-action "Direct link to Assistant supports Salesforce Search with SOQL action")

Glean Assistant now lets users ask deeper questions about Salesforce data using natural language, including sorting and filtering records. Assistant interprets the user's natural language query into Salesforce SOQL to answer the user’s question, using the Search Salesforce with SOQL Action in the Salesforce Action Pack. You can ask Glean a question that includes hints that the answer lives in Salesforce, e.g. “From Salesforce, what are the top open opportunities by ARR?”

Glean will automatically enable the Search Salesforce with SOQL Action for customers as it will improve Assistant response quality. We recommend that admins leave this action on for better Salesforce querying in Assistant.

**How to access:** Administrators must enable for your organization. Please note that first-time users of the action will have to authorize Glean to connect to Salesforce.

[Learn more](/administration/tools/setup-tools/salesforce-tools-setup#setting-up-the-salesforce-oauth-app)

Assistant *FR-3516*

* * *

#### Support tagging of any document in Glean Chat[​](#support-tagging-of-any-document-in-glean-chat "Direct link to Support tagging of any document in Glean Chat")

When using @ to tag a document in the Glean Chat composer, users will now have an option to search and select any document in Glean.

[Learn more](/user-guide/assistant/best-practices)

Assistant *FR-3892*

* * *

#### Customize how agents are organized and run in Glean's embedded integrations for Support (formerly Glean Assist)[​](#customize-how-agents-are-organized-and-run-in-gleans-embedded-integrations-for-support-formerly-glean-assist "Direct link to Customize how agents are organized and run in Glean's embedded integrations for Support (formerly Glean Assist)")

Support admins can now easily add, organize and update which agents are available to customer support representatives. Additionally, Glean Search and Assistant are now directly accessible in Zendesk, ServiceNow and Service Cloud.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/platform/embedded-integrations/)

Embedded Integrations *FR-3739*

* * *

#### Allow users to negate a search operator and term to exclude results from a search[​](#allow-users-to-negate-a-search-operator-and-term-to-exclude-results-from-a-search "Direct link to Allow users to negate a search operator and term to exclude results from a search")

Exclude search results with a minus sign. You can now remove unwanted results right from search. Add a minus sign before a filter to exclude matches.

{{-from:me}} hides results from you{{-department:engineering}} removes results from Engineering

[Learn more](/administration/search/about)

Search *FR-93*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Ability to exclude models to be used in agents from the Model Hub[​](#ability-to-exclude-models-to-be-used-in-agents-from-the-model-hub "Direct link to Ability to exclude models to be used in agents from the Model Hub")

Admins for customers on Glean Key will now be able to individually exclude models to be used in agents from the Model Hub.

[Learn more](/administration/llms)

Agents *FR-3551*

* * *

#### World mode quality improvements[​](#world-mode-quality-improvements "Direct link to World mode quality improvements")

World Mode in Glean Assistant has been upgraded to a new architecture aligned with ChatV2. This update introduces a smarter orchestration system (“Strategize”) and an improved response format, delivering higher-quality, more complete, and better-formatted answers when using World Mode. The change also updates the underlying model to GPT-4.1, leading to responses that match or exceed ChatGPT in external benchmarks for information-seeking, writing, and formatting tasks. Users will experience clearer, more structured, and more comprehensive answers in the Public Knowledge World Mode) chat experience.

[Learn more](/user-guide/assistant/how-glean-accesses-info#knowledge-sources)

Assistant *FR-3024*

* * *

#### Expanded Model Access for Agents with Cross-Cloud Model Hub in Glean Key (GCP <> AWS)[​](#expanded-model-access-for-agents-with-cross-cloud-model-hub-in-glean-key-gcp--aws "Direct link to Expanded Model Access for Agents with Cross-Cloud Model Hub in Glean Key (GCP <> AWS)")

Glean customers can now select and use large language models (LLMs) across both AWS (Amazon Bedrock) and GCP (Google Vertex AI) platforms in the model hub, regardless of their deployment’s primary cloud. For example, GCP-hosted customers can now enable Bedrock-hosted models for use in agents, while AWS-hosted customers can access Vertex AI-hosted models—significantly broadening choice for Glean Agents and improving flexibility for diverse workflows.

**How to access:** Glean Key Customers only. Admins can enable any available models directly in the model hub configuration within the Glean Admin Console. This update does not impact the default model for Glean Assistant.

[Learn more](/get-started/setup/access-the-admin-ui)

Platform Capabilities *FR-3584*

* * *

#### Limit AWS IAM PassRole Permissions on AWS[​](#limit-aws-iam-passrole-permissions-on-aws "Direct link to Limit AWS IAM PassRole Permissions on AWS")

We have made some improvements to our AWS IAM permissions to scope down the use of `iam:PassRole` permissions to only be passable to Glean-specific IAM roles in the Glean AWS account. Previously this was not scoped down. Scoping down improves the security of Glean in AWS.

**How to access:** No action required by AWS customers - this is applied automatically.

[Learn more](/get-started/prepare/self-hosted-deployment/aws/deploy-aws#overview)

Platform Capabilities *FR-4010*
