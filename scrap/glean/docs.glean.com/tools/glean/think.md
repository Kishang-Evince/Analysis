---
url: "https://docs.glean.com/tools/glean/think"
canonical: "https://docs.glean.com/tools/glean/think"
title: "Think"
description: "Perform intermediate reasoning over the agent's memory to support later steps, without showing the output to the user."
fetched_at: "2026-09-01T13:30:07.966Z"
---
On this page

The Think step follows your instructions to perform reasoning on the contents of the agent’s memory. When it runs, the Think step processes your instructions and generates text that represents its reasoning. This text is not shown to the user, but it is added to the agent’s memory so that later steps can reference it to help accomplish the agent’s objective. It operates similarly to “Chain of Thought” prompting, a technique where providing an agent with intermediate reasoning steps can allow it to perform more complex tasks.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

The Think step can be useful for processing information retrieved by the agent before generating a response. For example, you can use it to extract specific pieces of information from documents previously read into the agent’s memory in order to use that specific information in later steps:

## Configuration[​](#configuration "Direct link to Configuration")

In addition to the natural language Task instructions which inform the reasoning performed by the Think step, you can also modify the Response style. Response style has three options: Factual, Balanced, and Creative.

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
