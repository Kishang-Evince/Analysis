---
url: "https://docs.glean.com/tools/glean/respond"
canonical: "https://docs.glean.com/tools/glean/respond"
title: "Respond"
description: "Reason over the agent's memory and produce a text response shown to the user, with selectable Factual, Balanced, or Creative styles."
fetched_at: "2026-09-01T13:30:07.575Z"
---
On this page

The Respond step follows your instructions to perform reasoning on the contents of the agent’s memory and create a text response that is shown to the user of the agent. The response is also added to the agent’s memory so that later steps can reference it to help accomplish the agent’s objective. Use the Respond step any time you want the user of an agent to see the agent’s output on the screen.

It is important to include a Respond step immediately before write tools like Draft Gmail, Create a Google Doc, and others. This allows the tools to use exactly the content you specify in order to perform their write operations.

## Configuration[​](#configuration "Direct link to Configuration")

In addition to the natural language Task instructions which inform the reasoning performed by the Respond step, you can also modify the Response style. Response style has three options: Factual, Balanced, and Creative.

### Factual (default)[​](#factual-default "Direct link to Factual (default)")

Minimizes "randomness" in LLM responses

-   Example use cases:
    -   Information retrieval
    -   Data analysis

### Balanced[​](#balanced "Direct link to Balanced")

Provides accurate but flexible responses

-   Example use cases:
    -   Report generation
    -   Draft messaging with data

### Creative[​](#creative "Direct link to Creative")

-   Provides diverse, expressive responses
-   Example use cases:
    -   Brainstorming
    -   Marketing content generation
