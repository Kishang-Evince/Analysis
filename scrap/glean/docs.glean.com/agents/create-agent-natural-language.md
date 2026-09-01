---
url: "https://docs.glean.com/agents/create-agent-natural-language"
canonical: "https://docs.glean.com/agents/create-agent-natural-language"
title: "Create a Workflow agent using natural language"
description: "Describe a structured workflow in natural language and let Glean generate the initial steps in Workflow mode."
fetched_at: "2026-09-01T13:29:16.610Z"
---
On this page

This approach lets you describe a structured workflow in plain language and have Agent Builder generate the initial steps. You can then refine the workflow using natural-language instructions or manual editing.

note

This page describes **Workflow mode**. When you select **Create agent**, Glean opens Auto mode by default. For the recommended starting experience, see [Create agents with Auto mode](/agents/auto-mode-agent).

## Create your workflow agent[​](#create-your-workflow-agent "Direct link to Create your workflow agent")

1.  Navigate to the [Agent Library](https://app.glean.com/chat/agents).
2.  Enter Workflow mode using either of these options:
    -   Select the arrow next to **Create agent**, then select the option to create a Workflow agent.
    -   Select **Create agent**, then select **Build a workflow agent** from the Auto mode starting screen.
3.  Enter your instructions in the in the description box:
    -   Describe the steps this agent must follow to complete this task and specify the required format for the final output.
    -   If you would like the agent to use the knowledge from a specific document that is indexed by Glean, you can either enter the document's URL or tag it using '@'.
    -   You can specify input fields by enclosing them in double brackets (e.g. "Summarize the \[\[Zendesk ticket\]\]").
4.  The Agent Builder will automatically generate your agent's steps based on your instructions.

## Example instructions[​](#example-instructions "Direct link to Example instructions")

Create a task based agent that asks the user to enter a Jira ticket and then suggests how to resolve the ticket using the contents of relevant playbooks:

```
Suggest how to resolve the eng oncall issue in [[Jira ticket]]* Search for playbooks that are related to the content of the ticket* Think about which playbook is most relevant to the ticket* Read the full content of that playbook and summarize how to resolve the ticket
```

Create a conversational agent that answers questions using past user research studies:

```
Create a chatbot that answers questions about user research studies using these documents:<URL of user research report 1><URL of user research report 2><URL of user research report 3>
```

## Refine your agent[​](#refine-your-agent "Direct link to Refine your agent")

After the initial draft is generated, you have multiple options for refining your agent:

-   **Continue with natural language**: Click "**Open panel**" in the upper left corner to access the natural language panel and provide additional instructions to modify your agent's steps.
-   **Manual editing**: Switch to manual editing at any time to make precise changes to individual steps, models, triggers, or configurations.
-   **Enhance prompts**: Use the [Enhance prompt](/agents/concepts/agent-builder#enhance-prompt) feature on individual steps to apply best practices and improve instruction quality.

You can freely switch between these approaches throughout the building process, using whichever method is most efficient for the changes you want to make.
