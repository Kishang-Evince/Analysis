---
url: "https://docs.glean.com/administration/managing-agents/deleting-and-restoring-agents"
canonical: "https://docs.glean.com/administration/managing-agents/deleting-and-restoring-agents"
title: "Delete and restore agents"
description: "Describes what happens when you delete an agent, how to delete inactive agents in bulk, the 60-day soft delete window, and how admins can restore or permanently remove agents."
fetched_at: "2026-09-01T13:29:09.899Z"
---
On this page

When an agent is deleted, Glean soft deletes it for 60 days before permanently removing it. During this window, an admin can restore the agent to its previous state. After 60 days, the agent is permanently deleted and cannot be recovered.

## What happens when an agent is deleted[​](#what-happens-when-an-agent-is-deleted "Direct link to What happens when an agent is deleted")

When a user deletes an agent, the following occurs:

-   The agent is removed from the **Agent Library**, **Assistant** and **Chat** pickers, embedded surfaces, **My agents**, **Shared with me**, and **Favorites**. Users can no longer run the agent.
-   The agent's permissions, favorites, schedules, and triggers are preserved so they can be reinstated if the agent is restored.
-   Subscriptions and Slack/Teams deployment configurations are permanently removed and are not restored if the agent is later recovered.
-   If the agent has subagents, those subagents are also soft deleted along with the parent agent.

## Bulk delete agents[​](#bulk-delete-agents "Direct link to Bulk delete agents")

Workspace administrators can delete multiple inactive agents simultaneously from the Glean Admin console. This is useful for cleaning up stale or unused agents at scale.

note

Bulk deletion uses a soft delete behavior. Deleted agents are hidden from users immediately but can be restored by an admin within 60 days before they are permanently removed.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Administrator access to the Glean **Admin console**.
-   A CSV file containing a valid `Agent ID` column.

### (Optional) Step 1: Download the inactive agents report[​](#optional-step-1-download-the-inactive-agents-report "Direct link to (Optional) Step 1: Download the inactive agents report")

To identify which agents are unused in your organization, download an inactivity report.

1.  Navigate to the **Admin console → Agents → Manage**.
    
2.  Locate the **Bulk delete agents** section.
    
    ![Bulk delete agents](/img/bulk-delete-agents.png)
    
3.  Next to **Inactive for**, select a timeframe from the dropdown menu:
    
    -   **30 days**
    -   **60 days**
    -   **90 days**
4.  Click **Download report**.
    
    ![Bulk delete agents](/img/bulk-delete-agents-option.png)
    

The generated report includes all agents with zero runs during your selected time period.

### Step 2: Upload the CSV to bulk delete[​](#step-2-upload-the-csv-to-bulk-delete "Direct link to Step 2: Upload the CSV to bulk delete")

#### CSV file requirements[​](#csv-file-requirements "Direct link to CSV file requirements")

If you choose to create or edit your own CSV file instead of using the downloaded report, ensure it meets these parameters:

-   The file must be strictly in `.csv` format.
-   The file must include an `Agent ID` column header. If this column is missing, the upload will fail.
-   Blank rows are skipped automatically.
-   Any extra data columns are ignored.

#### Deletion steps[​](#deletion-steps "Direct link to Deletion steps")

1.  In the **Admin console → Agents → Manage** section, click **Bulk delete agents**.
2.  Click **Upload CSV** and select your file.
3.  Review the summary of agents to be removed, then click **Confirm delete**.

### What happens when agents are bulk deleted[​](#what-happens-when-agents-are-bulk-deleted "Direct link to What happens when agents are bulk deleted")

Bulk deleted agents follow the standard deletion lifecycle:

-   They are removed immediately from the Agent Library and all user-facing surfaces.
-   Users can no longer run or trigger these agents.
-   The agents remain in a soft-deleted state for 60 days. After 60 days, they are permanently purged from the system.

To recover an agent before the 60 day window closes, see [Restore a deleted agent](#restore-a-deleted-agent).

## Restore a deleted agent[​](#restore-a-deleted-agent "Direct link to Restore a deleted agent")

Admins can restore any agent that was deleted within the past 60 days.

### Prerequisites[​](#prerequisites-1 "Direct link to Prerequisites")

-   You must be an **Admin**. Agent Moderators cannot restore deleted agents.

1.  Navigate to the **Admin console → Agents → Manage**.
2.  Select **Deleted agents**.
3.  Search for the agent by name if needed.
4.  Select the **Restore** action next to the agent you want to recover.
    
    ![Restore deleted agents](/img/restore-deleted-agents.png)
    

When a parent agent is restored, any soft-deleted subagents referenced by that parent are also restored automatically.

info

Subscriptions, Slack and Teams deployment configurations are not restored and you will need to re-deploy the agent to those channels manually.

## Permanent deletion[​](#permanent-deletion "Direct link to Permanent deletion")

Soft-deleted agents are permanently removed after 60 days. This cleanup runs automatically once every 24 hours. After permanent deletion, the agent and all associated data, including permissions and favorites, are fully removed and cannot be recovered.
