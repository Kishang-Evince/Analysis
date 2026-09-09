---
url: "https://docs.glean.com/release-notes/releases/2025-10-22-october-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-10-22-october-release"
title: "October 22, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.795Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Create agents using natural language from within the Agent Builder[​](#create-agents-using-natural-language-from-within-the-agent-builder "Direct link to Create agents using natural language from within the Agent Builder")

Chat is now built into Agent Builder. Create agents through a multi-turn conversation-describe your goal in plain English and let AI draft it-then switch to node-level editing for precision or blend both without losing context. The unified workspace adapts to your style, helping you iterate faster, get better results from advanced reasoning, and avoid choosing between “easy” and “powerful.” Start in natural language, take manual control where it matters, and scale from simplicity to power-user depth on demand.

**How to access:** Administrators must enable for your organization.

[Learn more](/agents/concepts/agent-builder)

Agents *FR-4201*

* * *

#### Incorporating adaptive planning into Glean Agents plan & execute steps[​](#incorporating-adaptive-planning-into-glean-agents-plan--execute-steps "Direct link to Incorporating adaptive planning into Glean Agents plan & execute steps")

Glean Agents now thinks before it acts: Instead of giving you one answer and calling it done, Glean Agents plan & execute steps now work more like you do-it thinks through problems step by step, makes a plan, works through the plan, and adjusts when something doesn't work all in service of accomplishing the objective at hand.

-   Smarter problem-solving: The agent breaks down complex requests into smaller steps and tackles them one at a time
-   Course correction: If the first approach doesn't work, it tries a different strategy instead of giving up
-   Asks for help: When unclear about what you need, it asks clarifying questions rather than guessing
-   Control level of effort: You can control whether or not plan & execute optimizes for speed or depth in its decision making

Your agent can now handle bigger, more complex tasks that require multiple steps or decisions along the way and anchor more on the objective you want it to accomplish-like analyzing data across different systems, building comprehensive reports, or research projects that need information from various sources.

**How to access:** Administrators must enable for your organization.

[Learn more](/tools/glean/plan-execute)

Agents *FR-3968*

* * *

#### Google Conversational Analytics actions for BigQuery in Agents[​](#google-conversational-analytics-actions-for-bigquery-in-agents "Direct link to Google Conversational Analytics actions for BigQuery in Agents")

Users will be able to query BigQuery data using natural language in Agents.

**How to access:** Administrators must enable for your organization. Admins to configure Google cloud actions for their instance.

[Learn more](/tools/connector/googlecloud)

Agents *FR-3853*

* * *

#### Write actions in interactive agents can run in‑line without requiring user confirmation[​](#write-actions-in-interactive-agents-can-run-inline-without-requiring-user-confirmation "Direct link to Write actions in interactive agents can run in‑line without requiring user confirmation")

Write actions can be set to run in interactive agents without explicit user confirmation. When this occurs, it removed the click for confirmation step cutting the amount of time it takes to complete the action. For a write action to run without user confirmation, it needs to first be configured in the admin console. Agent creators can then choose to enable in-line execution within the agent builder.

[Learn more](/tools/inline-execution-of-write-tools)

Actions *FR-3848*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Connector health metrics in the admin console (Crawl Rate and Change Rate)[​](#connector-health-metrics-in-the-admin-console-crawl-rate-and-change-rate "Direct link to Connector health metrics in the admin console (Crawl Rate and Change Rate)")

Connector metrics related to documents crawled, document updates, and total indexed document counts are captured in data sources in the admin console, providing greater visibility on the overall health of connectors.

[Learn more](/get-started/setup/add-connectors#start-crawling)

Admin Capabilities *FR-3538*

* * *

#### New role-based access controls for actions[​](#new-role-based-access-controls-for-actions "Direct link to New role-based access controls for actions")

New role based access controls for actions let admins limit which agent creators can add and configure specific actions by user or department. End users can still run the actions in shared agents.

[Learn more](/administration/tools/managing-tools/managing-role-based-access-tools)

Actions *FR-3499*

* * *

#### Increased granular permissions for how agents are shared[​](#increased-granular-permissions-for-how-agents-are-shared "Direct link to Increased granular permissions for how agents are shared")

Glean now supports granular sharing permissions for agents, allowing admins to independently control whether Default Members can share agents with individual teammates, specific departments, or the entire company, as well as whether Default Members have access to agent publishing options. New toggles in the admin console make it easy to specify sharing scope for agents, helping organizations keep the agent directory clean and relevant for all users.

**How to access:** Configure agent sharing permissions in the Admin Console under "Teammates" –> "Default Member permissions"

[Learn more](/administration/managing-agents/agent-access)

Agents *FR-4009*

* * *

#### Support Agentic Engine 2 on Claude Sonnet 4.5[​](#support-agentic-engine-2-on-claude-sonnet-45 "Direct link to Support Agentic Engine 2 on Claude Sonnet 4.5")

Glean Assistant now supports the Agentic Engine 2 on Claude Sonnet 4.5. This enhancement brings advanced agentic reasoning capabilities-such as multi-step planning, tool orchestration, and stateful workflows-to customers using Anthropic models. Users can expect higher-quality responses to complex, multi-step queries, improved accuracy, and more efficient cross-tool workflows when leveraging Claude in Glean Assistant.

[Learn more](/administration/llms)

Assistant *FR-4185*

* * *

#### Data analysis tool achieves 96% completeness when running on Agentic Engine 2[​](#data-analysis-tool-achieves-96-completeness-when-running-on-agentic-engine-2 "Direct link to Data analysis tool achieves 96% completeness when running on Agentic Engine 2")

Glean Assistant now supports adaptive planning and iteration over uploaded files, allowing for greater analysis of structured data including large CSVs and multi-file joins. On internal performance benchmarks, we've seen the data analysis tool on Agentic Engine 2 achieve 96% on completeness and a 61% reduction in latency.The data analysis tool performance upgrade is available to customers on either the universal model key or the Glean key for Azure. Data analysis uses OpenAI's code interpreter functionality.

[Learn more](https://docs.google.com/document/d/1vE86Zlt8HCNkgbo6L8tMC_0G9CqC4wJta0wXry_1Mt4/edit?tab=t.0#heading=h.6gt9ia2scamh)

Assistant *FR-4086*

* * *

#### Simpplr Connector (AWS Version)[​](#simpplr-connector-aws-version "Direct link to Simpplr Connector (AWS Version)")

Glean now offers an all-new Simpplr connector built specifically for Simpplr’s AWS platform. As Simpplr transitions all customers from Salesforce to AWS, this connector ensures your organization can seamlessly index and search core Simpplr content-Pages, Sites, and Events-within Glean. The connector honors granular Simpplr permissions, supports efficient incremental crawls, and delivers a streamlined intranet search experience throughout and after your Simpplr platform migration.

[Learn more](/connectors/native/simpplr/)

Connectors *FR-3159*

* * *

#### AWS Bottlerocket for Code Interpreter[​](#aws-bottlerocket-for-code-interpreter "Direct link to AWS Bottlerocket for Code Interpreter")

We have migrated all remaining AWS Amazon Linux 2 k8s hosts over to the more secure Bottlerocket instances.

**How to access:** No action required by customers. This is automatic!

[Learn more](https://docs.glean.com)

Platform Capabilities *FR-4108*

* * *

#### Support for AWS IAM permissions boundaries[​](#support-for-aws-iam-permissions-boundaries "Direct link to Support for AWS IAM permissions boundaries")

Glean AWS deployment customers can now create a permissions boundary to further constrain Glean's IAM permissions. This allows AWS customers to limit the maximum permissions required for Glean to operate in AWS, which improves the security of the deployment.

**How to access:** Glean Cloud-Prem AWS customers should reach out to their account representative to enable.

[Learn more](/security/cloud-prem/aws/permission-boundaries)

Platform Capabilities *FR-4012*
