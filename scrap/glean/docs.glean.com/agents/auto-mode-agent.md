---
url: "https://docs.glean.com/agents/auto-mode-agent"
canonical: "https://docs.glean.com/agents/auto-mode-agent"
title: "Create agents with Auto mode"
description: "Build Auto mode agents by describing the job in natural language, then refine, test, and share the draft in Agent Builder."
fetched_at: "2026-09-01T13:29:16.033Z"
---
On this page

Glean provides two distinct modes for building agents, allowing you to choose between AI-driven automation and manual precision. Whether you need to deploy a flexible researcher in minutes or design a rigid, rules-based process, Glean adapts to your specific operational requirements.

*Auto mode* is the most efficient way to transform an idea into a functional agent. By describing your objective in natural language, the agentic engine of Glean automatically architectures the logic, selects the necessary tools, and generates a refined draft for you.

-   Speed to value: Skip manual configuration and move straight to testing and refinement.
-   Dynamic execution: Ideal for fluid tasks like multi-source research, complex data analysis, and cross-tool drafting.
-   Collaborative refining: Use the generated draft as a foundation, then fine-tune the steps inside the **Agent Builder** to meet your exact standards.

While Auto mode prioritizes speed and flexibility, *workflow mode* is built for scenarios where predictability is paramount. Use this mode for processes that require:

-   Strict determinism: Ensuring the agent follows the exact same sequence every time.
-   Custom logic: Defining complex branching, specific "if/then" scenarios, and rigid hand-offs between tools.
-   Total control: Granular oversight of every individual step within the agent's lifecycle.

**Auto mode** is the most efficient way to transform an idea into a functional agent. By describing your objective in natural language, Glean’s agentic engine automatically architects the logic, selects the necessary tools, and generates a refined draft for you.

### Comparison at a Glance[​](#comparison-at-a-glance "Direct link to Comparison at a Glance")

Use **Auto mode** for open-ended, outcome-oriented tasks such as research, analysis, summarization, and drafting and use **Workflow mode** when you need a fixed, repeatable process with more explicit control over each step.

| Use Auto Mode If... | Use Workflow Mode If... |
| --- | --- |
| You want to build and iterate quickly. | You require a rigid, step-by-step process. |
| The task is open-ended like "Summarize these reports". | The task is rules-based like "If X, then execute Y". |
| You prefer the AI to plan the workflow for you. | You need to manually define every logic branch. |

tip

For most use cases, we suggest starting with **Auto mode**. It provides a high-quality first draft that you can review and test, significantly reducing the time from concept to deployment.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Make sure the following are true:

-   Agents are enabled for your organization.
-   You have permission to create agents.
-   Auto mode is available in your Glean environment.
-   Any connectors, tools, or triggers your agent depends on are already configured for your organization.

## Create an Auto mode agent[​](#create-an-auto-mode-agent "Direct link to Create an Auto mode agent")

1.  In Glean, open the **Agent library**.
2.  Click **Create agent**. Auto mode is selected by default.

![Create auto mode agent](/img/create-auto-mode-agent.png)

3.  Describe what you want the agent to do in the **Builder Assistant**.
4.  Review the draft that Builder Assistant creates.
5.  Refine the instructions, tools, resources, triggers, and settings of the agent.
6.  Run tests in **Preview** and use **Debug** to inspect how the agent behaves.

![Auto mode agent debug and preview options](/img/auto-mode-agent-debug-preview.png)

7.  Click **Save** when you are ready to publish the latest version.

## Start with Builder Assistant[​](#start-with-builder-assistant "Direct link to Start with Builder Assistant")

Builder Assistant is the primary way to create an Auto mode agent.

With Builder Assistant, you can:

-   Describe the agent in natural language.
-   Use a conversation starter to get ideas for what to build
-   Answer follow-up questions so Glean can capture the goal, behavior, and expected output of the agent more accurately.
-   Ask Builder Assistant to refine the draft after the initial version is generated.

The builder uses a flexible three-panel layout which you can hide or resize panels as you work:

![Builder assistant, Instruction, Tools acreen](/img/auto-mode-agent-builder-assistant-3-screen.png)

-   Builder Assistant for describing the job, analyzing debug traces to diagnose and fix issues, answering follow-up questions, and iterating on the draft.
-   **Instructions tab** is where you shape the behavioral policy and output expectations of the agent.
-   **Configuration tabs** for instructions, tools, resources, triggers, and settings.

### Use conversation starters for inspiration[​](#use-conversation-starters-for-inspiration "Direct link to Use conversation starters for inspiration")

Conversation starters help you quickly understand the kinds of agents you can build. They are especially useful if you are new to Agent Builder or you want to explore common patterns before writing your own prompt.

Use a conversation starter as your foundation, then edit it to match your workflow, audience, and connectors.

### Answer clarifying questions[​](#answer-clarifying-questions "Direct link to Answer clarifying questions")

After you describe the agent, Builder Assistant may ask follow-up questions.

These questions help Glean understand details such as:

-   What the agent should do.
-   What it should not do.
-   What inputs it needs.
-   Which systems it should read from or write to.
-   How the final output should be structured.
-   When the agent should run.

The more specific your answers are, the better the first draft usually is.

### Builder Assistant can update more than instructions[​](#builder-assistant-can-update-more-than-instructions "Direct link to Builder Assistant can update more than instructions")

Builder Assistant does more than rewrite prompt text. It can help shape the broader agent configuration, including:

-   Instructions
-   Tools
-   Resources
-   Triggers
-   Settings

This means you can stay in the builder and iteratively shape how the agent behaves without manually rebuilding everything from scratch.

## Review and refine your agent[​](#review-and-refine-your-agent "Direct link to Review and refine your agent")

After Builder Assistant creates a first draft, review the agent configuration in the editor. The builder displays Builder Assistant alongside configuration tabs for instructions, tools, resources, triggers, and settings.

### Instructions[​](#instructions "Direct link to Instructions")

Use the **Instructions** tab to define how the agent should behave. The instructions editor is a markdown-first surface, so you can structure guidance with headings, lists, and emphasis. Instead of filling in rigid fields, write instructions the way you would write an SOP or operating guide for a teammate - for example, `# Goal`, `## Rules`, and `1. Check the request`.

In most cases, the best instructions explain:

-   The job the agent should do
-   The steps or reasoning it should follow
-   The output format it should return
-   Any rules, limitations, or safety constraints it must respect

### Tools[​](#tools "Direct link to Tools")

Use the **Tools** tab to choose which apps and capabilities the agent can use.

Depending on the tool, you may grant access at the app level instead of selecting each tool individually. Limit tool access to only what the agent needs. This improves reliability and makes the agent easier to review.

warning

If the agent uses write tools, confirm that the selected tools match your intended workflow and governance requirements.

#### Grant access at the app level[​](#grant-access-at-the-app-level "Direct link to Grant access at the app level")

For supported apps, Auto mode lets you grant access at the app level instead of selecting individual tools one by one.

For example, you can allow an agent to use apps such as Jira, Slack, Gmail, or Google Docs, and Glean uses the tools it needs within those apps at runtime.

Keep the app list small and practical. Narrow tool access makes agents easier to review and often improves reliability.

### Resources[​](#resources "Direct link to Resources")

Use the **Resources** tab to connect the documents, folders, collections, and other indexed content the agent should rely on.

Add only the sources that are helpful for the task. Narrow, high-quality resources usually perform better than broad, loosely related context.

### Triggers[​](#triggers "Direct link to Triggers")

Use the **Triggers** tab to define when the agent starts. Depending on your configuration, an Auto mode agent can run in these ways:

-   Manual run: Use a manual run when you want a person to start the agent on demand. This is the most common option for agents that support interactive work, such as research, drafting, summarization, or other tasks that begin when a user asks for them.

Choose the input type for manual runs

If the agent runs manually, you can also define what kind of input it accepts.

-   Chat message: Use a chat message when the user should be able to start the agent conversationally. This works best when the request is open-ended or when the user may provide different instructions each time they run the agent.
    
-   Input form: Use an input form when the agent needs structured inputs before it starts. This works best when users must provide specific fields such as a date range, URL, account name, ticket ID, or other required parameters. Choose the trigger and input type that best match how users will start the agent and what information the agent needs to run reliably.
    
-   Scheduled run: Use a scheduled run when you want the agent to run automatically at a defined time. This is useful for recurring work such as weekly summaries, periodic checks, or routine follow-ups.
    
-   Content trigger: Use a content trigger when you want the agent to run automatically when selected content changes. This is useful for workflows that should react to new or updated documents, tickets, records, or other source content.
    

### Model[​](#model "Direct link to Model")

Use the **Model** tab to manage agent-level controls such as reasoning behavior and model selection.

Depending on your environment, you may be able to choose:

-   A **reasoning mode** for the task.
-   The **model** the agent must use.

tip

Use Fast reasoning mode for simpler tasks such as summarization, or straightforward drafting. Thinking mode is recommended for more complex tasks such as multi-step analysis, research, or work that requires deeper reasoning.

If your environment exposes multiple models, choose the one that best matches the task, performance needs, and governance requirements for your organization.

## Test and debug your agent[​](#test-and-debug-your-agent "Direct link to Test and debug your agent")

Before you share the agent, test it in **Preview**.

Preview helps you verify that the agent:

-   Understands the task correctly.
-   Asks for the right inputs.
-   Uses the expected tools and resources.
-   Returns useful output.
-   Behaves safely when information is missing or ambiguous.

### Use test runs to iterate[​](#use-test-runs-to-iterate "Direct link to Use test runs to iterate")

Run the agent with realistic prompts and inputs. After each run, review the result and refine the configuration until the behavior matches your intent.

### Use Debug to inspect traces[​](#use-debug-to-inspect-traces "Direct link to Use Debug to inspect traces")

Connect the files, folders, collections, or connectors the agent should rely on. Auto mode may propose knowledge sources, although you choose which ones to include.

**Debug** helps you understand how the agent reached its result. It gives you step-by-step visibility into how the agent ran, which is especially useful when the agent works across multiple systems or when you need to understand why a run produced unexpected output.

After reviewing a run, you can use **Builder Assistant** to test again, investigate trace details, and refine the agent to address issues revealed during debugging.

Depending on the run, you can inspect details such as:

-   The path the agent took.
-   Tool calls.
-   Prompts and intermediate steps.
-   Run traces and execution details.
-   Context-window usage for model calls.

### Review context-window usage[​](#review-context-window-usage "Direct link to Review context-window usage")

Use this information to understand how much context the run is consuming and whether the agent may be approaching truncation limits.

-   Reference authoritative sources whenever possible
-   Keep the tool set focused
-   Test in both Fast mode and Thinking mode if available and compare performance
-   Validate the agent with multiple types of tasks before saving
-   If the agent appears to stall, try reducing the knowledge scope, simplifying the instructions, or starting in Fast mode before switching to Thinking mode
-   Review the run trace to identify which step is causing delays or errors

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

For common issues with agents, including timeout errors, inconsistent outputs, and content access problems, see [Troubleshoot agents](/agents/troubleshooting).

-   Narrow the resources available to the agent.
-   Simplify or shorten instructions.
-   Remove tools the agent doesn't need.
-   Use a different reasoning mode or model if available.
-   Prompt the Builder Assistant to make modifications based on your desired output or changes.

### Ask Builder Assistant questions while you build[​](#ask-builder-assistant-questions-while-you-build "Direct link to Ask Builder Assistant questions while you build")

You can ask Builder Assistant questions about how specific configurations work, including tools, triggers, and other agent settings.

For example, you can ask what a trigger does, when to use a particular tool, or how a configuration behaves.

These questions help builders learn the product while staying inside Agent Builder. Asking a question does not update the agent unless you explicitly ask Builder Assistant to make a change.

### Open Preview in a new tab[​](#open-preview-in-a-new-tab "Direct link to Open Preview in a new tab")

Use **Preview in new tab** to test the agent in a larger, end-user-style view that more closely matches the live experience. This is useful for validating how the agent feels outside the builder and for testing longer conversations or richer outputs.

![Open preview in new tab](/img/auto-mode-agent-preview-in-new-tab.png)

## Add skills and subagents[​](#add-skills-and-subagents "Direct link to Add skills and subagents")

You can add **skills** and **subagents** to extend what the agent can do.

### Reuse skills in auto mode agents[​](#reuse-skills-in-auto-mode-agents "Direct link to Reuse skills in auto mode agents")

Auto mode agents can reuse Glean skills, so you can apply the same task-specific guidance in an agent that you already use in Glean Assistant.

Use skills when you want an agent to follow a consistent approach for a specific task, such as applying a review checklist, following a research workflow, or producing output in a standard format.

To add a skill to an auto mode agent:

1.  Open the agent in the builder.
2.  In the skills section, add the skills the agent must be able to use.
3.  Save or publish the agent.

When the agent runs, it can use those skills together with the instructions, tools, and resources of the agent.

info

If you don't see skills in the builder, check whether Glean skills is enabled for your organization and whether you have access to any skills.

### Reuse subagents in auto mode agents[​](#reuse-subagents-in-auto-mode-agents "Direct link to Reuse subagents in auto mode agents")

Auto mode agents can reuse existing Glean library agents and registered third-party A2A agents as subagents. This lets you break a larger workflow into smaller, specialized units or delegate work to an external agent your organization already uses.

For example, a main agent might:

1.  Gather context from multiple systems.
2.  Call one or more specialized subagents to analyze the information.
3.  Return a final summary or recommendation.

To add a subagent to an Auto mode agent:

1.  Open the agent in **Agent builder** and select **Tools**.
2.  Under **Sub-agents**, click the add button and select **Use existing agent**.
3.  Find the agent and click **Add to list**. To show registered external agents, select **View all → Third-party**.
4.  Save or publish the agent.

When the agent runs, it can delegate parts of the workflow to those subagents.

An administrator must register an external A2A server before its agent appears in the picker. See [Configure the Glean A2A host](/administration/platform/configure-a2a-host).

### Delegate work dynamically[​](#delegate-work-dynamically "Direct link to Delegate work dynamically")

Supported Auto mode agents can also use the **Task** tool to break a complex, multi-step request into smaller sub-tasks and delegate them to independent sub-agents at run time. This differs from adding library agents in advance: the agent can route work to sub-agents as it processes the request.

Dynamic delegation is useful for multi-step and research-heavy requests. The parent agent uses the returned results to continue the workflow, complete follow-up steps, or prepare the final response. The Task tool preserves the agent's permissions and error-handling behavior.

Glean enables this capability by default for supported Auto mode agents. To require dynamic delegation, specify in the agent's instructions that it must use the **Task** tool.

## Save and share your agent[​](#save-and-share-your-agent "Direct link to Save and share your agent")

When you are ready, click **Save**.

Saving makes the latest version available based on the sharing settings you choose. Before sharing broadly, confirm the following:

-   The name clearly describes the agent.
-   The description explains what it does.
-   The conversation starters are useful.
-   The tools and resources are scoped correctly.
-   The trigger behavior is correct.
-   The agent is tested in Preview.

If you share an agent without a description, Glean may suggest an icon and AI-generated description that you can review before sharing.

If an agent is **Verified**, that status appears as a badge next to the agent name. Verified status is not a setting you edit in the builder.

## Additional auto mode capabilities[​](#additional-auto-mode-capabilities "Direct link to Additional auto mode capabilities")

Depending on your environment, Auto mode can support additional capabilities beyond text-based chat runs.

### Artifacts[​](#artifacts "Direct link to Artifacts")

Auto mode agents can generate artifacts by default. When a task calls for a richer output than a plain chat response, the agent can produce formatted content such as documents, spreadsheets, slides, or interactive HTML directly in the conversation.

Artifacts are used when a matching write tool is not available. For example, if the agent has a **Send Slack message** or **Create Google Doc** tool configured, those tools take priority by default. However, users can explicitly instruct the agent to give artifacts precedence if their use case requires it.

Supported artifact types match the types enabled in Assistant. Example use cases include drafting outreach emails, call scripts, rich visualizations, and rendering large data sets outside the chat surface.

### Native image generation[​](#native-image-generation "Direct link to Native image generation")

Auto mode agents can generate images as part of their output.

Image generation follows the eligibility, quota, and safety controls configured in your environment. If image generation is unavailable for a run, the agent may fall back to text output.

### Sandboxed code execution[​](#sandboxed-code-execution "Direct link to Sandboxed code execution")

For more advanced tasks, Auto mode can use sandboxed execution and dynamic context handling as part of the broader agent runtime.

These capabilities help with tasks such as research, analysis, and other workflows that benefit from intermediate computation or structured processing.

## Create a workflow agent instead[​](#create-a-workflow-agent-instead "Direct link to Create a workflow agent instead")

Workflow agents remain fully supported.

Use a workflow agent when you need more explicit control over the flow, including structured steps, precise branching, or deterministic execution.

There are two common ways to get to the workflow agent path:

-   Click the **arrow** near the **Create agent** button in the **Agent library**.
    
    ![The create workflow agent option from the downward arrow](/img/create-workflow-agent-arrow.png)
    
-   From the **Build a workflow agent** banner on the first Auto mode screen.
    
    ![The create workflow agent option available in the Builder Assistant](/img/create-wf-agent-fromauto-mode-agent.png)
    

note

Auto mode is now the default starting point when you create an agent. Workflow is a secondary path for builders who want manual control.

To have Glean draft a structured workflow from your description, see [Create a Workflow agent using natural language](/agents/create-agent-natural-language).

### Try an existing workflow agent in Auto mode[​](#try-an-existing-workflow-agent-in-auto-mode "Direct link to Try an existing workflow agent in Auto mode")

If you want to explore a more flexible version of an existing workflow agent, use **Try in auto mode** to create a new Auto mode draft based on that workflow.

This action does not replace the original workflow agent. The original workflow remains unchanged, so you can safely compare behavior, test the Auto mode draft, and decide which version to keep.

Changes do not sync automatically between the workflow agent and the new Auto mode draft. There is no automatic reverse conversion from Auto mode back to workflow mode.

## FAQ[​](#faq "Direct link to FAQ")

### Does Auto mode replace workflow agents?

No. Auto mode and workflow agents both remain available. Auto mode is usually faster to start with, while workflow agents provide more explicit control.

### Can I convert a workflow agent to Auto mode?

You can use **Try in auto mode** to create a new Auto mode draft based on an existing workflow agent. This does not replace the original workflow agent, and changes do not sync automatically between the two.

### Can Builder Assistant update the agent for me?

Yes. Builder Assistant can help create and refine the draft. It can shape instructions and other parts of the configuration, depending on what you ask it to change.

### Can I ask Builder Assistant questions without changing the agent?

Yes. If you ask a product or configuration question, Builder Assistant can explain how settings such as tools, triggers, or tools work. This does not change the agent unless you explicitly ask for an update.

### Can Auto mode agents use external tools?

Yes. In Auto mode, you can grant access to supported apps and capabilities in the **Tools** tab. For some apps, access is granted at the app level rather than by selecting each tool individually. Runtime permissions, confirmation requirements, and governance controls still apply.

### How do scheduled triggers work?

Scheduled triggers let an agent run automatically on a cadence that you define. Depending on your environment, schedule settings can include frequency, time, timezone, and schedule management controls.

### How do content triggers work?

Content triggers let an agent run automatically when connected content or systems change. Availability depends on your environment and rollout state. Supported trigger sources can include apps such as Jira, Salesforce, Gong, Gmail, and Google Calendar.

### Can I test the agent before sharing it?

Yes. Use **Preview** to run the agent and **Debug** to inspect traces, tool calls, and other execution details before saving or sharing it.

### What should I try if the agent stalls or returns low-quality results?

Start by reviewing the test run in **Debug**. Then try narrowing the resources available to the agent, simplifying or shortening the instructions, removing tools the agent does not need, checking whether the selected trigger type matches the workflow, reviewing context-window usage if shown in the trace, and re-testing with a simpler prompt or a more focused input.

### Can I reuse an existing skill or library agent as a subagent?

Yes. You can add existing skills and library agents to your auto mode agent in the builder. Changes to the underlying skills or agents may impact the agents that use them.

### Can auto mode agents generate artifacts?

Yes. Artifacts are enabled by default for Auto mode agents. When a richer output format is more useful than a plain chat response, the agent can produce artifacts such as formatted documents, spreadsheets, or interactive HTML. Artifacts are used when a matching write action is not available. Supported artifact types match the types enabled in Assistant.

### Does Auto mode change what data the agent can access?

No. The agent always runs with the permissions of the current user.
