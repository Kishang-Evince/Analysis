---
url: "https://docs.glean.com/tools/glean/code-writer"
canonical: "https://docs.glean.com/tools/glean/code-writer"
title: "Code Writer"
description: "Learn how to use the Code Writer tool to propose and apply code changes in GitHub or Bitbucket Cloud"
fetched_at: "2026-09-01T13:30:07.103Z"
---
On this page

The Code Writer tool lets your agent propose and apply code changes in a connected GitHub or Bitbucket Cloud repository by creating or updating pull requests. Use it when you want agents to automate code edits as part of a workflow, while still keeping human review and merge in your source control system.

When you add Code Writer to an agent, the agent can:

-   Read context from earlier steps (tickets, logs, stack traces, code search results).
-   Plan a targeted change.
-   Open a draft pull request in the right repository and branch.
-   Return the pull request URL and a summary to later steps in the workflow.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

### Jira bug‑fix agent[​](#jira-bugfix-agent "Direct link to Jira bug‑fix agent")

Use Code Writer to automatically propose a fix when a bug ticket arrives.

#### Example flow[​](#example-flow "Direct link to Example flow")

1.  **Trigger**: Jira issue created or updated.
    
2.  **Steps**:
    
    -   Read the Jira issue summary and description.
    -   Optional: use code search to find relevant files.
    -   Code Writer: generate a fix and open a draft pull request.
    -   Respond with the pull request URL in Glean or post it back to Jira or Slack.

#### What Code Writer does here[​](#what-code-writer-does-here "Direct link to What Code Writer does here")

-   Uses the issue text and any attached context from earlier steps as instructions.
-   Targets the configured repository and branch.
-   Returns the draft pull request link and a short summary to downstream steps.

### Escalation channel helper[​](#escalation-channel-helper "Direct link to Escalation channel helper")

Use Code Writer in an incident or escalation channel workflow to propose quick fixes.

#### Example flow[​](#example-flow-1 "Direct link to Example flow")

1.  **Trigger**: message posted in a specific Slack escalation channel.
    
2.  **Steps**:
    
    -   Read the message and any attached logs or stack traces.
    -   Optional: run code search based on the error.
    -   Code Writer: propose a fix as a draft pull request.
    -   Post the pull request URL and summary in the channel for engineers to review.

#### What Code Writer does here[​](#what-code-writer-does-here-1 "Direct link to What Code Writer does here")

-   Uses the message text and any attached logs or stack traces as instructions.
-   Targets the configured repository and branch.
-   Returns the draft pull request link and a short summary to downstream steps.

## Configuration[​](#configuration "Direct link to Configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   The Code Writer feature is enabled and configured by an admin.
-   A connector is connected and indexing the repositories where the agent will propose changes:
    -   For GitHub, the GitHub connector and the Glean GitHub App must be installed with read/write access to the relevant repositories. See [GitHub tools setup](/administration/tools/setup-tools/github-tools-setup) for installation instructions.
    -   For Bitbucket Cloud, the Bitbucket connector and a **Code generation (Bitbucket)** configuration are required.
-   The Code Writer tool is configured in the **Admin console**.
-   Access to Code Writer is granted to you or your group in the tools settings.

For provider-specific setup instructions, see [Code Writer tools setup](/administration/tools/setup-tools/code-writer-tools-setup).

### Provider support[​](#provider-support "Direct link to Provider support")

| Provider | Tool template | Authentication | Availability |
| --- | --- | --- | --- |
| GitHub | Code generation (GitHub) | Central OAuth | Available |
| Bitbucket Cloud | Code generation (Bitbucket) | Custom OAuth | Beta |

For Bitbucket Cloud, each user authenticates the tool on first use. The OAuth credentials refresh automatically afterward.

caution

**Note:** Code Writer can only be used when the agent is in **Thinking mode** (via a [Think](/tools/glean/think) step). Code Writer is not available directly from Respond steps or normal chat without entering Think mode.

1.  Open **Agent builder** and select the agent you want to edit.
2.  Choose the step after you have collected enough context (for example, after reading a Jira issue, logs, or running code search).
3.  Click **Add step**.
4.  In **Select step**, go to **Tools → By connector** and select the code generation tool for your provider:
    -   For GitHub: **GitHub / Code generation → Code Writer**
    -   For Bitbucket Cloud: **Bitbucket / Code generation → Code Writer**

You should now see the Code Writer step in your workflow.

### Configure step inputs[​](#configure-step-inputs "Direct link to Configure step inputs")

In the Code Writer step, configure:

-   **Instructions**
    
    Describe what you want Code Writer to do, in plain language. For example:
    
    -   "Propose a fix that resolves the bug described in the `issue_description` field."
    -   "Update the function documented in `stack_trace` so it handles null inputs gracefully."
    
    You can reference values from earlier steps or fields using the agent's expression syntax.
    
-   **Target repository and branch**
    
    -   Choose or map the repository where Code Writer should open a pull request.
    -   Select or map the branch to base the work on (for example, a staging branch).
    
    These may be constant for the agent, or come from fields (such as a Jira custom field that names the repo).
    
-   **Additional context (optional)**
    
    Depending on your design, you can pass:
    
    -   Ticket titles and descriptions.
    -   Stack traces or logs.
    -   File paths, function names, or code snippets from Read or code search steps.
    -   User‑provided fields, such as a "change description".

Give Code Writer enough detail to keep the change small and focused.

### Outputs available to later steps[​](#outputs-available-to-later-steps "Direct link to Outputs available to later steps")

After Code Writer runs successfully, it returns:

-   **Pull request URL**: link to the draft pull request.
-   **Summary**: a short description of what changed (if configured).
-   **Status information**: whether the operation succeeded or failed.

You can use these outputs to:

-   Respond to the user in Glean with a link and explanation.
-   Post the pull request URL back to Jira or Slack.
-   Trigger follow‑up checks or notifications.

Check the step output schema in **Agent builder** for the exact field names available in your environment.

## Best practices[​](#best-practices "Direct link to Best practices")

-   **Keep changes small**
    
    Use instructions that focus on a fix or a narrow update, rather than broad refactors.
    
-   **Insert human‑in‑the‑loop steps**
    
    Combine Code Writer with a "wait for user input" or review step where appropriate.
    
-   **Use upstream context**
    
    Feed Code Writer with structured context from earlier steps (tickets, logs, code search results) rather than pasting long free‑form prompts into the step configuration.
    
-   **Handle errors gracefully**
    
    Plan how your agent should respond when:
    
    -   The pull request cannot be created.
    -   The user does not have permission on the target repository.

By combining Code Writer with triggers, tools, and human‑in‑the‑loop steps, you can build agents that automate repetitive engineering work while keeping code review and deployment under your team's control.
