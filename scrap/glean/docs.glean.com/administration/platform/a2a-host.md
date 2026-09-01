---
url: "https://docs.glean.com/administration/platform/a2a-host"
canonical: "https://docs.glean.com/administration/platform/a2a-host"
title: "Glean A2A host"
description: "Learn how Glean Auto mode agents call registered third-party agents over the Agent2Agent protocol."
fetched_at: "2026-09-01T13:29:10.504Z"
---
On this page

The Glean A2A host lets an Auto mode agent call a registered third-party agent over the open [Agent2Agent (A2A) protocol](https://a2a-protocol.org/). The Glean agent can delegate specialized work to an agent your organization already uses, then incorporate the result into its response.

An administrator registers the external A2A server in Glean. An agent builder can then add the external agent as a subagent. To register a server and add its agent to an Auto mode agent, see [Configure the Glean A2A host](/administration/platform/configure-a2a-host).

## Compare Glean A2A capabilities[​](#compare-glean-a2a-capabilities "Direct link to Compare Glean A2A capabilities")

Glean supports three A2A connection patterns:

| Capability | Direction | Use it to |
| --- | --- | --- |
| **A2A host** | Glean Auto mode agent → third-party agent | Delegate work from a Glean agent to an external agent |
| [Glean A2A server](/administration/platform/a2a-server) | External A2A client → Glean Assistant | Use Glean Assistant from another AI platform |
| [Per-agent A2A endpoint](/administration/platform/expose-agents-over-a2a) | External A2A client → individual Glean agent | Run a specific Glean Auto mode agent from an external client |

## How it works[​](#how-it-works "Direct link to How it works")

The A2A host uses the agent card from the external server and the subagent configuration in the Auto mode agent:

-   **Agent discovery**: An administrator registers the base URL for the external server. The server must publish an A2A agent card at `/.well-known/agent-card.json`. Glean reads the card to discover the agent name, description, endpoint, capabilities, and authentication requirements.
-   **Delegation**: An agent builder adds the registered agent under **Sub-agents**. During a run, the Glean agent decides when to call the external agent based on the instructions for the Glean agent and the description of the external agent.
-   **Results**: The external agent returns its result to the parent Glean agent. The parent agent can use that result in later work or include it in its response. If the external agent requests more information, the user can answer and continue the same task.

## Authentication and permissions[​](#authentication-and-permissions "Direct link to Authentication and permissions")

For an external agent that requires authentication, the A2A host supports the OAuth 2.0 authorization code flow:

-   The administrator provides the OAuth client ID and client secret when registering the server
-   Glean derives the authorization URL, token URL, and scopes from the agent card
-   Each person authorizes the external agent separately, so outbound requests use their identity and access
-   Glean stores and refreshes tokens without exposing them to the parent agent

Authorization by an administrator does not authorize other people. If someone opens an agent that uses an external server without first authorizing that server, Glean asks them to connect before they can run the agent.

## Requirements and limitations[​](#requirements-and-limitations "Direct link to Requirements and limitations")

-   Third-party A2A agents can be added to Auto mode agents
-   The external server must support A2A v0.3 and make its agent card reachable from the Glean network
-   Authenticated servers must use the OAuth 2.0 authorization code flow. API keys and OAuth client credentials are not supported
-   A2A messages support text input and output. File and data attachments are not supported

## See also[​](#see-also "Direct link to See also")

-   [Configure the Glean A2A host](/administration/platform/configure-a2a-host)
-   [Glean A2A server](/administration/platform/a2a-server)
-   [Expose Glean agents over A2A](/administration/platform/expose-agents-over-a2a)
-   [Create an Auto mode agent](/agents/auto-mode-agent)
