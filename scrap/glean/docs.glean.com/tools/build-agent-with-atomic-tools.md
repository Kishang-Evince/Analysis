---
url: "https://docs.glean.com/tools/build-agent-with-atomic-tools"
canonical: "https://docs.glean.com/tools/build-agent-with-atomic-tools"
title: "Build agents with atomic tools"
description: "Learn how to design reliable, static workflow agents using tools for tools like Confluence, Salesforce, GitHub, Jira, and Google Calendar."
fetched_at: "2026-09-01T13:29:58.768Z"
---
On this page

The tools library of Glean focused on composite tools (workflow tools) that completed an end-to-end workflow in a single step, for example, *Create Jira issue and link current page*. With some tools, Glean now exposes smaller, more granular operations that you chain together to achieve richer and more flexible workflows across tools like Confluence, Salesforce, GitHub, Jira, and Google Calendar.

This section explains common challenges, recommended patterns, and design tips for *static workflow agents* so your agents are reliable, debuggable, and easier to maintain over time.

note

These guidelines apply primarily to *static workflow agents* where you explicitly define each step. In *Assistant*, *natural-language agent*, and *plan and execute* flows, the agentic planning and looping engine of Glean automatically chains tools and retries until outcomes are met, so many of these concerns are handled for you.

## Use Glean Assistant and Autonomous agents to plan and run tools automatically[​](#use-glean-assistant-and-autonomous-agents-to-plan-and-run-tools-automatically "Direct link to Use Glean Assistant and Autonomous agents to plan and run tools automatically")

If you are building agents for non-technical subject matter experts or broad end-user audiences, prefer experiences where Glean handles chaining and retries for you:

-   *Glean Assistant:* For guided, conversational workflows.
-   *Autonomous agents:* For goal-directed, multi-step execution with minimal human intervention.
-   *Plan and execute flows:* A structural approach that combines planning with execution oversight.

In these recommended modes, the agentic planner of Glean assumes responsibility for the complex orchestration details:

-   Planning: Determining the sequence of tools required to achieve the goal.
    
-   Execution: Running the sequence of tools.
    
-   Control flow: Looping and branching until the goal conditions are met.
    
-   Resilience: Handling transient failures and automatic retries.
    

This means you do not need to encode every orchestration detail yourself, resulting in faster development and more robust agents for general users.

The static patterns (fixed sequences or manual tool calls) are most useful when you need fine-grained, explicit control over the exact sequence of calls and parameters for highly specialized or constrained workflows.

## General guidelines for static workflow agents[​](#general-guidelines-for-static-workflow-agents "Direct link to General guidelines for static workflow agents")

The principles below apply to static workflow agents in general and not only to those using tools.

| Principle | Tool behavior | How to build agents | Example |
| --- | --- | --- | --- |
| Write tool output is not available for downstream steps in interactive agents | In interactive agents, write tools are often suggested after the main workflow completes, and their execution may not be part of the conversation history used for subsequent steps. | If you need a write tool to run inline as part of the workflow so later steps can depend on its result, configure the step to *run without user confirmation* where appropriate, or use a *scheduled/background agent* that can execute the write step directly. | You want an agent that *creates a Salesforce Lead* and then *logs the new lead in a Google Sheet*. To run the create-lead tool inline rather than as a post-run suggestion, enable the setting to **Allow this tool to be run without user confirmation** so the tool executes during the workflow and its outputs are available to subsequent steps. |
| Bulk operations require looping | Most tools operate on a *single record* at a time, for example, one document, one ticket, one item. | Use the *looping* capability of the agent builder to apply the same tool across many records. Inside the loop, add the tools that must run for each item in the collection (each row, record, or result). | You want to *create multiple Salesforce Leads from a Google Sheet*. Configure the agent to loop over each row and, within the loop, call the *Create lead* tool so each row becomes a separate lead. |
| Error-aware retries are not automatic | When a tool fails and a user retries, the LLM does not automatically learn from prior errors or adjust parameters unless you explicitly change the instructions or the inputs. | Treat tool errors as *feedback for your agent design*. Update your step instructions and parameter handling so the agent avoids known failure modes, rather than relying on repeated retries with the same configuration. | *Confluence*: When updating a blog post that requires a *version number bump*, the LLM may miscalculate the new version. Instead of retrying blindly, update the instructions to explicitly compute and *set version = previous version + 1*, and test this behavior on a sample page. |
| LLMs can confuse similar inputs in form-based agents | When an agent collects multiple, similar inputs from users, for example, several dates or IDs, the model may mix them up or reuse the wrong value across parameters. | Write *explicit instructions* telling the agent which inputs to use for which fields, and for advanced users manage step memory to *exclude unused or misleading inputs* from the context where they are not needed. | You build an agent that *searches and reschedules a calendar event from day 1 to day 2* based on available free slots. Without clear guidance, the LLM may accidentally search on the *target date* instead of the *original date*. Add instructions specifying that the search step must always use the original date and that the reschedule step should use the new date. |

## Additional best practices[​](#additional-best-practices "Direct link to Additional best practices")

### Harden agents through preview and iteration[​](#harden-agents-through-preview-and-iteration "Direct link to Harden agents through preview and iteration")

Building reliable end-to-end agents with atomic tools typically requires several rounds of testing and refinement.

-   Run the agent with a wide range of realistic inputs and review errors carefully. Update instructions, step ordering, and parameter configurations based on what you see.
-   Use preview modes in the builder to quickly validate each step and ensure that intermediate reads and writes behave as expected before you save and share more broadly.

### Review fields for write tools[​](#review-fields-for-write-tools "Direct link to Review fields for write tools")

When an agent invokes a write tool, Glean surfaces the most useful fields for users to review and confirm before applying changes.

### Scheduled vs. interactive agents[​](#scheduled-vs-interactive-agents "Direct link to Scheduled vs. interactive agents")

Not all tools are supported in scheduled or background agents.

-   If a tool is not allowed in scheduled agents, you can usually still use it in *interactive runs* by disabling scheduled-agent-only settings for that workflow.
-   For agents that must run tools that are *explicitly allowed* in scheduled contexts and avoid patterns that require inline human review.

## Key challenges and patterns for atomic tools[​](#key-challenges-and-patterns-for-atomic-tools "Direct link to Key challenges and patterns for atomic tools")

For static workflow agents that rely on atomic tools, the following are the patterns and pitfalls.

| Challenge | Tool behavior | How to build agents | Example |
| --- | --- | --- | --- |
| Tools are atomic | Some tools only complete a small part of a workflow. Multiple tools must be chained together to get to a complete outcome. | Design end-to-end workflows by chaining read and write tools explicitly, then iterate using preview runs. Use errors during testing to harden your flow and refine the instructions for each step. | *Confluence*: Creating a page requires a `spaceId`, not just the human-readable space name. If you only add a *Create page* tool and run the agent in preview, you will see an error that the space ID is invalid or empty. Add a *Get spaces* tool before *Create page* to fetch the correct space ID. *Salesforce*: Updating a Lead requires the `Lead ID`. If you call an update tool directly, you will see an error that the Lead ID is not available. Add a *Get leads* tool first so the agent can select and pass the Lead ID into the update step. |
| Use tools to complement native index of Glean | The native connector index might not have all fields or the most recent values you need for end-to-end workflows, and indexed data can be slightly stale compared to the source system. | Use *read tools* to fetch *live data and identifiers* that are missing or out of date in the index—especially IDs, status fields, and other frequently changing attributes. | *Jira*: Use a Jira read tool in your agent to fetch live Atlassian IDs, project keys, or other identifiers before calling write tools that depend on those values. |
| Broad read tools | Some read tools return broad or unfiltered datasets rather than a single, narrow record. | It is acceptable to use *broad read tools* if you follow them with a *think step* or intermediate reasoning step that narrows down the results to the exact record you need. | *Confluence*: There may not be a direct tool that returns a single space by name. Instead, use a tool to *get all spaces*, then add a think step that selects the right space ID for the target name before calling downstream tools. |
| Variability in AI-predicted inputs | Atomic tools often expose many inputs. When the LLM predicts values for multiple parameters, small variations can compound and increase the chance of incorrect or malformed inputs. | Be as explicit as possible in your step instructions. Use: clear parameter expectations, think steps\*, and features like *enhance instructions* (where available). For complex flows, use the best available LLM model to reduce variability in parameter prediction. | *Google Calendar*: When creating an event, the LLM may infer the timezone of the user from their location but occasionally choose the wrong timezone or an invalid format. Using a stronger model and clearer instructions, for example, \*Always schedule in the primary calendar timezone of the user can significantly reduce these issues. |
| (Advanced) Tweak parameters for narrow-scope agents | By default, all inputs for a tool are predicted by AI. In narrow or highly repeatable workflows, letting the LLM decide every field can introduce unnecessary variability. | For narrow-scope or repetitive agents, fix non-variable inputs or disable AI prediction for parameters that never change. This reduces noise and makes the workflow more predictable. | *Confluence*: If your agent always creates a blog post in the same engineering space, configure the tool to hard-code the space ID instead of letting the LLM choose it dynamically. This removes an entire class of potential errors. |
