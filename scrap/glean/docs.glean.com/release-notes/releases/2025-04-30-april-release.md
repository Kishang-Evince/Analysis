---
url: "https://docs.glean.com/release-notes/releases/2025-04-30-april-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-04-30-april-release"
title: "April 30, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.306Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Glean is releasing updates to improve citation quality[​](#glean-is-releasing-updates-to-improve-citation-quality "Direct link to Glean is releasing updates to improve citation quality")

Glean is introducing a new approach to citation generation using LLM-based citations. With this method, the same LLM that generates the response also provides citations for the claims it makes—ensuring that references are directly tied to the information presented. This update is designed to improve citation accuracy, clarity, and trustworthiness by aligning responses more closely with their original sources.

Assistant *FR-2990*

* * *

#### Analyze multiple files in Glean Assistant[​](#analyze-multiple-files-in-glean-assistant "Direct link to Analyze multiple files in Glean Assistant")

Glean supports the analysis of multiple-file uploads of CSV, XLS/XLSX, and JSON formats in Assistant, 5 files up to 64MB each.

[Learn more](/administration/assistant/data-analysis/about-data-analysis)

Data analytics *FR-3195*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### New Azure DevOps connector[​](#new-azure-devops-connector "Direct link to New Azure DevOps connector")

Glean has developed a connector for Azure DevOps that enables users to search and query Azure wikis from within Glean.

[Learn more](https://docs.google.com/document/d/1dCJpDOhxhYs2gED3YF_AV2yYDwo8p-gt3lSscAX_QQk/edit?usp=sharing)

Connectors *FR-1302*

* * *

#### Improvements to the setup of Salesforce objects[​](#improvements-to-the-setup-of-salesforce-objects "Direct link to Improvements to the setup of Salesforce objects")

We are streamlining the additional objects self serve experience for Salesforce. This should make adding additional objects (standard + custom) to Salesforce a much smoother experience.

Connectors *FR-3263*

* * *

#### Glean browser extension update[​](#glean-browser-extension-update "Direct link to Glean browser extension update")

Glean has updated its browser extension sidebar (Command + J on Mac, Alt + J on Windows) with a new tab called Discover, which intelligently analyzes document content to generate personalized prompts that help users quickly understand, explore, and make informed decisions without leaving their workflow.

[Learn more](/user-guide/apps/installing-the-browser-extension)

Extension *FR-3036*

* * *

#### Access Glean from within the Zoom workspace via Zoom Custom AI Companion[​](#access-glean-from-within-the-zoom-workspace-via-zoom-custom-ai-companion "Direct link to Access Glean from within the Zoom workspace via Zoom Custom AI Companion")

Customers with both Zoom and Glean subscriptions can now access their organization's knowledge directly within Zoom Workplace applications via the Zoom Custom AI Companion paid add-on. This enables users to search across 100+ enterprise data sources indexed by Glean throughout their Zoom Workplace, while maintaining all existing security permissions and data ownership.

**How to access:** For setup instructions, please select the Zoom Support article below.

[Learn more](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0080256)

Glean Everywhere *FR-2284*

* * *

#### Create automated daily summaries in Slack of key channels[​](#create-automated-daily-summaries-in-slack-of-key-channels "Direct link to Create automated daily summaries in Slack of key channels")

Glean in Slack now lets you receive daily summaries of slack channels, delivered at a time you choose.

**How to access:** This will be enabled by default for Glean LLM key customers.

Glean in Slack *FR-2160*

* * *

#### Glean can respond to workflow-based messages in Slack[​](#glean-can-respond-to-workflow-based-messages-in-slack "Direct link to Glean can respond to workflow-based messages in Slack")

In addition to channels and threads, Glean will respond in workflow-based messages in Slack.

**How to access:** Enable this feature in Slack channels by running /glean configure.

Glean in Slack *FR-2032*
