---
url: "https://docs.glean.com/release-notes/releases/2026-02-11-february-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-02-11-february-release"
title: "February 11, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.410Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Write better Emails and messages with dedicated Canvases[​](#write-better-emails-and-messages-with-dedicated-canvases "Direct link to Write better Emails and messages with dedicated Canvases")

You can now draft and refine emails and messages in dedicated Canvas templates that feel tailored to Gmail and chat. When we detect you’re composing a communication, Glean opens the right Canvas experience and keeps one-click export to your preferred email or messaging client.

[Learn more](/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-903*

* * *

#### Model choice in Assistant \[Glean Universal Key Only\][​](#model-choice-in-assistant-glean-universal-key-only "Direct link to Model choice in Assistant [Glean Universal Key Only]")

Users now have direct control to select which AI model powers their Glean Assistant conversations. Users can choose between leading models such as GPT and Claude for each Assistant chat, unlocking flexibility and allowing teams to optimize for speed, depth, and quality as needed. Organization admins may limit which models are surfaced for users, while Glean continues to provide high-quality defaults for a seamless experience. Available for Glean Key customers only.

Note: With this feature, users will be able to select a model for a chat session, but will not be able to change the default models used for Assistant.

[Learn more](/user-guide/assistant/glean-chat/)

Assistant *ROAD-853*

* * *

#### Re-run workflow agents from a previously executed step in Agent Builder Preview[​](#re-run-workflow-agents-from-a-previously-executed-step-in-agent-builder-preview "Direct link to Re-run workflow agents from a previously executed step in Agent Builder Preview")

Agent Builder Preview now lets you re-run an agent from any previously executed step in the workflow. This lets you skip unchanged steps and reuse the preserved states and outputs to speed up iteration and debugging of complex, multi-step workflow agents.

[Learn more](/agents/create-agents/re-run-from-step)

Agents *ROAD-1046*

* * *

#### Auto-generate agent description upon sharing[​](#auto-generate-agent-description-upon-sharing "Direct link to Auto-generate agent description upon sharing")

Agent creators can now generate and confirm agent descriptions when sharing agents with others. If you share an agent that doesn’t have a description, Glean will suggest an icon and an auto-generated description, which you can review, edit, or replace before confirming sharing. You’ll also see a new Enhance icon next to the agent description field (under the agent title and in Settings) that lets you instantly generate or refine the description at any time. Descriptions remain optional, but it’s now much easier to keep your agent library clear and self-explanatory with minimal effort.

**How to access:** To use this feature, open the Agent Builder and click the Share button when you’re ready to share your agent. If your agent doesn’t have a description, Glean will automatically suggest one along with an icon. You can review, edit, or replace the suggested description before confirming.

[Learn more](/agents/concepts/agent-builder)

Agents *ROAD-1044*

* * *

#### Bitbucket Server Mirror Project & Global Permissions[​](#bitbucket-server-mirror-project--global-permissions "Direct link to Bitbucket Server Mirror Project & Global Permissions")

The Bitbucket Server connector reflects user and group permissions by incorporating global, project and repository level access controls. This enhancement ensures that users see all Bitbucket Server content they are entitled to, even when permissions are granted at the project or global level a common practice for Bitbucket administrators. As a result, search results in Glean match Bitbucket’s native access model.

**How to access:** No additional setup is required for permissions inheritance; the connector now automatically crawls and applies both project-level and repository-level permissions. This is automatically supported for Bitbucket Data Center version 8.5 and above

[Learn more](/connectors/native/bitbucket-server/)

Connectors *ROAD-1120*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Assign Glean roles and permissions using identity provider groups[​](#assign-glean-roles-and-permissions-using-identity-provider-groups "Direct link to Assign Glean roles and permissions using identity provider groups")

Use your existing identity provider groups, Azure AD or Google Groups, to assign Glean roles at scale, so users automatically inherit the right permissions based on their group memberships instead of being managed one by one.

[Learn more](/administration/identity/roles/group-based-permissions)

Admin Capabilities *ROAD-860*

* * *

#### Manage the rollout of new Beta & Generally Available features[​](#manage-the-rollout-of-new-beta--generally-available-features "Direct link to Manage the rollout of new Beta & Generally Available features")

The managed rollouts feature is a centralized place for admins to see major, new features being released, test them, and then manage the timeline and change management surrounding the features.

[Learn more](/administration/feature-rollouts)

Admin Capabilities *ROAD-732*

* * *

#### \[Action Required\] End of Support for GPT and Claude Models on Agentic Engine V1[​](#action-required-end-of-support-for-gpt-and-claude-models-on-agentic-engine-v1 "Direct link to [Action Required] End of Support for GPT and Claude Models on Agentic Engine V1")

Glean is ending support for Agentic Engine V1, and customers on Customer Key OpenAI or Claude must migrate to Agentic Engine V2 by January 31, 2026. After this date, all new Assistant and Agent capabilities will be built on Agentic Engine 2 and Assistant and Agent experiences will no longer be supported for customers who do not migrate. No action is required for customers already on Agentic Engine V2, including all Glean universal key customers. Customers on Customer Key Gemini will be asked to migrate once Gemini 3.0 is available on Agentic Engine V2.

**How to access:**

Step 1: Configure the LLM Model

1.  Navigate to Admin Console → Platform → LLM
    
2.  Under "Select models for assistant," choose your provider and set GPT-5 or Claude Sonnet 4.5 as your agentic reasoning model
    

Step 2: Enable the Features

1.  Navigate to Admin Console → Platform → Assistant → Settings
    
2.  Under "New agentic engine features," enable Fast and Thinking modes
    
3.  Enable for everyone
    

Requirements:

-   If using Customer Key, you must manually configure GPT-5 (via OpenAI Direct or Azure) or Claude Sonnet 4.5 (via Google Vertex AI or Amazon Bedrock)
    
-   If using Glean Key, you'll be automatically migrated to GPT-5
    
-   For self-hosted deployments, ensure your deployment occurred on or after September 4th, 2025
    

[Learn more](/user-guide/assistant/glean-chat/)

Assistant *ROAD-1034*

* * *

#### Enable creation of multiple test groups for datasources[​](#enable-creation-of-multiple-test-groups-for-datasources "Direct link to Enable creation of multiple test groups for datasources")

Admins can now create and assign multiple test groups for each data source in Glean. This enhancement allows organizations to test and validate different data sources with distinct groups of users, improving control and flexibility during rollout. With this update, admins can ensure that only the right users have early access to specific data sources, streamlining testing and reducing the risk of unintended data exposure.

[Learn more](/administration/search/hiding-content#test-groups-for-connectors)

Connectors *ROAD-824*

* * *

#### Sensitive Findings Insights and Dashboard[​](#sensitive-findings-insights-and-dashboard "Direct link to Sensitive Findings Insights and Dashboard")

The new Findings Dashboard gives administrators a clear, high-signal view of sensitive findings across all policies, info types, and data sources. This dashboard makes it easy to track the progress of sensitive content detection, monitor trends over time, and quickly identify areas of risk. With aggregated insights and flexible filters, large organizations can efficiently manage data protection, demonstrate compliance, and take action to reduce exposure.

[Learn more](/administration/protect/sensitive-findings/view-policy-findings#sensitive-findings-insights)

Protect *ROAD-957*
