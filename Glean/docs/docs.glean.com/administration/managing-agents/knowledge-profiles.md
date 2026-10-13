---
url: "https://docs.glean.com/administration/managing-agents/knowledge-profiles"
canonical: "https://docs.glean.com/administration/managing-agents/knowledge-profiles"
title: "Knowledge profiles"
description: "Define the connectors and scoped entities that Gleanbot and public data agents can search."
fetched_at: "2026-10-13T08:49:19.468Z"
---
On this page

Knowledge profiles let admins define the company knowledge that Gleanbot and public data agents can search. A profile sets a bounded corpus of connectors and, where supported, specific workspaces, repositories, groups, or teams.

## Company knowledge profile[​](#company-knowledge-profile "Direct link to Company knowledge profile")

Every deployment includes a default **Company knowledge** profile. If Gleanbot already has public data settings, Glean carries those settings into the profile. Otherwise, Glean initializes the profile with its recommended Tier 1 connectors.

The **Company knowledge** profile is the default corpus for public Gleanbot responses and for auto-agents configured to use public data. Review the profile before you share an agent in a Slack channel, collaborative workflow, or another surface where multiple people can see its responses.

## Configure a knowledge profile[​](#configure-a-knowledge-profile "Direct link to Configure a knowledge profile")

1.  In the **Admin console**, go to **Agents → Knowledge Profiles**.
2.  Open the profile you want to configure.
3.  Add or remove connectors from the profile.
4.  Configure source specific scope for connectors that support it.
5.  Save your changes.

## Supported controls[​](#supported-controls "Direct link to Supported controls")

You can include or exclude any supported connector within a profile. The connectors below allow for even more granular scoping:

| Connector | Scope you can select |
| --- | --- |
| Slack and Slack Enterprise Grid | Slack workspaces |
| GitHub and GitHub Enterprise | Repositories |
| Jira | Product access groups |
| Confluence | Product access groups |
| Google Drive | Directory groups |
| Gong | Workspaces |
| Microsoft Teams | Teams |
| OneDrive and SharePoint | Organization wide directory groups |

If a connector does not support source specific scope, include or exclude the entire connector. A profile only searches the connectors and scoped entities that an admin includes.

## Use a profile with Gleanbot[​](#use-a-profile-with-gleanbot "Direct link to Use a profile with Gleanbot")

Public Gleanbot responses use the **Company knowledge** profile. When an admin changes the profile, Glean propagates the changes to the identity used for public responses.

Private, user scoped experiences continue to use the requesting user . Public responses do not use a user's private credentials to retrieve content for a shared response.

For Slack setup and channel visibility, see [Enable Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode).

## Use a profile with auto-agents[​](#use-a-profile-with-auto-agents "Direct link to Use a profile with auto-agents")

When an agent builder configures an auto agent, they can choose how the agent searches for information:

-   User data uses the permissions and personal context of the requesting user.
-   Public data uses an administrator curated knowledge profile.

Public data agents are useful when the same bounded corpus must apply to everyone who can see the response.

### Retrieve approved public documents[​](#retrieve-approved-public-documents "Direct link to Retrieve approved public documents")

Some documents may be available to the organization in a connector but unavailable to a particular user because of how that connector represents permissions. A public data agent can retrieve approved documents through the identity of the profile without giving every user direct access in the source application.

The agent can only search the connectors, groups, repositories, workspaces, or teams included in the selected profile.

### Share agents in multiplayer surfaces[​](#share-agents-in-multiplayer-surfaces "Direct link to Share agents in multiplayer surfaces")

People may share agents in Slack channels, collaborative workflows, and other surfaces where multiple people can see a response. User data retrieval can produce inconsistent results in these contexts because the agent may find content visible only to the person who started the run.

Configure the agent to use public data when the response should come from the same admin defined corpus for every viewer. For public or shared executions, Glean restricts user scoped authorization paths so the agent does not use the private credentials of the user in a shared response.

## Troubleshoot retrieval[​](#troubleshoot-retrieval "Direct link to Troubleshoot retrieval")

If a public data agent cannot find an expected document, check the following:

-   The agent uses public data, not user data.
-   The document's connector is included in the selected knowledge profile.
-   The relevant workspace, repository, group, or team is included when the connector supports source specific scope.
-   The document is indexed by Glean.

For connector-specific public-content rules, see [What content Public Mode can use](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#what-content-public-mode-can-use).

For more troubleshooting steps, see [Troubleshoot document retrieval in agents](/agents/create-agents/troubleshoot-document-retrieval).

## See also[​](#see-also "Direct link to See also")

-   [Manage agent access](/administration/managing-agents/agent-access)—control who can use and share agents
-   [Knowledge Source Types](/agents/knowledge-source-types)—configure connectors, containers, and documents for agent steps
-   [Enable Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode)—configure public replies in Slack
