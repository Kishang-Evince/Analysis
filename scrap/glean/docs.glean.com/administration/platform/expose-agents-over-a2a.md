---
url: "https://docs.glean.com/administration/platform/expose-agents-over-a2a"
canonical: "https://docs.glean.com/administration/platform/expose-agents-over-a2a"
title: "Expose Glean agents over A2A"
description: "In addition to exposing Glean Assistant as a remote agent, you can publish an individual Glean agent over the open Agent2Agent (A2A) protocol. Each eligible agent gets its own agent card and endpoint, so an external A2A client can discover and run that specific agent directly."
fetched_at: "2026-09-01T13:29:12.260Z"
---
On this page

In addition to exposing Glean Assistant as a remote agent, you can publish an individual Glean agent over the open [Agent2Agent (A2A) protocol](https://a2a-protocol.org/). Each eligible agent gets its own agent card and endpoint, so an external A2A client can discover and run that specific agent directly.

Agent owners use the **Share** dialog to set this up, with no **Admin console** changes. This is separate from the [Glean A2A server](/administration/platform/a2a-server), which exposes Glean Assistant as a single remote agent. To let a Glean agent call an external agent in the opposite direction, use the [Glean A2A host](/administration/platform/a2a-host).

## How it works[​](#how-it-works "Direct link to How it works")

Each agent you expose gets its own **agent card** and **JSON-RPC endpoint**:

-   **Agent discovery**: An external A2A client reads the agent card to discover the agent's name, description, endpoint, and authentication requirements. Glean builds the card from the agent's own name and description, and the card's URL points at that agent's endpoint.
-   **Messaging**: The endpoint supports the standard A2A methods `message/send` and `message/stream`, which streams task status updates and the final result over Server-Sent Events.
-   **Multi-turn conversations**: A client continues a session using the A2A `contextId`. If the agent pauses to ask a clarifying question, the task returns the `input_required` state so the client can respond and continue in the same context.

Requests run through the same engine as a normal agent run, so an external client gets the same behavior it would running the agent in Glean.

## Which agents can be exposed[​](#which-agents-can-be-exposed "Direct link to Which agents can be exposed")

The **A2A** option appears in the Share dialog only for eligible agents:

-   **Supported**: published auto mode agents with a **chat message trigger** and **text-only** input and output.
-   **Not supported**: agents that use an input form, scheduled or content-triggered agents, and flow (workflow) agents. Non-text message parts, such as file and data attachments, are ignored.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you expose an agent over A2A, make sure:

-   You're an **owner** or **agent moderator** of the agent, or an admin, with permission to share and publish agents. See [Sharing and permissions](/agents/concepts/sharing-permissions).
-   The agent is **published** and is an auto agent with a chat-message trigger.

## Expose an agent over A2A[​](#expose-an-agent-over-a2a "Direct link to Expose an agent over A2A")

1

Open the Share dialog

In Agent Builder, open the agent and click **Share**.

2

Create a client API token

Create a client API token for the agent. External A2A clients use this token to authenticate, and requests run with the token's Glean permissions.

3

Copy the agent card URL

Copy the agent card URL shown in the dialog. Share it, along with the token, with whoever configures the external A2A client.

## Connect an external A2A client[​](#connect-an-external-a2a-client "Direct link to Connect an external A2A client")

1

Add the agent in the external client

In your A2A client, add a new remote agent using the agent card URL.

2

Configure authentication

Set the client to authenticate with **HTTP bearer** authentication, using the client API token you created.

3

Run the agent

Send a message (`message/send` or `message/stream`) and confirm that the agent responds.

## Authentication and permissions[​](#authentication-and-permissions "Direct link to Authentication and permissions")

-   Authentication uses an **HTTP bearer token** - the per-agent client API token from the Share dialog. This differs from the [Glean A2A server](/administration/platform/a2a-server), which authenticates external platforms through the Glean OAuth authorization server.
-   Requests run with the permissions associated with the token, and the agent only returns content the caller is permitted to access.
-   Access is evaluated per caller. If the caller isn't permitted to use the agent, or the agent isn't eligible, Glean returns a not-found response so the agent's existence isn't revealed.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only published auto agents with a chat-message trigger can be exposed, and only text input and output are supported.
-   File and data attachments in A2A messages are ignored.
-   Each agent card exposes a single agent. To expose Glean Assistant, which can invoke multiple agents your organization has enabled, use the [Glean A2A server](/administration/platform/a2a-server) instead.

## See also[​](#see-also "Direct link to See also")

-   [Glean A2A server](/administration/platform/a2a-server)
-   [Configure the Glean A2A server](/administration/platform/configure-a2a)
-   [Glean A2A host](/administration/platform/a2a-host)
-   [Configure the Glean A2A host](/administration/platform/configure-a2a-host)
-   [Sharing and permissions](/agents/concepts/sharing-permissions)
