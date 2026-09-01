---
url: "https://docs.glean.com/release-notes/releases/2025-06-18-june-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-06-18-june-release"
title: "June 18, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.767Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Track metrics for the Glean agents you’ve created directly in Insights.[​](#track-metrics-for-the-glean-agents-youve-created-directly-in-insights "Direct link to Track metrics for the Glean agents you’ve created directly in Insights.")

Agent creators can now see metrics on active users, agent runs, and upvote/downvotes for their agents in Insights.

[Learn more](/administration/insights/agents)

Agents *FR-3226*

* * *

#### Sunset the ability to create answer boards[​](#sunset-the-ability-to-create-answer-boards "Direct link to Sunset the ability to create answer boards")

We have sunset the ability to create new answer boards for legacy customers, as we transition to collections, a single tool to store answers as well as other enterprise artifacts. To ensure a seamless transition, legacy customer answer boards will be automatically migrated to collections in mid-July.

[Learn more](/user-guide/knowledge/answers/answer-boards-migration)

Answers *FR-3415*

* * *

#### Glean Agents run on the agentic reasoning engine[​](#glean-agents-run-on-the-agentic-reasoning-engine "Direct link to Glean Agents run on the agentic reasoning engine")

Glean is upgrading its underlying architecture from a RAG-based system to an agentic reasoning engine, providing greater access to tools and multi-step workflows across both the Assistant and Agents.

**How to access:** Accessible as part of Glean:Go Agents updates (June 1, 2025)

[Learn more](/administration/assistant/features/agentic-reasoning)

Assistant *FR-2989*

* * *

#### Support for Claude Sonnet 4 in the model hub[​](#support-for-claude-sonnet-4-in-the-model-hub "Direct link to Support for Claude Sonnet 4 in the model hub")

Glean supports Claude Sonnet 4, hosted on both Amazon Bedrock and Google Vertex AI, as part of its model hub. Customers can select Claude Sonnet 4 for each agent and for individual agent steps.

**How to access:** Glean admins can enable Claude Sonnet 4 from the admin console in the LLM section.

Done *FR-3466*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### New actions to update Salesforce opportunity records from within Glean[​](#new-actions-to-update-salesforce-opportunity-records-from-within-glean "Direct link to New actions to update Salesforce opportunity records from within Glean")

Users can now update Salesforce opportunity records without leaving Glean, helping sales teams keep their CRM data up to date.

**How to access:** Salesforce Actions Setup

[Learn more](/tools/connector/salesforce/sf-index)

Actions *FR-3170*

* * *

#### Validate action pack authorization from within Glean actions setup[​](#validate-action-pack-authorization-from-within-glean-actions-setup "Direct link to Validate action pack authorization from within Glean actions setup")

Admins can now verify their authentication setup and receive guidance on resolving any issues encountered during action setup.

Actions *FR-3444*

* * *

#### Upgrading WORKFLOW events with WORKFLOW\_RUN event logs for easier analytics[​](#upgrading-workflow-events-with-workflow_run-event-logs-for-easier-analytics "Direct link to Upgrading WORKFLOW events with WORKFLOW_RUN event logs for easier analytics")

Launching a new event type called {{WorkflowRun}} across all customer-facing event logs. Admins who use Glean’s event logs will now have the ability to comprehensively track and analyze usage across all Glean AI products. These include Agents, which are the most frequently requested feature for these logs, AI Answers, Summarization, Deep Research, Daily Digests, and more.

Data analytics *FR-3541*

* * *

#### Support for Wiz sensor in AWS deployments[​](#support-for-wiz-sensor-in-aws-deployments "Direct link to Support for Wiz sensor in AWS deployments")

Customers using AWS can deploy Wiz sensors on their compute resources, particularly for EC2 instances and EKS nodes. This enables Wiz to monitor Glean deployments, enhancing security.

**How to access:** Please reach out to your account team for help enabling this feature.

[Learn more](/security/cloud-prem/aws/wiz-sensor#general-setup-details)

Platform *FR-3462*

* * *

#### Set a green-list of countries that are allowed to access Glean via AWS WAF[​](#set-a-green-list-of-countries-that-are-allowed-to-access-glean-via-aws-waf "Direct link to Set a green-list of countries that are allowed to access Glean via AWS WAF")

Add country green-lists to AWS WAF. This configuration enables you to restrict requests to Glean so that only those originating from countries where your company operates are permitted, while blocking requests from all other countries. Note: Only data sources that are able to operate in (i.e., serve data from or to) countries on this green list may be used. Any traffic or data requests originating from countries not on the green list will be blocked.

**How to access:** Reach out to your Glean representative to enable this capability.

[Learn more](/security/cloud-prem/aws/aws-waf)

Security *FR-3535*

* * *

#### Block access to high sensitivity debug endpoints in AWS WAF[​](#block-access-to-high-sensitivity-debug-endpoints-in-aws-waf "Direct link to Block access to high sensitivity debug endpoints in AWS WAF")

Glean provides the capability in AWS WAF to disable high sensitivity endpoints; endpoints that have high\_sensitivity and actas\_sensitivity in them.

**How to access:** Please submit a support ticket request to enable this feature.

Security *FR-3341*
