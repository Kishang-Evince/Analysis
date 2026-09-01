---
url: "https://docs.glean.com/release-notes/releases/2025-05-20-may-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-05-20-may-release"
title: "May 20, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.582Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Personal activity action added to Glean Agents[​](#personal-activity-action-added-to-glean-agents "Direct link to Personal activity action added to Glean Agents")

New action for Glean Agents that allows for the retrieval of all personal activities. This action can be used for self-assessments or to show strategic impact over a period of time.

[Learn more](/tools/glean/read-personal-activity)

Agents *FR-3320*

* * *

#### Agents API[​](#agents-api "Direct link to Agents API")

With Agent API, you can programmatically list, retrieve details, and run agents your team creates in Glean.

**How to access:** To use the Agent API, you must have access to Glean's Client API. For details, see the Glean developer experience.

Client APIs *FR-3433*

* * *

#### Search nested content within Notion[​](#search-nested-content-within-notion "Direct link to Search nested content within Notion")

Notion arranges information in 'Blocks' and allows users to create 'Toggles' which are sub-blocks within these blocks. Notion users can create many toggles inside a block which Glean was previously unable to retrieve. This feature recursively retrieves information from {{toggleable}}child blocks in Notion and deepens Glean's integration with Notion.

Connectors *FR-3108*

* * *

#### Revamped overview and department level Insights (GCP Only)[​](#revamped-overview-and-department-level-insights-gcp-only "Direct link to Revamped overview and department level Insights (GCP Only)")

The Insights page will now include a new "Overview" tab replacing the Teammates tab; it features key metrics including usage across search and chat as well as data source usage. A new tab for "departments" will provide a table view of each department's usage, enabling you to understand the departments driving adoption and those at risk. This will only be available to GCP customers as part of this release.

Growth *FR-3209*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Glean action to send a message to a Slack channel[​](#glean-action-to-send-a-message-to-a-slack-channel "Direct link to Glean action to send a message to a Slack channel")

New action to post messages and updates to Slack channels from Agents, enhancing collaboration by automating communications and notifications

Actions *FR-3317*

* * *

#### Setup and manage web search under actions in the admin console[​](#setup-and-manage-web-search-under-actions-in-the-admin-console "Direct link to Setup and manage web search under actions in the admin console")

Glean enables web search to be setup and managed in the admin console under actions. You can now enable Microsoft Bing actions, Google Gemini actions, and OpenAI actions.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup#web-search-in-assistant)

Actions *FR-3255*

* * *

#### Execute SQL queries directly against Databricks from within Glean[​](#execute-sql-queries-directly-against-databricks--from-within-glean "Direct link to Execute SQL queries directly against Databricks  from within Glean")

Glean's Databricks action pack now supports executing SQL directly against your warehouse.

Actions *FR-3248*

* * *

#### Send a direct message to Slack using Glean actions[​](#send-a-direct-message-to-slack-using-glean-actions "Direct link to Send a direct message to Slack using Glean actions")

New action to send a direct message on Slack is helpful for sharing daily reports, preparing for upcoming meetings, or staying on top of changing sales metrics.

Actions *FR-3234*

* * *

#### Adds a row to a Google sheet using Glean actions[​](#adds-a-row-to-a-google-sheet-using-glean-actions "Direct link to Adds a row to a Google sheet using Glean actions")

Add new rows to Google Sheets using Glean actions, making it easier to automate and consolidate data in spreadsheets.

Actions *FR-3202*

* * *

#### Glean supports Jira JQL actions[​](#glean-supports-jira-jql-actions "Direct link to Glean supports Jira JQL actions")

Glean is introducing a new functionality that allows users to query Jira data using JQL and/or natural language queries.

[Learn more](/tools/connector/jira)

Actions *FR-2410*

* * *

#### Glean supports Salesforce SOQL actions[​](#glean-supports-salesforce-soql-actions "Direct link to Glean supports Salesforce SOQL actions")

Glean is introducing a new functionality that allows users to query Salesforce data using SOQL and/or natural language queries.

Actions *FR-2020*

* * *

#### Glean supports Snowflake Cortex for SQL actions[​](#glean-supports-snowflake-cortex-for-sql-actions "Direct link to Glean supports Snowflake Cortex for SQL actions")

Glean is introducing a new functionality to enable users to query Snowflake data using SQL and/or natural language queries. These queries will be powered by the Snowflake SQL API and the Cortex Analyst API. Glean users will be able to ask follow up questions to combine Snowflake data with their other connected apps and documents.

[Learn more](/tools/connector/snowflake/snowflake-index)

Actions *FR-827*

* * *

#### Glean Agents[​](#glean-agents "Direct link to Glean Agents")

Glean Agents is our new platform for building conversational and task based agents. This features a visual agent builder with advanced capabilities like branching, response style control, and the ability to choose from large language models from OpenAI, Anthropic, Google, Amazon, and Deepseek. Access agents from where you work – run agents on the Glean website, embed agents in your website, or call agents via an API.

**How to access:** If you have an existing deployment with prompts or apps, Glean will not enable the agents feature immediately. Instead, Glean will provide a transition period and a migration path for your existing prompts and apps. You can choose to preview or launch agents any time between May 20 and July 15.

[Learn more](/release-notes/sunset/migrating-prompts-apps)

Agents *FR-3199*

* * *

#### Use OpenAI as a web search provider[​](#use-openai-as-a-web-search-provider "Direct link to Use OpenAI as a web search provider")

Glean integrates OpenAI as an additional web search provider.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup#web-search-in-assistant)

Assistant *FR-3254*

* * *

#### Use Google Gemini as a web search provider[​](#use-google-gemini-as-a-web-search-provider "Direct link to Use Google Gemini as a web search provider")

Glean integrates Google Gemini as a web search provider.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup#web-search-in-assistant)

Assistant *FR-2959*

* * *

#### New data source connector for Databricks that indexes AI/BI dashboards[​](#new-data-source-connector-for-databricks-that-indexes-aibi-dashboards "Direct link to New data source connector for Databricks that indexes AI/BI dashboards")

Glean data source connector for Databricks indexes AI/BI dashboards.

[Learn more](/tools/connector/databricks-tools)

Connectors *FR-2862*

* * *

#### New version of the Gmail connector[​](#new-version-of-the-gmail-connector "Direct link to New version of the Gmail connector")

The Gmail connector now supports both data crawling and indexing as well as data fetching to improve search and assistant quality.

**How to access:** Gmail can be upgraded to the latest version by going to data sources > Gmail > Enable both data crawling and indexing as well as data fetching.

[Learn more](https://docs.google.com/document/d/19LUrUawqDtpDAbne97AYoSSJkTbNppLnhLLZ7e69nBw/edit?tab=t.0#heading=h.ymaqpw865hc9)

Connectors *FR-2537*

* * *

#### Support for indexing Workday knowledge base articles[​](#support-for-indexing-workday-knowledge-base-articles "Direct link to Support for indexing Workday knowledge base articles")

Index public articles from Workday using the new connector, making it easier for HR and IT teams to access and utilize knowledge base articles within Glean.

Connectors *FR-2281*

* * *

#### New version of the Outlook connector[​](#new-version-of-the-outlook-connector "Direct link to New version of the Outlook connector")

The Outlook connector now supports both data crawling and indexing as well as data fetching to improve search and assistant quality.

**How to access:** Outlook connector can be upgraded to the latest version by going to data sources > Gmail > Enable both data crawling and indexing as well as data fetching.

[Learn more](https://docs.google.com/document/d/17jzwXMFjgQX1shwceL_iLhTxVTRKKWFvG67iYhIBmdU/edit?tab=t.0#heading=h.ymaqpw865hc9)

Connectors *FR-1853*

* * *

#### Glean supports Databricks Genie for SQL actions[​](#glean-supports-databricks-genie-for-sql-actions "Direct link to Glean supports Databricks Genie for SQL actions")

Glean is introducing new functionality to enable users to query their Databricks workspaces using natural language queries. The natural language queries are powered by the Databricks Genie API. The SQL queries are powered by the Execute SQL API.

[Learn more](/tools/connector/databricks-tools)

Connectors *FR-1711*

* * *

#### Workday connector for people data[​](#workday-connector-for-people-data "Direct link to Workday connector for people data")

Index People data from Workday to Glean via people data connector.

Connectors *FR-996*

* * *

#### Support for Nova Pro 1.0 in the model hub[​](#support-for-nova-pro-10-in-the-model-hub "Direct link to Support for Nova Pro 1.0 in the model hub")

Glean now supports Nova Pro 1.0 which is hosted on Amazon Bedrock as part of its model hub. Customers can select Nova on a per-agent and per-agent step basis.

LLMs *FR-3111*

* * *

#### Support for Deepseek-R1 in the model hub[​](#support-for-deepseek-r1-in-the-model-hub "Direct link to Support for Deepseek-R1 in the model hub")

Glean supports Deepseek-R1 hosted on Amazon Bedrock. Deepseek-R1 is available in the model hub to be used as the model for an agent or agentic workflow step.

LLMs *FR-3109*

* * *

#### Weekly and continuous sensitive insights dashboards in Glean Protect[​](#weekly-and-continuous-sensitive-insights-dashboards-in-glean-protect "Direct link to Weekly and continuous sensitive insights dashboards in Glean Protect")

Glean sensitive insights continuously scans and flags overshared sensitive content across your applications. Create customizable policies, run continuous reports, and auto-hide sensitive data from a centralized dashboard in Glean.

**How to access:** Please reach out to your account team to learn more about sensitive insights (ie: dashboards) and Glean Protect.

[Learn more](/administration/protect/sensitive-findings/about)

Security *FR-2755*
