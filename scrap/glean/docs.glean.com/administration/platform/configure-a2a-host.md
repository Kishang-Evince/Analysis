---
url: "https://docs.glean.com/administration/platform/configure-a2a-host"
canonical: "https://docs.glean.com/administration/platform/configure-a2a-host"
title: "Configure the Glean A2A host"
description: "Register a third-party A2A server and add its agent to a Glean Auto mode agent."
fetched_at: "2026-09-01T13:29:10.800Z"
---
On this page

Register an external A2A server to let builders add its agent as a subagent of a Glean Auto mode agent. People who run the Glean agent authorize the external server with their own identity.

For an overview of outbound A2A calls and how they differ from the Glean A2A server, see [Glean A2A host](/administration/platform/a2a-host).

Administrator access required

A Glean administrator must complete the registration steps in the **Admin console**. Agent builders can add the registered external agent after the setup is complete.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you register an external server, make sure:

-   You have the **Admin** or **Agent Moderator** role required to configure agents in the **Admin console**
-   The external server supports A2A v0.3 and is reachable from the Glean network
-   The server publishes its agent card at `/.well-known/agent-card.json` relative to the server URL
-   For an authenticated server, you have an OAuth client ID and client secret for an authorization code flow

## Register a third-party A2A server[​](#register-a-third-party-a2a-server "Direct link to Register a third-party A2A server")

1

Open the third-party agents settings

Navigate to **Admin console → Platform → Agents → Setup → Third-party agents**. Expand **Third-party agents**, then click **Add agent**.

![Third-party agents section on the Setup tab of the Agents page in the Admin console](/img/administration/platform/a2a-host-third-party-agents.png)

2

Fetch the agent card

Enter the base URL for the external server in **A2A server URL**, then click the fetch button next to the field.

Glean fetches the agent card from `/.well-known/agent-card.json`. Review the discovered agent information under **View agent card** before you continue.

3

Configure OAuth

Enter the values from the OAuth application in **Client ID** and **Client Secret**. Glean displays the **Authorization URL**, **Token URL**, and **Scopes** from the agent card.

Copy the **Callback URL** from Glean and add it to the allowed redirect URLs for the OAuth application.

4

Authorize the connection

Click **Initiate connection** and complete the consent flow for the external provider. After authorization, Glean registers the server and lists its agent under **Third-party agents**.

Authentication support

For authenticated servers, the A2A host supports OAuth 2.0 authorization code authentication. It does not support API keys or the OAuth client credentials flow.

## Add the external agent as a subagent[​](#add-the-external-agent-as-a-subagent "Direct link to Add the external agent as a subagent")

1

Open an Auto mode agent

Create an Auto mode agent or open an existing one in **Agent builder**. Select **Tools**.

2

Open the agent picker

Under **Sub-agents**, click the add button and select **Use existing agent**.

3

Select the external agent

In the **Agents** dialog, search for the registered agent or select **View all → Third-party**. Click **Add to list** for the agent you want to use.

Registered A2A agents have a **Third-party** badge.

4

Connect your account

If the subagent shows that a connection is required, click **Connect** and complete the consent flow for the external provider. Each builder authorizes the server separately.

5

Test and publish the agent

Add instructions that describe when the parent agent should use the external agent. Run a request in **Preview** that requires the external agent, then confirm that the result appears in the response. Publish the agent when the test succeeds.

Success

Activity in the preview shows the external agent being used, and the parent agent includes the result in the response.

## End-user authorization[​](#end-user-authorization "Direct link to End-user authorization")

When someone opens a Glean agent that uses an external A2A agent without prior authorization, Glean displays a connection prompt for that external agent. They must click **Connect** and complete the consent flow for the external provider before the run controls become available.

Authorization is per person. A connection by one person does not provide access to anyone else.

## See also[​](#see-also "Direct link to See also")

-   [Glean A2A host](/administration/platform/a2a-host)
-   [Create an Auto mode agent](/agents/auto-mode-agent)
-   [Glean A2A server](/administration/platform/a2a-server)
-   [Expose Glean agents over A2A](/administration/platform/expose-agents-over-a2a)
