---
url: "https://docs.glean.com/agents/concepts/triggers"
canonical: "https://docs.glean.com/agents/concepts/triggers"
title: "Types of agent triggers"
description: "Learn how chat, form, and content triggers start Glean Agents and supply their initial input."
fetched_at: "2026-09-01T13:29:16.648Z"
---
On this page

In Glean Agents, a *trigger* is how you choose what starts an agent and what information it receives up front. Triggers define the experience for people running the agent-whether they type a message, fill in a form, or the agent runs on its own when something changes in a connected system.

### Chat message trigger[​](#chat-message-trigger "Direct link to Chat message trigger")

Use this to create a conversational agent (aka chatbot) that can respond to a large variety of requests, for example, answer employee questions about company HR policies. This will display a chatbox for the user to enter a freeform message and upload documents.

-   All steps in the agent are automatically presented with the contents of the user’s message along with previous user messages and agent responses from the current chat session.
-   You can optionally specify conversation starters in the chat message trigger. You can also create placeholders in conversation starters using the format \[\[placeholder\]\]. When the user clicks on a conversation starter with placeholders, they are asked to fill in the values for the placeholders before the message is sent to the agent.

### Input form trigger[​](#input-form-trigger "Direct link to Input form trigger")

Use this to create a task based agent that executes a specific workflow, for example, suggest how to resolve a support ticket. This will display a form with the input fields that the agent needs to complete the task.

-   There are 3 possible input field types:
    -   *Text*: freeform text
    -   *Document*: requires the user to either upload a document or enter the URL of a document that is indexed by Glean
    -   *Multiple choice*: presents the user with a set of options to choose from
-   Input fields are not automatically presented to steps in the agent. Instead, you must explicitly tag an input field using the format \[\[input field name\]\] when you want a step to have access to it.

### Content trigger[​](#content-trigger "Direct link to Content trigger")

Use this to run an agent automatically when something changes in a connected tool. The changed content is passed in as \[\[Trigger input\]\].

For supported sources, events, filters, and access controls, see [Content triggers](/agents/concepts/content-trigger).
