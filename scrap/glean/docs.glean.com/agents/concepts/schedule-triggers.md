---
url: "https://docs.glean.com/agents/concepts/schedule-triggers"
canonical: "https://docs.glean.com/agents/concepts/schedule-triggers"
title: "Schedule triggers"
description: "Learn how to configure agents to run on a schedule"
fetched_at: "2026-09-01T13:29:16.642Z"
---
On this page

Scheduled triggers allow users to automate and standardize business processes by enabling agents to perform actions in the background. Each user of an agent can specify when they want that agent to run, such as daily or weekly.

By systematically defining and using these triggers within the **Agent builder**, you can ensure your agents operate effectively, automating essential processes and improving overall productivity.

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

After you publish a workflow mode agent with schedule support, Glean opens the agent in the **agent library** so you can finish setup.

After a workflow mode agent with schedule support is published, you must set the schedule details and activate the agent before it begins running.

1.  Go to a schedulable agent in the **Agent library**.
2.  Under **When does it run?**, review the default schedule. To change it, click **Edit**.
    
    ![Agent schedule with Edit and Activate agent options](/img/workflow-mode-agent-set-schedule-option.png)
    
3.  In **Edit when this agent runs**, set the start date, time, time zone, and how often the agent repeats, then click **Save**.
    
    ![Edit when this agent runs form](/img/workflow-agent-set-schedule.png)
    
4.  Click **Activate agent** to start the scheduled runs.

#### Changes that deactivate subscriptions[​](#changes-that-deactivate-subscriptions "Direct link to Changes that deactivate subscriptions")

Routine edits do not interrupt existing subscriptions. For example, updating an input field description or changing a default value does not require subscribers to set the schedule again.

Some configuration changes pause all existing subscriptions. In these cases, each subscriber must manually re-activate the agent to resume scheduled runs.

These changes include:

-   Adding a new required input field.
-   Renaming an existing required input field.
-   Changing the trigger type away from **Input form**.
-   Removing a user's access to the agent.
-   Turning off the schedule-enabled setting.
-   Deactivating the agent.

tip

If a background run reaches a tool that still requires user confirmation, Glean emails the subscriber instead of silently skipping that step.

### Managing and monitoring agents[​](#managing-and-monitoring-agents "Direct link to Managing and monitoring agents")

All agents you have activated are visible and manageable in the **Active** tab in the left navigation. For each agent, you can see its name, trigger, and author, and use the **Active** toggle to turn scheduled runs on or off.

![Active agents table](/img/live-agent-table.png)

To manage an agent, open the more options (**⋮**) menu next to it. From here you can:

-   **Run now**: run the agent immediately.
    
-   **Remove trigger**: stop the agent from running automatically.
    
-   **Delete**: delete the agent.
    
    ![Active agents table with the more options menu open](/img/live-agent-table-run-history-remove.png)
    

To review past runs, go to **Chat** in the left navigation. You can quickly scan results, open full run details in one click, and use filters to see only Glean chats or runs from a specific agent.

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
