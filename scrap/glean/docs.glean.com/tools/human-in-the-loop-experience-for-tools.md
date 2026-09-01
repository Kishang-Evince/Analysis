---
url: "https://docs.glean.com/tools/human-in-the-loop-experience-for-tools"
canonical: "https://docs.glean.com/tools/human-in-the-loop-experience-for-tools"
title: "Human-in-the-loop confirmations for write tools"
description: "Glean Agents pause before write tools so users can review, edit, and approve changes before anything is written."
fetched_at: "2026-09-01T13:30:07.727Z"
---
On this page

With human-in-the-loop confirmations for write tools in the Glean web app, write tools now:

-   Pause before they run, instead of executing immediately.
-   Wait for approval or cancellation before continuing.

This experience:

-   Applies by default to write tools in Agents that run in the Glean web app.
-   Is available only in interactive web app sessions.
-   Excludes *read-only* tools such as search or lookup.
-   Leaves Slack and Microsoft Teams behavior unchanged.

You can still opt specific steps to *Run without user confirmation* when the workflow is safe to auto-run in the web app.

A *write tool* creates or updates data in another system. Examples include:

-   Creating or updating records in Jira, Salesforce, or other apps.
-   Creating documents or spreadsheets.
-   Sending or drafting emails or messages.
-   Pushing code or opening pull requests with tools like *Code Writer*.

note

Human-in-the-loop confirmations apply to the final output of a task. They do not trigger for internal plan and execute steps, where the Agent is thinking or searching for information. If that plan results in a write tool like creating a ticket, the confirmation prompt will still appear before the tool is finalized.

## Experiencing write confirmations[​](#experiencing-write-confirmations "Direct link to Experiencing write confirmations")

When a write step starts in the Glean web app, the experience happens in two phases:

1.  Pause with *allow/deny*
    
    The panel shows:
    
    -   Target app, for example, Jira, Salesforce, Google Drive.
    -   The specific record or resource when known, for example, issue key, opportunity, document, and so on.
    -   A short description of what the agent plans to do.
    
    From this screen, you can:
    
    -   **Allow:** let the agent proceed with the write step.
    -   **Cancel:** stop the write tool and return to the conversation.
2.  Editable preview (for supported tools)
    
    For write tools that support inline editing in the Glean web app, clicking **Allow** opens an editable preview where you can review and update fields or content before the change is saved. For example, you can:
    
    -   Edit fields on a Salesforce record update.
    -   Tweak the text of a Jira comment or description before posting.

note

Some tools do not currently have an inline preview. This includes Google and Microsoft tools that create documents, emails, or spreadsheets. For these, **Allow** runs the tool directly, and you can edit the result in the target app or through Canvas experiences that build on the created content.

## Reviewing batch tools[​](#reviewing-batch-tools "Direct link to Reviewing batch tools")

Certain complex requests generate multiple *write* tools across your connected applications. Instead of processing these individually, Glean consolidates them into a *grouped review*.

For example, a single prompt might ask Glean to:

-   Distribute communications: Send multiple Slack messages or draft several emails.
-   Manage schedules: Create a series of calendar events.
-   Organize tasks: Generate multiple Jira issues or update various records.

Grouped reviews allow you to audit all planned changes in a single view, ensuring you maintain full control over what is executed in external systems.

Grouped reviews streamline multi-step workflows by reducing the friction of approving individual tasks. By centralizing the review process, you can:

-   Increase efficiency: Review several planned changes together rather than one by one.
-   Maintain control: Approve only the tools you want, ensuring no unintended data is sent.
-   Reduce risk: Avoid running incorrect or duplicate writes in external production systems.

### Reviewing tool details[​](#reviewing-tool-details "Direct link to Reviewing tool details")

When a request triggers multiple tools, Glean displays a dedicated preview card for each planned item. Depending on the tool type, these previews typically include:

| Detail | Description |
| --- | --- |
| Destination app | The specific platform, for example, Salesforce, Jira, Outlook where the data will be written. |
| Target identity | The specific channel, recipient, record, or document being modified. |
| Header info | The title, subject line, or summary of the entry. |
| Content body | The full message text, description, or payload of the write tool. |

### Managing pending tools[​](#managing-pending-tools "Direct link to Managing pending tools")

The grouped review interface is designed for granular control. From this view, you can:

-   Audit individually: Scroll through each preview to verify accuracy and context.
-   Selective approval: Approve only specific tools while leaving others pending.
-   Bulk execution: Use **Approve All** to execute the entire set if the plan meets your requirements.
-   Skip/cancel: Explicitly skip tools you do not want to perform.

note

Only tools you explicitly approve are executed. When a write tool requires confirmation, Glean does not run it until you approve it. Actions that an admin has allowed and an Agent creator has configured to run without confirmation can execute without an interactive approval step.

## Approval behavior in the Glean plug-in for Cursor, Claude Code, and Codex[​](#approval-behavior-in-the-glean-plug-in-for-cursor-claude-code-and-codex "Direct link to Approval behavior in the Glean plug-in for Cursor, Claude Code, and Codex")

When a user invokes a write tool through a Glean plug-in, approval behavior depends on the host:

-   **Cursor** uses its native approval prompt for plug-in tool execution.
-   **Codex** uses its native approval prompt for plug-in tool execution.
-   **Claude Code** uses the plug-in's approval flow when confirmation is required.

The top-level `find_skills` and `run_tool` calls are governed by host controls, but the underlying connector write tools, such as creating a Google Doc, are governed by Glean. All connector write tools require user confirmation by default, and Glean continues to ask for confirmation even when Claude Code runs in auto mode or with permissions bypassed.

Users can override the confirmation requirement per application in [app.glean.com](https://app.glean.com) under **Your settings → Connectors**, then selecting the application.

Read-only tools don't require the same confirmation flow as write tools. Tool access permissions and approval requirements are separate controls. A user may have access to a tool but still need to approve a write action.

For plug-in setup, see [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Authentication and connectivity[​](#authentication-and-connectivity "Direct link to Authentication and connectivity")

Some write tools may require an active connection to the target application. If you have not yet authenticated:

1.  Glean prompts you to **Connect** the required app.
2.  After the authentication completes, you are automatically returned to your pending request.

important

Authenticating an app is not an approval. You must still review and manually approve the write tool after the connection is established.

## Example: Project update workflow[​](#example-project-update-workflow "Direct link to Example: Project update workflow")

Imagine an agent that:

1.  Summarizes recent activity.
2.  Drafts a status update in a Google Doc.
3.  Posts the doc link in a Jira epic.

With confirmations enabled in the Glean web app:

1.  The agent drafts the Google Doc and pauses at the *Create Google Doc* step.
2.  You review the planned write. For supported tools, you can edit the title or body, then click **Allow**.
3.  The agent uses the new doc URL to prepare the Jira comment.
4.  You review the Jira update and approve the second write.

## Controls for agent creators[​](#controls-for-agent-creators "Direct link to Controls for agent creators")

### Default behavior for write steps[​](#default-behavior-for-write-steps "Direct link to Default behavior for write steps")

For interactive agents in the Glean web app, write steps:

-   Pause before every write.
-   Show a confirmation panel with the target app and planned change.
-   Pass write outputs to later steps (IDs, URLs, status fields).

### Run without user confirmation[​](#run-without-user-confirmation "Direct link to Run without user confirmation")

Use **Run without user confirmation** only for safe, repeatable steps in **interactive** agents:

1.  Open the write step in Agent Builder.
2.  Enable **Run without user confirmation**.
3.  Test inputs and parameters in a controlled environment.

When enabled for an interactive agent, the tool runs immediately in the Glean web app without showing a confirmation panel. Use this only when you’re confident about the scope and impact of the write step.

## Tool and MCP confirmation defaults[​](#tool-and-mcp-confirmation-defaults "Direct link to Tool and MCP confirmation defaults")

By default, newly added execution tools and Model Context Protocol (MCP) write tools are eligible for execution without user confirmation.

note

Setting a tool's default to *eligible* does not automatically bypass user confirmation in published Agents. Execution without confirmation requires explicit configuration at both the admin level and the agent builder level.

### Key rules and behavior[​](#key-rules-and-behavior "Direct link to Key rules and behavior")

-   **Admin vs. Builder Controls:**
    -   Admins manage baseline tool eligibility in the admin settings.
    -   Agent builders choose whether an agent tool step bypasses confirmation within agent builder.
-   **Preservation of Existing Settings:**
    -   Explicitly configured *Yes* / *No* or *Allowed* / *Not allowed* settings remain unchanged.
    -   Previously unset legacy tools inherit the new *Yes* / *Allowed* default.
    -   Saved agent step selections are preserved when administrative defaults change.
-   **Destructive Actions:** The system does *not* automatically restrict destructive tools. Admins and Agent Builders must manually opt out high-risk actions.

### Scope and inheritance matrix[​](#scope-and-inheritance-matrix "Direct link to Scope and inheritance matrix")

| Tool type | Admin default | Builder default | Admin control location |
| --- | --- | --- | --- |
| New tools | Run without confirmation = **Yes** | Unchecked (Requires confirmation) | **Deploy** tab within the tool settings |
| New MCP write tools | Execution policy = **Allowed** | Unchecked (Requires confirmation) | Individual MCP Server settings |
| Redirect tools | *Unchanged* | *Unchanged* | N/A |

note

These confirmation defaults apply strictly to custom Agents. Standard enterprise chat and search workflows are unaffected.

## Scheduled and background agents[​](#scheduled-and-background-agents "Direct link to Scheduled and background agents")

Human-in-the-loop confirmations currently apply only to interactive sessions in the Glean web app.

For scheduled or background agents:

-   The admin must make a write tool eligible for no-confirmation execution.
-   The Agent builder must configure the relevant step to run without confirmation.
-   When both conditions are met, the write tool can run without an interactive confirmation panel.

When **Agent Inbox** is enabled for an agent, Glean can notify users when a background run is blocked waiting for approval. Users can review and decide whether to proceed from the Inbox.

## Distinguishing write confirmations from *Wait for user input*[​](#distinguishing-write-confirmations-from-wait-for-user-input "Direct link to distinguishing-write-confirmations-from-wait-for-user-input")

*Wait for user input* lets an agent collect structured input during an interactive session. You can use it to ask questions or validate inputs.

Write confirmations differ because they:

-   Trigger automatically at each write step.
-   Focus on reviewing and approving a specific change to another system.

You can pair write confirmation with *Wait for user input* to gather parameters first, then require approval before writing.

## Best practices[​](#best-practices "Direct link to Best practices")

-   Generate content before writing by using a *Respond* step so users can see and refine what will be written.
-   Reserve inline execution (Run without user confirmation) for trusted, predictable flows in interactive agents.
-   Use scheduled triggers only with pre-approved writes and tight scoping, where you are confident the agent will not attempt unexpected changes.
