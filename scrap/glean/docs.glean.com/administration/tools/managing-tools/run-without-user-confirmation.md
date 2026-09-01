---
url: "https://docs.glean.com/administration/tools/managing-tools/run-without-user-confirmation"
canonical: "https://docs.glean.com/administration/tools/managing-tools/run-without-user-confirmation"
title: "Run tools without user confirmation"
description: "Allow background and scheduled agents to execute write tools without requiring user approval"
fetched_at: "2026-09-01T13:29:14.841Z"
---
On this page

The **Run without user confirmation** setting determines whether a tool is eligible to execute in an Agent without manual approval. This admin setting does not make the tool run automatically or change an existing Agent. An Agent builder must also configure the relevant step to run without confirmation.

This setting operates at two levels:

-   Eligibility (admin level): Controls whether an action or tool can run without confirmation. Depending on the tool source, admins configure eligibility for a connector or for an individual action or tool.
-   Activation (Agent level): Controls whether a specific Agent step skips confirmation. Agent builders must explicitly enable this behavior in the Agent configuration.

note

Standard permissions, authentication, and safety controls remain enforced regardless of this setting.

## What this setting controls[​](#what-this-setting-controls "Direct link to What this setting controls")

The **Run without user confirmation** setting makes supported write tools eligible for no-confirmation execution in Agents. It does not rewrite the configuration of existing Agents.

### Default eligibility by tool source[​](#default-eligibility-by-tool-source "Direct link to Default eligibility by tool source")

| Tool source | New actions or tools | Existing actions or tools |
| --- | --- | --- |
| Custom execute actions | Default to *Yes*. Redirect actions are unaffected. | An unset action-level value inherits the new *Yes* default. An explicit or otherwise persisted value remains unchanged. Some older actions with the previous derived *No* already persisted remain *No* until an admin changes them. |
| MCP write tools | Tools from newly configured MCP servers default to *Allowed*. | Stored per-tool *Allowed* or *Not allowed* policies remain unchanged. An unset policy derives *Allowed* from the new default. |
| Write tools | Existing defaults remain unchanged. | Existing defaults and stored settings remain unchanged. |

These defaults apply to Agents only. They do not change write confirmation behavior in Assistant or general chat.

### Automated and background execution[​](#automated-and-background-execution "Direct link to Automated and background execution")

When a tool is eligible and the agent builder configures the step to run without confirmation, Glean can bypass the approval prompt when the tool is invoked:

-   By a scheduled agent running on a timer.
-   By a background agent triggered by an event such as a new Slack message or webhook.
-   In auto mode without an active user session.

### Custom action behavior[​](#custom-action-behavior "Direct link to Custom action behavior")

When an admin sets a custom execute action to **Yes**:

-   Automated workflows: The action becomes eligible for no-confirmation execution in scheduled or background Agents. The Agent must also be configured for that behavior.
-   Interactive workflows: Agent builders gain the option to bypass confirmation for specific action steps within an interactive Agent.
-   Permissions: The action continues to run using the permissions of the initiating user or execution context.
-   Scope restriction: This setting applies only to Agents and does not alter confirmation behavior in Assistant or general chat.

note

If a user is actively present in Glean or in an interactive agent session, confirmation prompts still appear by default unless explicitly overridden in the step configuration.

## Enable *Run without user confirmation* for tools[​](#enable-run-without-user-confirmation-for-tools "Direct link to enable-run-without-user-confirmation-for-tools")

To execute an agent action without user confirmation, you must complete a two-tier configuration: enable *Admin eligibility* in the admin console, then enable *Step Execution* in agent builder.

note

Admin-level approval makes a tool *eligible* to bypass confirmation. It does **not** automatically bypass confirmation until enabled within the specific agent step.

### Phase 1: Configure admin-level tool eligibility[​](#phase-1-configure-admin-level-tool-eligibility "Direct link to Phase 1: Configure admin-level tool eligibility")

Admin defaults determine baseline eligibility. Select the tab below that matches your tool type:

**Tools**

1.  In the **Glean Admin console**, navigate to **Platform** → **Tools**.
2.  Select the target tool and open the **Configuration** tab.
3.  Under **Enable tools**, click **Edit settings**.
4.  Under **Agents**, set **Run without user confirmation** to **Yes**.
5.  Click **Save**.

**Custom execute actions**

1.  In the **Glean Admin console**, navigate to **Platform** → **Tools**.
2.  Select the target custom tool and open the **Deploy** tab.
3.  Set **Run without user confirmation for Agents** to **Yes** or **No**.
4.  Click **Save**.

*Default rules:*

-   New actions: Default to **Yes**.
-   Unset legacy actions: Inherit the **Yes** default.
-   Persisted actions: Retain their existing explicit value (including legacy **No** settings).

**MCP write tools**

1.  In the **Glean Admin console**, open the target MCP server.
2.  Locate the **Run without user confirmation** column next to each write tool.
3.  Toggle individual tools to **Allowed** or **Not allowed**.
4.  Click **Save**.

*Default rules:*

-   New MCP servers: Default to **Allowed** per tool.
-   Unset legacy tools: Inherit the **Allowed** default.
-   Persisted tools: Retain their existing policy.

### Phase 2: Enable no-confirmation execution in agent builder[​](#phase-2-enable-no-confirmation-execution-in-agent-builder "Direct link to Phase 2: Enable no-confirmation execution in agent builder")

After establishing Admin eligibility, activate the setting within the specific Agent workflow:

1.  Open your target Agent in **Agent Builder**.
2.  Select the action step you want to automate.
3.  Check the option to **Run without confirmation**.
4.  Save and publish your Agent.

note

-   Newly added tool packs and MCP servers start with **Run without confirmation** unchecked in Agent Builder.
-   If the Agent step is unchecked, the Agent prompts the user for confirmation regardless of Admin settings.
-   Updating Admin-level defaults never rewrites or overwrites existing Agent step configurations.

## Security considerations[​](#security-considerations "Direct link to Security considerations")

Enabling this setting allows write operations such as creating tickets, posting comments, or updating records to occur automatically without human review. Before enabling it:

-   Test thoroughly: Verify the instructions of the agent are tightly scoped and tested in an interactive session first.
-   Restrict visibility: Limit the visibility scope of the tool to only the specific users or service accounts the agent runs as.
-   Disable destructive tools: Use the applicable connector or per-tool control to turn off destructive tools, for example, delete, close, or archive. The default does not automatically exclude destructive tools.

Only enable this setting for actions that are safe, predictable, and appropriately scoped. Review the action's destination, inputs, permissions, and potential impact before allowing it to run without confirmation.

## Run without user confirmation vs. Inline execution[​](#run-without-user-confirmation-vs-inline-execution "Direct link to Run without user confirmation vs. Inline execution")

Both settings live in the same **Edit settings** panel per tool. They operate independently and you can require user confirmation for interactive use while simultaneously allowing background execution for automated workflows.

| Setting | Context | Behavior |
| --- | --- | --- |
| User Confirmation (Default) | Interactive sessions | The user must review and approve a confirmation card before each write tool. |
| Run without user confirmation | Agent eligibility | Allows an Agent builder to configure supported steps for no-confirmation execution. |

For more details on interactive confirmation behaviors, see [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

If you need help, contact the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
