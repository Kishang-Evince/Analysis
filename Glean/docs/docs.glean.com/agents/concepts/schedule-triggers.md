---
url: "https://docs.glean.com/agents/concepts/schedule-triggers"
canonical: "https://docs.glean.com/agents/concepts/schedule-triggers"
title: "Schedule triggers"
description: "Learn how to configure agents to run on a schedule"
fetched_at: "2026-10-13T08:49:35.803Z"
---
On this page

Scheduled triggers allow users to automate and standardize business processes by enabling agents to perform actions in the background. Each user of an agent can specify when they want that agent to run, such as daily or weekly.

By systematically defining and using these triggers within the **Agent builder**, you can ensure your agents operate effectively, automating essential processes and improving overall productivity.

note

Scheduled agents are activated by individual users and run according to each user's schedule. An [Independent Agent](/agents/independent-agents) is a separate model for shared workflows that need an agent-owned identity or continuous operation.

## Users[​](#users "Direct link to Users")

### Schedule trigger components[​](#schedule-trigger-components "Direct link to Schedule trigger components")

Schedule triggers involve three parts:

-   **Agent builder**: build an agent that can run in the background.
-   **Agent library**: activate, review, and manage your scheduled agents from the **Active agents** table.
-   **Admin console**: control who can schedule agents and which tools can run without user confirmation.

### Configure agents to run on a schedule[​](#configure-agents-to-run-on-a-schedule "Direct link to Configure agents to run on a schedule")

To run an agent on a schedule, first make sure the agent is designed to work in the background.

A scheduled agent should produce a clear output, such as sending a Slack message, creating or updating a record, drafting an email, or writing results to another destination. Agents that only return a conversational response are less suitable for background execution.

#### Auto mode vs. Workflow mode[​](#auto-mode-vs-workflow-mode "Direct link to Auto mode vs. Workflow mode")

The scheduling experience differs depending on which mode your agent uses:

|  | Auto mode | Workflow mode |
| --- | --- | --- |
| How it works | You describe the goal and tools; Glean decides how to accomplish it | You design the full execution flow step by step in a visual builder |
| Where you configure the schedule | Configure directly in the **Agent builder** during setup | Enable in the trigger step, then activate after publishing |
| Post-publish activation | No extra step. The schedule is set before publishing | Go to the agent in the **Agent library** and click **Set schedule** |
| Best for | Flexible tasks, faster setup, or goal-driven execution that may vary case by case | Deterministic logic, complex branching, or strict control over execution |

tip

Start with auto mode unless you already know the exact sequence of tools and it should not vary across use cases. Use workflow mode when you need a prescribed, repeatable sequence with fine-grained control.

#### Set up a schedule trigger for Auto mode agents[​](#set-up-a-schedule-trigger-for-auto-mode-agents "Direct link to Set up a schedule trigger for Auto mode agents")

1.  Create an agent in the **Agent builder** using **Auto mode**.
2.  Select **Triggers**.
3.  Select **On a schedule** for the field **When should the agent run?**.
4.  Add the scheduling details.

note

You can set a schedule for yourself. Others can customize the schedule when the agent is available to them.

5.  Make sure the agent has a clear outcome for background runs.
    
6.  Click **Save** and publish the agent.
    
    ![Auto mode agent set schedule form](/img/auto-mode-agent-set-schedule.png)
    

The agent is ready to run on the schedule you configured. No additional activation step is required.

#### Set up a schedule trigger for Workflow mode agents[​](#set-up-a-schedule-trigger-for-workflow-mode-agents "Direct link to Set up a schedule trigger for Workflow mode agents")

1.  Create or open an agent in **Workflow mode**.
2.  In the trigger step, select **Input form trigger**.
3.  Select the **Allow agent to run on a schedule** checkbox under **Set schedule**.
    
    ![Set schedule checkbox](/img/workflow-mode-agent-set-schedule-checkbox.png)
    
4.  Build the workflow you want the agent to run on a recurring basis.
5.  Save and publish the agent.
6.  After the agent is published, [schedule and activate the agent](#schedule-and-activate-a-workflow-mode-agent).

#### Schedule and activate a workflow mode agent[​](#schedule-and-activate-a-workflow-mode-agent "Direct link to Schedule and activate a workflow mode agent")

After you publish a workflow mode agent with schedule support, Glean opens the agent in the **Agent library** so you can finish setup.

1.  Go to a schedulable agent in the **Agent library**.
2.  Click **Set schedule**.
3.  Set the start date, time, time zone, and repeat frequency.
4.  Click **Save**.

Glean skips the inputs step when the agent has no inputs or when the scheduling entry point already shows the run form. The values in that run form become the inputs for the schedule.

#### Edit or remove a schedule[​](#edit-or-remove-a-schedule "Direct link to Edit or remove a schedule")

To edit an existing schedule:

1.  Open the scheduled agent in the **Agent library**.
2.  Click **Edit schedule**.
3.  Review or update the inputs for the scheduled run and save the schedule.

Editing a schedule uses the saved subscription inputs. It does not change the inputs used by a manual run, and running the agent manually does not change the schedule inputs.

To remove a schedule, open the three-dot menu next to the schedule action and select **Remove schedule**.

To pause a schedule toggle off the switch next to the agent.

#### Changes that deactivate subscriptions[​](#changes-that-deactivate-subscriptions "Direct link to Changes that deactivate subscriptions")

Routine edits do not interrupt existing subscriptions. For example, updating an input field description or changing a default value does not require subscribers to set the schedule again.

For autonomous agents, subscriptions stay active when you:

-   Switch the agent between **On a schedule** and **Manually run**, in either direction.
-   Add an input field while the agent is set to **Manually run**.
-   Switch between **Input form** and **Chat message** while keeping the schedule enabled.

Subscribers still receive email notifications about agent changes, even when their subscriptions remain active.

Workflow mode agents continue to use the existing contract rules. The following changes pause existing subscriptions. Each subscriber must manually reactivate the agent to resume scheduled runs:

-   Add or rename a required input field on a Workflow mode agent.
-   Convert the agent to a **Content trigger** or **Custom webhook**.
-   Turn off scheduling for a Workflow mode agent.
-   Remove a user's access to the agent.
-   Deactivate the agent.

#### How agent changes affect saved inputs[​](#how-agent-changes-affect-saved-inputs "Direct link to How agent changes affect saved inputs")

Active subscriptions continue running with the inputs saved for that subscription. When you edit a schedule, Glean starts with the saved inputs after you update the cadence. Changes to those inputs affect scheduled runs and do not overwrite the inputs used by a manual run.

##### How field changes are handled[​](#how-field-changes-are-handled "Direct link to How field changes are handled")

-   Modified or deleted fields: If a field is deleted or left blank, its original value is passed to the agent as background context. The run will not fail.
-   Renamed fields: Fields are identified by their exact label name. Renaming a field removes the old field and adds a new one. The saved value for the old label is dropped, and you must enter a new value the next time you update or resume the agent.
-   In-app notifications: If field changes require attention, Glean shows an informational banner prompting you to update saved inputs. The agent continues running with saved context until you make updates.

tip

If a background run for an agent reaches a tool step requiring manual user confirmation, Glean will send an email notification instead of silently skipping the step.

### Managing and monitoring agents[​](#managing-and-monitoring-agents "Direct link to Managing and monitoring agents")

All agents you have activated are visible and manageable in the **Active** tab. For each agent, you can see its name, trigger, and author, and use the **Active** toggle to turn scheduled runs on or off.

![Active agents table](/img/live-agent-table.png)

To manage an agent, open the more options (**⋮**) menu next to it. From here you can:

-   **Run now**: run the agent immediately.
    
-   **Remove trigger**: stop the agent from running automatically.
    
-   **Delete**: delete the agent.
    
    ![Active agents table with the more options menu open](/img/live-agent-table-run-history-remove.png)
    

To review past runs, open **Chats** in the left navigation. Select the **Agents** filter to see agent runs or the **Automations** filter to see scheduled runs. You can scan results and open full run details from there.

note

The exact time of execution may vary depending on how many other agents are scheduled to run at the same time. If you notice a significant delay, contact Glean support.

## Admin[​](#admin "Direct link to Admin")

### Managing access to scheduled triggers[​](#managing-access-to-scheduled-triggers "Direct link to Managing access to scheduled triggers")

By default, scheduled triggers are turned off. In **Admin console → Platform → Agents → Scheduled triggers**, admins can turn the feature on for everyone or limit access to selected users and IdP groups.

If you select **On for some users**, you can grant access to:

-   Individual users
    
-   Supported IdP groups from Google Groups and Azure AD / Entra ID
    

Members of selected groups inherit access to agent scheduling. If group membership changes in your identity provider, Glean updates access through the existing sync behavior. This setting controls who can access agent scheduling. It does not change whether the user can create, share or publish agents, which are set under Users and permissions.

#### Add users or groups[​](#add-users-or-groups "Direct link to Add users or groups")

To add users or groups:

1.  In Glean, go to **Admin console → Platform → Agents → Scheduled triggers**.
    
2.  Select **On for some users**.
    
3.  Add the users (**Add users**) or supported IdP groups (**Add groups**) that you want to allow to schedule agents. Your changes are saved automatically.
    
    ![schedule agent for teammates](/img/schedule-agent-some-teammates.png)
    
    ![schedule agent for IDP group](/img/schedule-agent-idp-group.png)
    

#### Review or remove access[​](#review-or-remove-access "Direct link to Review or remove access")

To review access, open the **Scheduled triggers** permissions list and check the users and groups that currently have access to agent scheduling. To remove access, delete the user or group from the list. After you remove a group, its members no longer inherit access through that group.

Users who don't have access won't see the option to schedule agents.

### Enabling tools to run without user confirmation[​](#enabling-tools-to-run-without-user-confirmation "Direct link to Enabling tools to run without user confirmation")

-   An admin-level **Run without user confirmation** setting makes a write tool eligible for scheduled or background use. The Agent builder must also configure the relevant step to run without confirmation. Changing an admin default does not update existing Agents.
-   To change the configuration, go to **Tools → Tools → Configuration → Enable tools → Edit settings → Agents → Run without user confirmation** and select **Yes**.
-   By default, read-only tools run without user confirmation. Some tools using LLM to predict inputs always ask for confirmation to ensure accuracy.

The connector\-level setting can apply to all tools in that connector. Custom actions and MCP tools use individual action or tool policies, so admins can opt individual tools in or out without disabling the entire integration.

#### Write-tool defaults for scheduled Agents[​](#write-tool-defaults-for-scheduled-agents "Direct link to Write-tool defaults for scheduled Agents")

| Tool source | New actions or tools | Existing actions or tools |
| --- | --- | --- |
| Custom execute actions | Default to **Yes**, making them eligible for no-confirmation execution. | Unset action-level values inherit **Yes**. Explicit or otherwise persisted values remain unchanged. Some older actions with the previous derived **No** already persisted remain **No** until an admin changes them. |
| MCP write tools | Individual tools from newly configured servers default to **Allowed**. | Stored per-tool **Allowed** or **Not allowed** policies remain unchanged. An unset policy derives **Allowed** from the new default. |

These admin settings are only one part of the configuration. The action or tool must also be included in the Agent with the appropriate no-confirmation behavior enabled. Newly added action packs and MCP servers start with no-confirmation selections unchecked in Agent Builder, while saved selections are preserved. Actions that still require confirmation cannot complete in a scheduled or background run without an available approval flow.

These defaults don't change Assistant or general-chat confirmation behavior, native first-party write-tool defaults, redirect actions, or existing Agent step settings.

![Run without user confirmation](/img/image.png)

## Security and limitations[​](#security-and-limitations "Direct link to Security and limitations")

Scheduled runs also have a maximum end-to-end execution time. Design scheduled agents to finish within that window. For the current limit and strategies to stay within it, see [Scheduled run limits](/agents/concepts/execution-limits#scheduled-run-limits).

Any agent creator can configure an agent to run on a schedule, but only users with scheduled trigger access can activate scheduled runs.

Rate limits apply to prevent overload:

-   A maximum of 10 active background agents can be scheduled per user.
-   If you exceed this limit, remove an agent from the **Active agents** table before setting a schedule for another one.

note

If you need to run more than 10 active background agents, reach out to the Glean team.

For privacy and security, background agents can use only the tools or app capabilities that your admins have allowed to run without user confirmation.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Schedule visibility[​](#schedule-visibility "Direct link to Schedule visibility")

If a user can't see the scheduling option in Agent builder, check the following. All requirements must be met for the option to appear.

| Requirement | Where to check |
| --- | --- |
| The agent uses **Workflow mode** with an **Input form trigger**, or **Auto mode** | Open the agent in Agent builder and review the trigger configuration. |
| **Scheduled triggers** is turned on for the user (or for everyone) in the **Admin console** | **Admin console → Platform → Agents → Scheduled triggers** |
| If the admin selected **On for some teammates**, the user's email or IDP group is in the allowlist | **Admin console → Platform → Agents → Scheduled triggers** permissions list |

note

The scheduling option is for each user. Two people editing the same agent can see different options depending on their individual access. If one user can see **Allow agent to run on a schedule** but another cannot, verify that both users appear in the **Scheduled triggers** permissions list.

In **Workflow mode**, the **Allow agent to run on a schedule** checkbox only appears inside the **Input form trigger** configuration. If the agent uses a different trigger type (such as **Chat message**), the checkbox is not shown. Switch the trigger to **Input form** to enable scheduling.
